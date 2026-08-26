import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Hizmetler',
      links: [
        { text: 'Dadı ve Bebek Bakıcısı', href: getPermalink('/#hizmetler') },
        { text: 'Yaşlı ve Hasta Refakati', href: getPermalink('/#hizmetler') },
        { text: 'Ev İşletmesi Personeli', href: getPermalink('/#hizmetler') },
        { text: 'Özel Şoför ve Aşçı', href: getPermalink('/#hizmetler') },
      ],
    },
    { text: 'Sürecimiz', href: getPermalink('/#surec') },
    { text: 'Hakkımızda', href: getPermalink('/#hakkimizda') },
    { text: 'Günlük', href: getBlogPermalink() },
    { text: 'Sıkça Sorulanlar', href: getPermalink('/#sss') },
  ],
  actions: [{ text: 'Görüşme Talebi', href: getPermalink('/#iletisim') }],
};

export const footerData = {
  links: [
    {
      title: 'Hizmetler',
      links: [
        { text: 'Dadı ve Bebek Bakıcısı', href: getPermalink('/#hizmetler') },
        { text: 'Yaşlı ve Hasta Refakati', href: getPermalink('/#hizmetler') },
        { text: 'Ev İşletmesi Personeli', href: getPermalink('/#hizmetler') },
        { text: 'Özel Şoför ve Aşçı', href: getPermalink('/#hizmetler') },
      ],
    },
    {
      title: 'Kurumsal',
      links: [
        { text: 'Hakkımızda', href: getPermalink('/#hakkimizda') },
        { text: 'Sürecimiz', href: getPermalink('/#surec') },
        { text: 'Sıkça Sorulanlar', href: getPermalink('/#sss') },
        { text: 'Günlük', href: getBlogPermalink() },
      ],
    },
    {
      title: 'Adaylar İçin',
      links: [
        { text: 'Aday Başvurusu', href: getPermalink('/#iletisim') },
        { text: 'Referans Süreci', href: getPermalink('/#surec') },
        { text: 'Çalışma Koşulları', href: getPermalink('/#sss') },
      ],
    },
    {
      title: 'İletişim',
      links: [
        { text: 'Görüşme Talebi', href: getPermalink('/#iletisim') },
        { text: 'info@efkaconsulting.com', href: 'mailto:info@efkaconsulting.com' },
        { text: 'Nispetiye Cad., Etiler, İstanbul', href: getPermalink('/#iletisim') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Kullanım Koşulları', href: getPermalink('/terms') },
    { text: 'Gizlilik Politikası', href: getPermalink('/privacy') },
    { text: 'KVKK Aydınlatma Metni', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'E-posta', icon: 'tabler:mail', href: 'mailto:info@efkaconsulting.com' },
  ],
  footNote: `
    <span class="font-heading text-base">efka</span> consulting · Tüm hakları saklıdır.
  `,
};
