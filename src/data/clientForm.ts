/*
 * The household client requirements form. First built from
 * EFKA_Client_Requirements_Form_.docx; the section order, new questions and
 * conditions come from "Client Intake Form Changes.pdf" (21 November 2026).
 *
 * The page shows Turkish first with English underneath. Labels are the
 * documents' own wording.
 *
 * The page renders from this list, and each submission carries the labels
 * with the answers, so the Google Sheet's column headers and the notification
 * email come from here too. To add or reword a question, change it here only.
 * Keep `key` stable once the form is in use: the Apps Script matches columns
 * by key, so a renamed key starts a new column.
 */

/**
 * The Google Apps Script web app that receives submissions (see
 * docs/client-form/SETUP.md). It is public in the page source either way.
 * `PUBLIC_CLIENT_FORM_ENDPOINT` in the environment overrides it, which is how
 * the form is tested locally.
 */
export const CLIENT_FORM_ENDPOINT: string =
  import.meta.env.PUBLIC_CLIENT_FORM_ENDPOINT ||
  'https://script.google.com/macros/s/AKfycbz2c-vTMAQKNZp_6F3zuK95qUTJ_0akLyNhD7j62ml9DbxNl23aAxAeDDd7vBQTWeK4/exec';

/**
 * Cloudflare Turnstile site key for the bot check (public, like the endpoint).
 * The widget only works on the hostnames set for it in Cloudflare.
 * `PUBLIC_TURNSTILE_SITE_KEY` overrides it, e.g. with Cloudflare's
 * always-passing test key `1x00000000000000000000AA` for local testing.
 */
export const TURNSTILE_SITE_KEY: string = import.meta.env.PUBLIC_TURNSTILE_SITE_KEY || '0x4AAAAAAFfGZ-cOZ6ezmeKb';

export interface Bilingual {
  en: string;
  tr: string;
}

export interface Option extends Bilingual {
  value: string;
  /** Shows a text box for details when chosen, e.g. "Other: ____". */
  detail?: Bilingual;
}

interface Common extends Bilingual {
  key: string;
  /** Spans both columns on wide screens. */
  wide?: boolean;
  /** A short note shown under the label. */
  hint?: Bilingual;
  /**
   * Shown only while one of these options is chosen in another field (a
   * radio, checkbox or drop-down).
   */
  showIf?: { key: string; anyOf: string[] };
}

export type Field =
  | (Common & {
      type: 'text' | 'email' | 'tel' | 'number' | 'textarea' | 'date';
      required?: boolean;
      autocomplete?: string;
      placeholder?: Bilingual;
      min?: number;
      max?: number;
    })
  /** A required checkbox field must have at least its single option ticked. */
  | (Common & { type: 'radio' | 'checkbox'; required?: boolean; options: Option[] })
  | (Common & { type: 'select'; options: Option[] })
  | (Common & { type: 'range'; unit: Bilingual; min: number; max: number; defaults: [number, number] })
  /** Up to `count` date-and-time pickers, plus a free-text note. */
  | (Common & { type: 'slots'; count: number; note: Bilingual });

export interface Section extends Bilingual {
  key: string;
  fields: Field[];
}

// Checks the list against Section while giving it that general type, so the
// page can read optional properties such as `detail` and `required`.
const sections = (list: Section[]) => list;

const YES = { value: 'yes', en: 'Yes', tr: 'Evet' };
const NO = { value: 'no', en: 'No', tr: 'Hayır' };
const PREFERRED = { value: 'preferred', en: 'Preferred', tr: 'Tercihen' };
const OTHER = { value: 'other', en: 'Other', tr: 'Diğer', detail: { en: 'Please specify', tr: 'Belirtiniz' } };

const numbers = (list: string[]) => list.map((n) => ({ value: n, en: n, tr: n }));
const COUNT = numbers(['0', '1', '2', '3', '4', '5+']);

// Questions that only apply to elderly or patient care.
const CARE_RECIPIENT = { key: 'primaryRole', anyOf: ['elderly', 'patient'] };

export const clientForm = {
  meta: {
    title: 'Müşteri İhtiyaç Formu · Client Requirements Form',
    description: 'EFKA Consulting household worker client requirements form.',
  },

  title: { en: 'Household Worker | Client Requirements Form', tr: 'Ev Personeli | Müşteri İhtiyaç Formu' },

  intro: {
    en: `Please complete this form so EFKA Consulting can identify candidates suited to your household
      and employment needs. Information will be shared with recruitment partners only as needed for
      candidate matching.`,
    tr: `EFKA Consulting’in evinizin ve istihdam ihtiyaçlarınızın gerekliliklerine uygun adayları
      belirleyebilmesi için lütfen bu formu doldurunuz. Bilgiler, yalnızca aday eşleştirmesi için
      gerekli olduğu ölçüde işe alım ortaklarımızla paylaşılacaktır.`,
  },

  sections: sections([
    {
      key: 'contact',
      en: '1. Contact details',
      tr: '1. İletişim bilgileri',
      fields: [
        {
          key: 'clientName',
          type: 'text',
          required: true,
          autocomplete: 'name',
          en: 'Client / employer full name',
          tr: 'Müşteri / işveren adı soyadı',
        },
        {
          key: 'city',
          type: 'text',
          autocomplete: 'address-level2',
          en: 'City / district (Türkiye)',
          tr: 'İl / ilçe (Türkiye)',
        },
        {
          key: 'phone',
          type: 'tel',
          required: true,
          autocomplete: 'tel',
          placeholder: { en: '0532 123 45 67', tr: '0532 123 45 67' },
          en: 'Phone / WhatsApp',
          tr: 'Telefon / WhatsApp',
        },
        {
          key: 'email',
          type: 'email',
          autocomplete: 'email',
          placeholder: { en: 'ad@ornek.com', tr: 'ad@ornek.com' },
          en: 'Email',
          tr: 'E-posta',
        },
        {
          key: 'contactMethod',
          type: 'radio',
          wide: true,
          en: 'Preferred contact method',
          tr: 'Tercih edilen iletişim yöntemi',
          options: [
            { value: 'phone', en: 'Phone', tr: 'Telefon' },
            { value: 'whatsapp', en: 'WhatsApp', tr: 'WhatsApp' },
            { value: 'email', en: 'Email', tr: 'E-posta' },
          ],
        },
      ],
    },
    {
      key: 'service',
      en: '2. Service type & care needs',
      tr: '2. Hizmet türü ve bakım ihtiyacı',
      fields: [
        {
          key: 'primaryRole',
          type: 'radio',
          required: true,
          wide: true,
          en: 'Primary role',
          tr: 'Temel görev',
          options: [
            { value: 'nanny', en: 'Nanny / infant-child care', tr: 'Dadı / bebek-çocuk bakımı' },
            { value: 'elderly', en: 'Elderly care', tr: 'Yaşlı bakımı' },
            { value: 'patient', en: 'Patient care', tr: 'Hasta bakımı' },
            { value: 'household', en: 'Household help', tr: 'Ev yardımcısı' },
          ],
        },
        {
          key: 'infantExperience',
          type: 'radio',
          wide: true,
          showIf: { key: 'primaryRole', anyOf: ['nanny'] },
          en: 'Prior newborn / infant experience required?',
          tr: 'Yenidoğan / bebek bakım deneyimi gerekli mi?',
          options: [YES, PREFERRED, { value: 'na', en: 'Not applicable', tr: 'İlgili değil' }],
        },
        // Same key as the earlier free-text "ages of persons receiving care",
        // so answers stay in one column.
        {
          key: 'careAges',
          type: 'number',
          min: 0,
          max: 120,
          showIf: CARE_RECIPIENT,
          en: 'Age of the person to be cared for',
          tr: 'Bakılacak kişinin yaşı',
        },
        {
          key: 'careSameAddress',
          type: 'radio',
          showIf: CARE_RECIPIENT,
          en: 'Does the person to be cared for live at the employer’s address?',
          tr: 'Bakılacak kişi işverenle aynı adreste mi yaşıyor?',
          options: [YES, NO],
        },
        {
          key: 'specialNeeds',
          type: 'textarea',
          wide: true,
          en: 'Special care needs or relevant instructions, if any',
          tr: 'Varsa özel bakım ihtiyaçları veya ilgili talimatlar',
        },
      ],
    },
    {
      key: 'household',
      en: '3. Household',
      tr: '3. Hane bilgileri',
      fields: [
        {
          key: 'adults',
          type: 'select',
          en: 'Number of adults in household',
          tr: 'Evde yaşayan yetişkin sayısı',
          options: COUNT,
        },
        {
          key: 'adultsDetails',
          type: 'text',
          placeholder: { en: 'e.g. Female 38, Male 41', tr: 'Örn. Kadın 38, Erkek 41' },
          en: 'Ages and genders of adults',
          tr: 'Yetişkinlerin yaş ve cinsiyetleri',
        },
        { key: 'children', type: 'select', en: 'Number of children', tr: 'Çocuk sayısı', options: COUNT },
        // Same key as the earlier one-drop-down-per-child ages, so answers stay in one column.
        {
          key: 'childrenAges',
          type: 'text',
          showIf: { key: 'children', anyOf: ['1', '2', '3', '4', '5+'] },
          placeholder: { en: 'e.g. Girl 2, Boy 5', tr: 'Örn. Kız 2, Erkek 5' },
          en: 'Ages and genders of children',
          tr: 'Çocukların yaş ve cinsiyetleri',
        },
        {
          key: 'dietaryRestrictions',
          type: 'radio',
          en: 'Any family members with dietary restrictions?',
          tr: 'Beslenme kısıtı olan aile üyesi var mı?',
          options: [NO, YES],
        },
        {
          key: 'dietaryDetails',
          type: 'text',
          showIf: { key: 'dietaryRestrictions', anyOf: ['yes'] },
          en: 'Dietary restriction details',
          tr: 'Beslenme kısıtı detayları',
        },
      ],
    },
    {
      key: 'home',
      en: '4. Home & accommodation',
      tr: '4. Ev ve konaklama',
      fields: [
        {
          key: 'propertyType',
          type: 'radio',
          wide: true,
          en: 'Property type',
          tr: 'Konut tipi',
          options: [
            { value: 'apartment', en: 'Apartment / flat', tr: 'Daire' },
            { value: 'house', en: 'Detached house / villa', tr: 'Müstakil ev / villa' },
            OTHER,
          ],
        },
        {
          key: 'bedrooms',
          type: 'select',
          en: 'Number of bedrooms',
          tr: 'Yatak odası sayısı',
          options: numbers(['1', '2', '3', '4', '5+']),
        },
        {
          key: 'bathrooms',
          type: 'select',
          en: 'Number of bathrooms',
          tr: 'Banyo sayısı',
          options: numbers(['1', '2', '3', '4+']),
        },
        {
          key: 'privateBedroom',
          type: 'radio',
          en: 'Private bedroom for worker?',
          tr: 'Personel için özel yatak odası var mı?',
          options: [YES, NO, { value: 'arranged', en: 'To be arranged', tr: 'Ayarlanacak' }],
        },
        {
          key: 'privateBathroom',
          type: 'radio',
          en: 'Private bathroom for worker?',
          tr: 'Personel için özel banyo var mı?',
          options: [YES, { value: 'shared', en: 'Shared bathroom', tr: 'Ortak banyo' }],
        },
        {
          key: 'pets',
          type: 'radio',
          en: 'Pets in household?',
          tr: 'Evcil hayvan var mı?',
          options: [NO, YES],
        },
        {
          key: 'petDetails',
          type: 'text',
          showIf: { key: 'pets', anyOf: ['yes'] },
          placeholder: { en: 'e.g. 1 cat', tr: 'Örn. 1 kedi' },
          en: 'Pet type and number',
          tr: 'Evcil hayvan türü ve sayısı',
        },
        {
          key: 'cameras',
          type: 'radio',
          en: 'Is there a camera system in the house?',
          tr: 'Evde kamera sistemi var mı?',
          hint: {
            en: 'Cameras may not be installed in the worker’s room.',
            tr: 'Çalışanın odasında kamera bulunamaz.',
          },
          options: [YES, NO],
        },
        {
          key: 'cameraDetails',
          type: 'text',
          showIf: { key: 'cameras', anyOf: ['yes'] },
          placeholder: { en: 'Which areas?', tr: 'Hangi alanlarda?' },
          en: 'Camera details',
          tr: 'Kamera detayları',
        },
        {
          key: 'otherStaff',
          type: 'radio',
          en: 'Any other staff working in the house?',
          tr: 'Evde çalışan başka personel var mı?',
          options: [NO, YES],
        },
        {
          key: 'otherStaffDays',
          type: 'select',
          showIf: { key: 'otherStaff', anyOf: ['yes'] },
          en: 'How many days a week?',
          tr: 'Haftada kaç gün?',
          options: numbers(['1', '2', '3', '4', '5', '6', '7']),
        },
      ],
    },
    {
      key: 'duties',
      en: '5. Duties & working arrangements',
      tr: '5. Görevler ve çalışma düzeni',
      fields: [
        {
          key: 'householdDuties',
          type: 'checkbox',
          wide: true,
          en: 'Household duties expected',
          tr: 'Beklenen ev işleri',
          options: [
            { value: 'cleaning', en: 'Cleaning', tr: 'Temizlik' },
            { value: 'laundry', en: 'Laundry', tr: 'Çamaşır' },
            { value: 'ironing', en: 'Ironing', tr: 'Ütü' },
            { value: 'cooking', en: 'Cooking', tr: 'Yemek' },
          ],
        },
        {
          key: 'additionalDuties',
          type: 'checkbox',
          wide: true,
          en: 'Additional duties',
          tr: 'Ek görevler',
          options: [
            { value: 'petCare', en: 'Pet care', tr: 'Evcil hayvan bakımı' },
            { value: 'schoolRuns', en: 'School runs', tr: 'Okula götürme / getirme' },
            { value: 'travel', en: 'Travel with family', tr: 'Aileyle seyahat' },
            { value: 'holidays', en: 'Accompany family on holidays', tr: 'Aileyle tatile eşlik' },
            { value: 'driving', en: 'Driving', tr: 'Araç kullanma' },
            OTHER,
          ],
        },
        {
          key: 'dayOff',
          type: 'radio',
          wide: true,
          en: 'Preferred weekly day off',
          tr: 'Haftalık izin günü tercihi',
          options: [
            { value: 'weekday', en: 'Weekday', tr: 'Hafta içi' },
            { value: 'weekend', en: 'Weekend', tr: 'Hafta sonu' },
            { value: 'any', en: 'No preference', tr: 'Fark etmez' },
          ],
        },
        {
          key: 'phoneUse',
          type: 'radio',
          wide: true,
          en: 'Mobile phone use during working hours',
          tr: 'Mesai sırasında cep telefonu kullanımı',
          options: [
            { value: 'allowed', en: 'Allowed', tr: 'Serbest' },
            { value: 'limited', en: 'Limited', tr: 'Sınırlı' },
            { value: 'notAllowed', en: 'Not allowed', tr: 'İzin yok' },
          ],
        },
      ],
    },
    {
      key: 'preferences',
      en: '6. Candidate preferences',
      tr: '6. Aday tercihleri',
      fields: [
        // Philippine rules set 23 as the minimum age for household workers abroad.
        {
          key: 'workerAge',
          type: 'range',
          wide: true,
          min: 23,
          max: 60,
          defaults: [25, 45],
          en: 'Preferred worker age range',
          tr: 'Tercih edilen çalışan yaş aralığı',
          unit: { en: 'years', tr: 'yaş' },
        },
        {
          key: 'english',
          type: 'radio',
          wide: true,
          en: 'English proficiency',
          tr: 'İngilizce seviyesi',
          options: [
            { value: 'basic', en: 'Basic', tr: 'Temel' },
            { value: 'conversational', en: 'Conversational', tr: 'Günlük konuşma' },
            { value: 'fluent', en: 'Fluent', tr: 'Akıcı' },
          ],
        },
        { key: 'otherLanguages', type: 'text', en: 'Other language preferences', tr: 'Diğer dil tercihleri' },
        {
          key: 'minExperience',
          type: 'number',
          min: 0,
          max: 40,
          en: 'Minimum relevant experience (years)',
          tr: 'Asgari ilgili deneyim (yıl)',
        },
        {
          key: 'swimming',
          type: 'radio',
          en: 'Is swimming required?',
          tr: 'Yüzme bilmesi gerekli mi?',
          options: [YES, PREFERRED, NO],
        },
        {
          key: 'drivingLicence',
          type: 'radio',
          en: 'Driving licence required?',
          tr: 'Ehliyet gerekli mi?',
          options: [YES, PREFERRED, NO],
        },
        {
          key: 'skills',
          type: 'textarea',
          wide: true,
          en: 'Preferred skills / training / certifications',
          tr: 'Tercih edilen beceriler / eğitimler / sertifikalar',
        },
        {
          key: 'additionalPreferences',
          type: 'textarea',
          wide: true,
          en: 'Any additional preferences or non-negotiable requirements',
          tr: 'Ek tercihler veya vazgeçilmez koşullar',
        },
      ],
    },
    {
      key: 'eligibility',
      en: '7. Eligibility, start & interviews',
      tr: '7. Uygunluk, başlangıç ve görüşmeler',
      fields: [
        {
          key: 'householdIncome',
          type: 'checkbox',
          required: true,
          wide: true,
          en: 'Monthly household income',
          tr: 'Aylık hane geliri',
          options: [
            {
              value: 'confirmed',
              en: 'I can document a monthly household income above 200,000 TL.',
              tr: 'Aylık hane gelirimin 200.000 TL’nin üzerinde olduğunu resmî belgelerle gösterebilirim.',
            },
          ],
        },
        {
          key: 'startDate',
          type: 'date',
          en: 'Desired start date',
          tr: 'İstenen başlangıç tarihi',
        },
        {
          key: 'interviewAvailability',
          type: 'slots',
          count: 3,
          wide: true,
          en: 'Availability for interviews (Türkiye time)',
          tr: 'Görüşmeler için uygun olunan zamanlar (Türkiye saati)',
          note: { en: 'Other times, e.g. weekday evenings', tr: 'Diğer uygun zamanlar, ör. hafta içi akşamları' },
        },
        {
          key: 'additionalInfo',
          type: 'textarea',
          wide: true,
          en: 'Additional information for candidate matching',
          tr: 'Aday eşleştirmesi için ek bilgiler',
        },
        // The document's "Completed by / date" is left out: the name is asked
        // at the top, and the date is recorded with the submission.
      ],
    },
  ]),

  choose: { en: 'Choose', tr: 'Seçiniz' },

  slot: { en: 'Choice', tr: 'tercih' },

  // Plain text just above the Submit button, not a question.
  dayOffNote: {
    en: 'The worker has one day off per week and may go out, but spends the night at home.',
    tr: 'Çalışan haftada bir gün izin kullanır; izin gününde dışarı çıkabilir, geceyi evde geçirir.',
  },

  // A short notice with a link, in place of the consent checkbox.
  privacy: {
    en: 'Your personal data is processed as described in our',
    tr: 'Kişisel verileriniz',
    linkText: { en: 'KVKK privacy notice', tr: 'KVKK Aydınlatma Metni' },
    after: { en: '.', tr: ' kapsamında işlenir.' },
    href: '/kvkk',
  },

  disclaimer: {
    en: `This form is for initial candidate matching and does not constitute an employment contract or
      confirmation of candidate availability. Employment terms and legal requirements will be confirmed
      separately.`,
    tr: `Bu form, ilk aday eşleştirmesi amacıyla hazırlanmıştır; iş sözleşmesi veya adayın müsait olduğuna
      dair bir teyit niteliği taşımaz. Çalışma koşulları ve yasal gereklilikler ayrıca
      kesinleştirilecektir.`,
  },

  // Shown by the browser when a field does not pass its check.
  messages: {
    required: { en: 'Please fill in this field.', tr: 'Lütfen bu alanı doldurun.' },
    choice: { en: 'Please choose an option.', tr: 'Lütfen bir seçenek işaretleyin.' },
    tel: {
      en: 'Please enter a valid phone number, e.g. 0532 123 45 67 or +90 532 123 45 67.',
      tr: 'Lütfen geçerli bir telefon numarası girin, ör. 0532 123 45 67 veya +90 532 123 45 67.',
    },
    email: {
      en: 'Please enter a valid email address, e.g. name@example.com.',
      tr: 'Lütfen geçerli bir e-posta adresi girin, ör. ad@ornek.com.',
    },
    number: { en: 'Please enter a number from {min} to {max}.', tr: 'Lütfen {min} ile {max} arasında bir sayı girin.' },
    rangeOrder: {
      en: 'The upper age cannot be lower than the lower age.',
      tr: 'Üst yaş sınırı alt sınırdan küçük olamaz.',
    },
    future: {
      en: 'Please choose a date and time from tomorrow on.',
      tr: 'Lütfen yarından itibaren bir tarih ve saat seçin.',
    },
    futureDate: {
      en: 'Please choose a date from tomorrow on.',
      tr: 'Lütfen yarından itibaren bir tarih seçin.',
    },
  },

  submit: { en: 'Submit', tr: 'Gönder' },
  sending: { en: 'Sending…', tr: 'Gönderiliyor…' },
  required: { en: 'Required', tr: 'Zorunlu' },

  success: {
    en: 'Thank you. We have received your answers and will be in touch shortly.',
    tr: 'Teşekkür ederiz. Yanıtlarınız bize ulaştı, en kısa sürede sizinle iletişime geçeceğiz.',
  },
  error: {
    en: 'Sorry, the form could not be sent. Please try again, or email us at',
    tr: 'Üzgünüz, form gönderilemedi. Lütfen tekrar deneyin ya da bize şu adresten yazın:',
  },
  errorEmail: 'info@efka-consulting.com',
  verifying: {
    en: 'The security check is still running. Please try again in a few seconds.',
    tr: 'Güvenlik doğrulaması sürüyor. Lütfen birkaç saniye sonra tekrar deneyin.',
  },
};
