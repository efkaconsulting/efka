/*
 * Turkish copy, transcribed verbatim from EFKA_Web_Sitesi_Metinleri_Guncel.docx.
 *
 * Turkish is the default locale, and this object is the shape the English
 * dictionary must match: `src/data/en/index.ts` is typed `typeof tr`, so a
 * missing or misspelled key there is a build error rather than a blank section.
 *
 * Wording lives here; layout lives in `src/components/pages/`. Nothing in this
 * file is invented. Where the document supplies no copy for a section, the
 * section does not exist.
 */

import { localePath } from '~/i18n/routes';

const p = (key: Parameters<typeof localePath>[0]) => localePath(key, 'tr');

export const tr = {
  /** Short description of the company, from the document's cover table. */
  company: `Filipinler’den uygun çalışanların bulunması, değerlendirilmesi ve Türkiye’de yasal
    olarak istihdam edilmesine yönelik süreci aileler ve işletmeler için tek merkezden yöneten
    iş gücü danışmanlığı.`,

  nav: {
    links: [
      {
        text: 'Hizmetlerimiz',
        href: p('services'),
        links: [
          { text: 'Aileniz İçin', href: `${p('services')}#aileniz-icin` },
          { text: 'Kurumsal Çözümler', href: `${p('services')}#kurumsal-cozumler` },
        ],
      },
      { text: 'Neden Filipinli Bakıcı?', href: p('whyFilipino') },
      { text: 'Sürecimiz', href: p('process') },
      { text: 'Hakkımızda', href: p('about') },
      { text: 'SSS', href: p('faq') },
    ],
    actions: [{ variant: 'primary' as const, text: 'Görüşme Talep Edin', href: p('contact') }],
  },

  footer: {
    description: `EFKA Consulting, Filipinler’den ev hizmetleri, bakım ve kurumsal iş gücü
      ihtiyaçlarına uygun çalışanların bulunması ve Türkiye’de yasal istihdam süreçlerinin
      koordinasyonu konusunda danışmanlık sağlar.`,
    columns: [
      {
        title: 'Hizmetlerimiz',
        links: [
          { text: 'Uluslararası İş Gücü', href: p('services') },
          { text: 'Aileniz İçin', href: `${p('services')}#aileniz-icin` },
          { text: 'Kurumsal Çözümler', href: `${p('services')}#kurumsal-cozumler` },
          { text: 'Neden Filipinli Bakıcı?', href: p('whyFilipino') },
        ],
      },
      {
        title: 'Kurumsal',
        links: [
          { text: 'Hakkımızda', href: p('about') },
          { text: 'Sürecimiz', href: p('process') },
          { text: 'Sık Sorulan Sorular', href: p('faq') },
          { text: 'İletişim', href: p('contact') },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'KVKK Aydınlatma Metni', href: '/privacy' },
      { text: 'Gizlilik Politikası', href: '/privacy' },
      { text: 'Kullanım Koşulları', href: '/terms' },
    ],
    socialLabels: { instagram: 'Instagram', linkedin: 'LinkedIn', email: 'E-posta' },
    footNote: 'consulting · Tüm hakları saklıdır.',
  },

  home: {
    meta: {
      title: 'efka consulting — Filipinler Odaklı İş Gücü Danışmanlığı',
      description: `Filipinler’den uygun çalışanların bulunması, değerlendirilmesi ve Türkiye’de
        yasal olarak istihdam edilmesine yönelik süreci aileler ve işletmeler için tek merkezden
        yöneten iş gücü danışmanlığı.`,
    },
    hero: {
      tagline: 'Filipinler Odaklı İş Gücü Danışmanlığı',
      title: 'Doğru çalışan,<br />güvenle yönetilen bir süreç.',
      subtitle: `Türkiye’nin her yerindeki ailelerin ve işletmelerin ihtiyaçlarına uygun Filipinli
        çalışanların bulunması, değerlendirilmesi ve yasal olarak istihdam edilmesine yönelik
        süreci baştan sona koordine ediyoruz.`,
      actions: [
        { variant: 'primary' as const, text: 'İhtiyacınızı Paylaşın', href: p('contact') },
        { text: 'Süreci İnceleyin', href: p('process') },
      ],
    },
    pillars: [
      {
        title: 'İhtiyaca uygun eşleşme',
        description: `Adayları yalnızca özgeçmişlerine göre değil; deneyim, beklenti ve çalışma
          düzeni uyumu bakımından değerlendiriyoruz.`,
        icon: 'tabler:users-group',
      },
      {
        title: 'Düzenli süreç yönetimi',
        description: `Aday seçiminden gerekli resmî işlemlere ve Türkiye’ye geliş planına kadar
          her aşamayı takip ediyoruz.`,
        icon: 'tabler:list-check',
      },
      {
        title: 'Tek muhatap',
        description: `Türkiye’de süreç boyunca iletişiminizi EFKA ile yürütür, farklı taraflar
          arasındaki koordinasyonu sizin adınıza sağlarız.`,
        icon: 'tabler:messages',
      },
    ],
    solutions: {
      title: 'İhtiyacınıza uygun iş gücü çözümleri',
      subtitle: `Evde bakım ve destek ihtiyaçlarından turizm, konaklama ve üretim işletmelerinin
        personel taleplerine kadar farklı çalışma alanları için uygun adayların belirlenmesine ve
        sürecin planlanmasına destek oluyoruz.`,
      readMore: 'Hizmetlerimizi inceleyin',
    },
    whyEfka: {
      title: 'Neden EFKA?',
      items: [
        {
          title: 'İhtiyaca göre değerlendirme',
          description: `Her aile ve işletmenin ihtiyacını ayrı değerlendiriyor, aday profilini
            görev kapsamına ve beklentilere göre belirliyoruz.`,
        },
        {
          title: 'Tek merkezden süreç yönetimi',
          description: `Adayların belirlenmesinden görüşmelere, belge hazırlığından Türkiye’ye
            geliş planlamasına kadar sürecin farklı aşamalarını tek merkezden koordine ediyoruz.`,
        },
        {
          title: 'Profesyonel çalışma disiplini',
          description: `Kurucumuzun altı yıllık hukuk müşavirliği deneyimi; belge, sözleşme ve
            süreç takibine dayanan çalışma anlayışımıza yön verir.`,
        },
        {
          title: 'Uzun vadeli uyum',
          description: `Amacımız hızlı bir eşleşmeden çok, işveren ile çalışan arasında
            beklentilerin açıkça konuşulduğu ve sürdürülebilir bir çalışma ilişkisinin
            kurulmasıdır.`,
        },
      ],
    },
  },

  services: {
    meta: {
      title: 'Hizmetlerimiz',
      description: `Filipinler odaklı uluslararası iş gücü çözümleri: aileler için bakım
        personeli, işletmeler için turizm, konaklama, üretim ve sanayi alanlarında çalışan temini.`,
    },
    hero: {
      tagline: 'Hizmetlerimiz',
      title: 'Uluslararası İş Gücü',
      paragraphs: [
        `EFKA Consulting, Türkiye genelinde Filipinler odaklı uluslararası iş gücü çözümleri
          sunarak ailelerin ve işletmelerin ihtiyaçlarına uygun çalışanların bulunması,
          değerlendirilmesi ve yasal olarak istihdam edilmesine ilişkin süreci bütüncül bir
          yaklaşımla yönetir.`,
        `Aday seçiminden çalışma izni ve ilgili resmî işlemlerin takibine kadar her aşamada açık
          iletişim, doğru eşleştirme ve yasal uyum esas alınır. Filipinler’deki yetkili iş
          ortaklarımız aracılığıyla nitelikli Filipinli çalışanların Türkiye’deki aileler ve
          işletmelerle buluşturulmasına odaklanıyoruz.`,
      ],
    },
    family: {
      id: 'aileniz-icin',
      title: 'Aileniz İçin',
      paragraphs: [
        `Evinize katılacak kişinin yalnızca mesleki deneyiminin değil; aile düzeninize,
          beklentilerinize ve bakım ihtiyacınıza uygunluğunun da önemli olduğuna inanıyoruz.`,
        `Bebek ve çocuk bakımı, yaşlı refakati ile hasta veya engelli bireylerin günlük bakımına
          destek olabilecek Filipinli adaylar arasından ihtiyacınıza uygun profilleri belirliyor,
          seçtiğiniz adaylarla görüntülü görüşmeler düzenliyoruz.`,
        `Adayların deneyim, eğitim, referans ve adli sicil belgeleri değerlendirilir; gerekli
          sağlık kontrolleri ve resmî işlemler ilgili süreç kapsamında tamamlanır. Çalışanın
          Türkiye’ye gelişi, çalışma izni ve istihdam süreci yürürlükteki mevzuata ve ilgili
          ülkelerin düzenlemelerine uygun şekilde koordine edilir.`,
        `Amacımız yalnızca bir çalışan bulmak değil; ailenizin kendini güvende hissedebileceği,
          karşılıklı beklentilerin açıkça konuşulduğu ve uzun vadeli uyumun gözetildiği bir
          çalışma ilişkisi kurulmasına yardımcı olmaktır.`,
      ],
      items: [
        {
          title: 'Bebek ve Çocuk Bakımı',
          description: `Çocuğunuzun günlük bakımına, yaşına uygun düzeninin sürdürülmesine ve
            gelişiminin desteklenmesine yardımcı olabilecek deneyimli bakıcı ve dadı adayları.`,
          icon: 'tabler:baby-carriage',
        },
        {
          title: 'Yaşlı Bakımı ve Refakat',
          description: `Yaşlı aile bireylerinin günlük yaşamına destek olabilecek, ihtiyaçlarının
            karşılanmasına yardımcı olacak ve güvenli biçimde refakat edebilecek uygun adaylar.`,
          icon: 'tabler:heart-handshake',
        },
        {
          title: 'Hasta ve Engelli Bireylerin Bakımı',
          description: `Hasta veya engelli bireylerin evdeki günlük bakımına ve refakatine destek
            olabilecek, ihtiyacın niteliğine göre deneyim ve yeterlilikleri değerlendirilen
            çalışanlar.`,
          icon: 'tabler:stethoscope',
        },
      ],
      imageAlt: 'Filipinli bir bakıcı, kucağında bir bebekle bir evin oturma odasında',
    },
    corporate: {
      id: 'kurumsal-cozumler',
      title: 'Kurumsal Çözümler',
      paragraphs: [
        `Turizm, konaklama, üretim ve sanayi işletmelerinin uluslararası iş gücü ihtiyaçlarına
          yönelik seçme, değerlendirme ve süreç yönetimi hizmetleri sunuyoruz.`,
        `İşletmenin faaliyet alanını, pozisyonun gerekliliklerini ve çalışma koşullarını analiz
          ederek uygun aday profilini belirliyor; Filipinler’deki yetkili iş ortaklarımızla
          birlikte aday araştırma ve ön değerlendirme sürecini yürütüyoruz. Seçilen çalışanların
          Türkiye’de yasal olarak istihdam edilebilmesi için gerekli çalışma izni ve ilgili resmî
          işlemleri planlı ve takip edilebilir bir süreç içinde koordine ediyoruz.`,
      ],
      items: [
        {
          title: 'Turizm ve Konaklama',
          description: `Otel, butik otel, restoran ve diğer turizm işletmeleri için kat
            hizmetleri, mutfak, servis, misafir ilişkileri ve diğer operasyonel görevlerde
            çalışabilecek adaylar.`,
          icon: 'tabler:bell-ringing',
        },
        {
          title: 'Üretim ve Sanayi',
          description: `Fabrikalar ve üretim tesisleri için üretim, paketleme, depo, sevkiyat ve
            benzeri alanlarda görev alabilecek vasıflı, yarı vasıflı veya yetiştirilebilir
            çalışanlar.`,
          icon: 'tabler:building-factory-2',
        },
        {
          title: 'Toplu İşe Alım Çözümleri',
          description: `Birden fazla çalışan ihtiyacı bulunan işletmeler için pozisyonların
            belirlenmesi, adayların ön değerlendirilmesi, görüşmelerin düzenlenmesi ve seçilen
            çalışanların yasal süreçlerinin planlanması.`,
          icon: 'tabler:users-plus',
        },
      ],
      hospitalityAlt: 'Bir butik otelin resepsiyonunda misafiri karşılayan konaklama personeli',
      manufacturingAlt: 'Bir üretim tesisinde tablet başında toplanmış üretim ekibi',
    },
  },

  whyFilipino: {
    meta: {
      title: 'Neden Filipinli Bakıcı?',
      description: `Filipinli bakıcılar; uluslararası bakım deneyimi, İngilizce iletişim
        becerileri ve özenli çalışma anlayışları nedeniyle dünyanın birçok ülkesinde aileler
        tarafından tercih edilmektedir.`,
    },
    hero: {
      tagline: 'Neden Filipinli Bakıcı?',
      title: 'Neden Filipinli Bakıcı?',
      paragraphs: [
        `Bir bakıcı seçmek, ailenizin günlük yaşamına ve en değer verdiğiniz kişilerin bakımına
          dâhil olacak birini seçmektir. Bu nedenle doğru adayın yalnızca deneyimli olması değil;
          güven veren, sorumluluk sahibi ve aile düzeninize uyum sağlayabilecek bir yaklaşıma
          sahip olması da önemlidir.`,
        `Filipinli bakıcılar, uluslararası bakım alanındaki deneyimleri, İngilizce iletişim
          becerileri ve özenli çalışma anlayışları nedeniyle dünyanın birçok ülkesinde aileler
          tarafından tercih edilmektedir.`,
      ],
      imageAlt: 'Filipinli bir bakıcı, bir çocukla birlikte resimli kitap okuyor',
    },
    blocks: [
      {
        title: 'İngilizce İletişim Ortamı',
        paragraphs: [
          `İngilizce konuşabilen bir bakıcı, özellikle küçük yaşlardaki çocukların dili günlük
            yaşamın doğal akışı içinde duymasına ve İngilizceye aşinalık kazanmasına katkı
            sağlayabilir.`,
        ],
        icon: 'tabler:message-language',
      },
      {
        title: 'Deneyim ve Sorumluluk Bilinci',
        paragraphs: [
          `Adaylar; bakım deneyimleri, eğitimleri, referansları ve görev beklentileri dikkate
            alınarak değerlendirilir. Ailenizin ihtiyaçlarına uygun bulunan profiller sizinle
            paylaşılır ve seçtiğiniz adaylarla görüntülü görüşmeler düzenlenir.`,
        ],
        icon: 'tabler:certificate',
      },
      {
        title: 'Aile Düzenine Uyum',
        paragraphs: [
          `Her ailenin yaşam biçimi, öncelikleri ve beklentileri farklıdır. Bu nedenle aday
            seçiminde yalnızca öz geçmişe değil; iletişim biçimine, görev anlayışına ve aileyle
            uzun vadeli uyum ihtimaline de önem verilir.`,
        ],
        icon: 'tabler:home-heart',
      },
      {
        title: 'Güvenli ve Yasal Süreç',
        paragraphs: [
          `Filipinli ev hizmetleri çalışanlarının yurt dışında istihdamı, hem Türkiye’deki hem de
            Filipinler’deki düzenlemelere tabidir. Süreç; yetkili kurumlar ve Filipinler’deki
            yetkili iş ortaklarıyla koordinasyon içinde, gerekli sözleşmeler, çalışma izni
            başvurusu, belge kontrolleri ve resmî onaylar tamamlanarak yürütülür.`,
          `EFKA Consulting, süreç boyunca ailenizin Türkiye’deki muhatabı olarak her aşamanın
            düzenli, şeffaf ve takip edilebilir biçimde ilerlemesini sağlar.`,
        ],
        icon: 'tabler:shield-check',
      },
    ],
  },

  about: {
    meta: {
      title: 'Hakkımızda',
      description: `EFKA Consulting, ailelerin ve işletmelerin güvenilir çalışanlara ulaşırken
        ihtiyaç duyduğu profesyonel desteği tek merkezden sunmak amacıyla kuruldu.`,
    },
    hero: {
      tagline: 'Hakkımızda',
      title: 'Hakkımızda',
      paragraphs: [
        `EFKA Consulting, ailelerin ve işletmelerin güvenilir çalışanlara ulaşırken ihtiyaç
          duyduğu profesyonel desteği tek merkezden sunmak amacıyla kuruldu.`,
        `Kurucumuzun altı yıllık hukuk müşavirliği deneyimi; belge, sözleşme ve süreç takibine
          dayanan çalışma disiplinimizin temelini oluşturur.`,
        `Filipinler odaklı çalışan EFKA; ev hizmetleri ve bakım personelinin yanı sıra turizm,
          konaklama, üretim ve sanayi işletmelerinin iş gücü ihtiyaçları için uygun adayların
          belirlenmesine ve yasal istihdam sürecinin koordinasyonuna destek sağlar.`,
      ],
    },
    mission: {
      title: 'Misyonumuz',
      description: `İşverenlerin ihtiyaçlarına uygun çalışanlara güvenli, açık ve düzenli bir
        süreçle ulaşmasını; çalışanların ise görev tanımı ve çalışma koşulları baştan
        netleştirilmiş iş ilişkilerine yerleşmesini sağlamak.`,
      icon: 'tabler:target-arrow',
    },
    vision: {
      title: 'Vizyonumuz',
      description: `Ev hizmetlerinden kurumsal iş gücü çözümlerine uzanan, uluslararası çalışan
        istihdamında güvenilir ve uzun vadeli bir danışmanlık markası olmak.`,
      icon: 'tabler:telescope',
    },
  },

  process: {
    meta: {
      title: 'Sürecimiz',
      description: `İhtiyacın belirlenmesinden çalışanın Türkiye’ye gelişine kadar altı aşamalı,
        takip edilebilir bir süreç.`,
    },
    hero: {
      tagline: 'Sürecimiz',
      title: 'Sürecimiz',
      subtitle: `Her ihtiyaç farklıdır. Süreci standart bir aday listesi sunmak yerine, işverenin
        beklentilerini ve çalışma koşullarını anlayarak başlatırız.`,
    },
    steps: [
      {
        title: 'İhtiyacın belirlenmesi',
        description: 'Aranan görev, bakım veya iş gücü ihtiyacı ve temel beklentiler görüşülür.',
        icon: 'tabler:message-circle-search',
      },
      {
        title: 'Ön değerlendirme',
        description: `İşverenin ve pozisyonun ilgili süreç bakımından uygunluğu değerlendirilir;
          izlenecek yol açıklanır.`,
        icon: 'tabler:clipboard-check',
      },
      {
        title: 'Adayların belirlenmesi',
        description: 'İhtiyaca uygun bulunan adaylar seçilerek işverene sunulur.',
        icon: 'tabler:user-search',
      },
      {
        title: 'Görüşme ve seçim',
        description: `İşveren adaylarla çevrim içi görüşmeler yapar; ihtiyaç hâlinde ek görüşmeler
          düzenlenir.`,
        icon: 'tabler:video',
      },
      {
        title: 'Belge ve onay süreci',
        description: `Seçilen aday ve işverene ilişkin gerekli belgeler hazırlanır; ilgili kurum
          ve taraflar arasındaki süreç koordine edilir.`,
        icon: 'tabler:file-check',
      },
      {
        title: 'Türkiye’ye geliş ve başlangıç',
        description: `Uçuş planlaması tamamlanır; çalışanın Türkiye’ye gelişi ve göreve başlangıç
          sonrasındaki temel işlemler konusunda işveren bilgilendirilir.`,
        icon: 'tabler:plane-arrival',
      },
    ],
    cta: { variant: 'primary' as const, text: 'Süreç Hakkında Görüşün', href: p('contact') },
  },

  faq: {
    meta: {
      title: 'Sık Sorulan Sorular',
      description: `Hizmet alanları, sürecin ortalama süresi, aday seçimi ve aracı kurum
        gerekliliği hakkında sık sorulan sorular.`,
    },
    hero: {
      tagline: 'Sık Sorulan Sorular',
      title: 'Sık Sorulan Sorular',
    },
    items: [
      {
        title: 'Hangi alanlarda çalışan temin ediyorsunuz?',
        description: `Bebek ve çocuk bakımı, yaşlı bakımı ve refakat, hasta veya engelli
          bireylerin evde bakımı ile turizm, konaklama, üretim ve sanayi alanlarında Filipinli
          çalışanlara yönelik danışmanlık sağlıyoruz.`,
      },
      {
        title: 'Süreç ortalama ne kadar sürer?',
        description: `Adayın seçilmesinden Türkiye’ye gelişine kadar olan süreç ortalama yaklaşık
          iki ay sürer. Evrakların hazırlanması, resmî onaylar ve uçuş planına göre süre
          değişebilir.`,
      },
      {
        title: 'Aday seçim süreci nasıl ilerler?',
        description: `İhtiyacınıza uygun; deneyimli, eğitimli ve referanslı adaylardan oluşan
          havuzumuz içerisinden size özel bir ön seçim yaparız. Seçtiğimiz adayların profillerini
          sizinle paylaşır, görüşmek istediklerinizle çevrim içi görüntülü görüşmeler düzenleriz.`,
      },
      {
        title: 'Filipinli bir çalışanı aracı kurum olmadan getirmek mümkün müdür?',
        description: `Filipinler’in yurt dışı istihdam kuralları gereği ev hizmetleri
          çalışanlarında doğrudan işe alım yalnızca çok sınırlı istisnalarda mümkündür. Genel
          uygulamada Filipinler’de ve Türkiye’de yetkili iki partner kuruluş üzerinden ilerlenir.`,
      },
    ],
  },

  contact: {
    meta: {
      title: 'İletişim',
      description: `Aileniz veya işletmeniz için aradığınız çalışan profilini bizimle paylaşın.
        İlk görüşmede ihtiyacınızı dinleyip size açık bir yol haritası sunalım.`,
    },
    hero: {
      tagline: 'İletişim',
      title: 'İhtiyacınızı birlikte değerlendirelim.',
      subtitle: `Aileniz veya işletmeniz için aradığınız çalışan profilini bizimle paylaşın. İlk
        görüşmede ihtiyacınızı dinleyelim, uygunluk ve izlenebilecek süreç hakkında size açık bir
        yol haritası sunalım.`,
    },
    cta: { variant: 'primary' as const, text: 'Görüşme Talep Edin', href: 'mailto:info@efkaconsulting.com' },
    details: [
      { title: 'E-posta', description: 'info@efkaconsulting.com', icon: 'tabler:mail' },
      { title: 'Adres', description: 'Nispetiye Cad., Etiler, İstanbul', icon: 'tabler:map-pin' },
    ],
  },

  /** Alt text for the panorama above the footer. */
  bannerAlt: 'İstanbul ve Kapadokya manzarasının birleştiği panoramik görsel',
};
