/*
 * Every line of Turkish copy on the home page lives here.
 *
 * `src/pages/index.astro` stays a thin composition: it decides band order and
 * layout, this decides wording. Rewriting copy — or handing it to a copywriter,
 * or translating the site later — never means touching markup.
 *
 * PLACEHOLDER CONTENT. Names, figures and testimonials are invented and must be
 * replaced before launch.
 */

import type { CallToAction, Item, Stat, Testimonial } from '~/types';

export const meta = {
  title: 'efka',
  ignoreTitleTemplate: true,
};

export const hero = {
  tagline: 'Ev ve Bakım Personeli Danışmanlığı',
  title: 'Evinizin huzuru,<br />doğru kişiyle başlar.',
  subtitle: `efka; dadı, bebek bakıcısı, yaşlı refakatçisi ve ev işletmesi personelini
    ailenizle buluşturur. Her aday, sizinle tanışmadan önce referans, adli sicil ve sağlık
    kontrolünden geçer. Sınırlı sayıda aile ile, tam gizlilik içinde çalışırız.`,
  actions: [
    { variant: 'primary', text: 'Görüşme Talebi', href: '#iletisim' },
    { text: 'Sürecimiz', href: '#surec' },
  ] as CallToAction[],
};

export const services = {
  tagline: 'Hizmetlerimiz',
  title: 'Hanenizin her ihtiyacı için seçilmiş personel',
  subtitle: `Her hizmet kalemi için ayrı bir aday havuzu ve ayrı bir değerlendirme ölçütü
    kullanırız. Aradığınız profil listemizde yoksa, size özel arama başlatırız.`,
  items: [
    {
      title: 'Dadı ve Bebek Bakıcısı',
      description: `Yenidoğan bakımından okul çağına kadar; çocuk gelişimi eğitimi almış,
        ilk yardım sertifikalı ve uzun süreli çalışma geçmişi doğrulanmış dadılar.`,
      icon: 'tabler:baby-carriage',
    },
    {
      title: 'Yaşlı ve Hasta Refakati',
      description: `Kronik hastalık takibi, hareket kısıtlılığı ve demans bakımı konusunda
        deneyimli refakatçiler. Hemşirelik geçmişi olan adaylar ayrıca değerlendirilir.`,
      icon: 'tabler:heart-handshake',
    },
    {
      title: 'Ev İşletmesi Personeli',
      description: `Yatılı veya gündüzlü ev hanımı, kat görevlisi ve hane yöneticisi.
        Büyük hanelerde birden fazla personelin koordinasyonu da tarafımızca kurgulanır.`,
      icon: 'tabler:home-heart',
    },
    {
      title: 'Özel Şoför ve Aşçı',
      description: `Temiz sicil ve kusursuz sürüş geçmişine sahip özel şoförler; mutfak
        deneyimi ve özel diyet bilgisi doğrulanmış ev aşçıları.`,
      icon: 'tabler:tools-kitchen-2',
    },
    {
      title: 'Geçici ve Seyahat Refakati',
      description: `Yaz dönemi, yurt dışı seyahati veya doğum sonrası gibi belirli süreli
        ihtiyaçlar için, aynı titizlikle seçilmiş kısa dönem personel.`,
      icon: 'tabler:plane-departure',
    },
    {
      title: 'Kurumsal Ev Ofis Desteği',
      description: `Rezidans ve aile ofisleri için karşılama, arşiv ve gündelik operasyon
        personeli; gizlilik sözleşmesi ve kurumsal referans süreciyle.`,
      icon: 'tabler:briefcase',
    },
  ] as Item[],
};

export const process = {
  tagline: 'Sürecimiz',
  title: 'Bir adayın size ulaşana kadar geçtiği dört aşama',
  subtitle: `Başvuran her yüz adaydan yaklaşık altısı bu süreci tamamlar. Elemeyi biz yaparız,
    böylece siz yalnızca uygun bulduğumuz kişilerle tanışırsınız.`,
  items: [
    {
      title: 'Birinci Aşama: <span class="font-medium">Ön Değerlendirme</span>',
      description: `Başvuru dosyası, çalışma geçmişi ve hizmet alanı uyumu incelenir. Kesintili
        çalışma geçmişi olan veya beyanı doğrulanamayan adaylar bu aşamada elenir.`,
      icon: 'tabler:file-search',
    },
    {
      title: 'İkinci Aşama: <span class="font-medium">Referans ve Sicil Kontrolü</span>',
      description: `Son üç işverenle doğrudan görüşülür. Adli sicil kaydı, kimlik doğrulaması ve
        sağlık raporu resmî kanallardan teyit edilir. Bu aşama istisnasız uygulanır.`,
      icon: 'tabler:shield-check',
    },
    {
      title: 'Üçüncü Aşama: <span class="font-medium">Yüz Yüze Mülakat</span>',
      description: `Adayla ofisimizde görüşülür; mesleki yetkinliğin yanında mizaç, iletişim
        biçimi ve hanenizin işleyişine uyumu değerlendirilir.`,
      icon: 'tabler:users',
    },
    {
      title: 'Dördüncü Aşama: <span class="font-medium">Yerleştirme ve Takip</span>',
      description: `Tanışma görüşmesi ve deneme dönemi tarafımızca kurgulanır. Yerleştirmenin
        ardından ilk altı ay boyunca düzenli olarak her iki tarafla da temas hâlinde kalırız.`,
      icon: 'tabler:notebook',
    },
  ] as Item[],
};

export const about = {
  tagline: 'Hakkımızda',
  title: 'Aracı değil, danışman',
  intro: 'Bir ismi tavsiye etmeden önce, o ismin arkasında durabilecek durumda olmak isteriz.',
  items: [
    {
      title: 'Hukuki zeminde çalışırız',
      description: `Her yerleştirme; yazılı hizmet sözleşmesi, gizlilik taahhüdü ve KVKK uyumlu
        veri işleme esasına dayanır. Sözleşme metinleri hukuk müşavirimiz tarafından hazırlanır.`,
    },
    {
      title: 'Sınırlı sayıda aile ile ilerleriz',
      description: `Aynı dönemde kabul ettiğimiz aile sayısını bilinçli olarak düşük tutarız;
        her dosyayı tek bir danışman baştan sona takip eder.`,
    },
    {
      title: 'Gizlilik esastır',
      description: `Aile bilgileriniz, adres ve hane düzeniniz yalnızca sürecin gerektirdiği
        ölçüde paylaşılır. Referans olarak adınız hiçbir koşulda kullanılmaz.`,
    },
  ] as Item[],
  image: {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    alt: 'Sade ve zarif bir salon iç mekânı',
  },
};

export const stats = [
  { title: 'Yıllık deneyim', amount: '14' },
  { title: 'Tamamlanan yerleştirme', amount: '480+' },
  { title: 'İlk yıl devam oranı', amount: '%92' },
  { title: 'Aday kabul oranı', amount: '%6' },
] as Stat[];

export const testimonials = {
  tagline: 'Referanslar',
  title: 'Birlikte çalıştığımız aileler',
  subtitle: 'Gizlilik esasımız gereği isimler kısaltılmış olarak paylaşılmaktadır.',
  items: [
    {
      testimonial: `İki ay boyunca kendi imkânlarımızla aradık ve sonuç alamadık. efka bize üç
        aday sundu, üçü de görüşmeye değerdi. İkinci adayla iki yıldır çalışıyoruz.`,
      name: 'A. Y.',
      job: 'İki çocuklu aile · Beşiktaş',
    },
    {
      testimonial: `Annemin bakımı için refakatçi arıyorduk. Sağlık geçmişini gerçekten okuyan,
        doğru soruları soran ilk yer burasıydı. Süreç boyunca hiçbir şeyi biz kovalamadık.`,
      name: 'M. K.',
      job: 'Yaşlı refakati · Kadıköy',
    },
    {
      testimonial: `Sözleşmenin bu kadar net olması bizim için belirleyici oldu. Karşılıklı
        hak ve sorumluluklar baştan yazılıydı; sonradan konuşulacak bir konu kalmadı.`,
      name: 'S. D.',
      job: 'Ev işletmesi personeli · Sarıyer',
    },
  ] as Testimonial[],
};

export const faqs = {
  tagline: 'Sıkça Sorulan Sorular',
  title: 'Merak edilenler',
  items: [
    {
      title: 'Süreç ne kadar sürüyor?',
      description: `İlk görüşmeden aday sunumuna kadar ortalama on ila on beş gün. Özel bir
        profil aranıyorsa bu süre uzayabilir; her aşamada size tarih verilir.`,
    },
    {
      title: 'Ücretlendirme nasıl işliyor?',
      description: `Danışmanlık ücreti, yerleştirilen personelin brüt aylık ücreti üzerinden
        tek seferlik olarak hesaplanır. Görüşme ve aday sunumu için ön ödeme alınmaz.`,
    },
    {
      title: 'Uyum sağlanamazsa ne oluyor?',
      description: `İlk üç ay içinde çalışma sona ererse, ek danışmanlık ücreti talep etmeden
        yeni aday sunarız. Bu güvence hizmet sözleşmesinde yazılıdır.`,
    },
    {
      title: 'Adayların sicil kontrolü gerçekten yapılıyor mu?',
      description: `Evet, istisnasız. Adli sicil kaydı, kimlik doğrulaması ve sağlık raporu
        dosyada tutulur; talep etmeniz hâlinde tarafınızla paylaşılır.`,
    },
    {
      title: 'Yabancı uyruklu personel ile çalışıyor musunuz?',
      description: `Çalışma izni bulunan veya izin süreci tarafımızca yürütülebilecek adaylarla
        çalışıyoruz. İzinsiz istihdama hiçbir koşulda aracılık etmeyiz.`,
    },
    {
      title: 'İstanbul dışında hizmet veriyor musunuz?',
      description: `Ankara ve İzmir'de sınırlı sayıda yerleştirme yapıyoruz. Yazlık dönem
        talepleri için Bodrum ve Çeşme'de mevsimlik aday havuzumuz bulunuyor.`,
    },
  ] as Item[],
};

export const journal = {
  title: 'Günlükten',
  information: `Personel seçimi, hane düzeni ve çalışma ilişkileri üzerine yazdıklarımız.
    Bir aday görüşmesine hazırlanırken nelere dikkat edilmeli, sözleşmede hangi maddeler
    bulunmalı — deneyimimizden damıttıklarımız.`,
};

export const contact = {
  tagline: 'İletişim',
  title: 'Bir görüşme ile başlayalım',
  subtitle: `İlk görüşme ücretsizdir ve yaklaşık kırk beş dakika sürer. Hanenizin işleyişini,
    beklentilerinizi ve zamanlamanızı dinleriz; ardından size uygun bir yol haritası sunarız.`,
  actions: [
    { variant: 'primary', text: 'Görüşme Talep Edin', href: 'mailto:info@efkaconsulting.com' },
  ] as CallToAction[],
};
