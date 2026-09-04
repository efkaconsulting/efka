# efka: launch content and Turkish/English routing

Date: 2026-09-04

## Problem

The site ships AstroWind placeholder copy plus a layer of invented efka
content: fabricated testimonials, invented statistics, three placeholder
blog posts, and a positioning ("Istanbul domestic staff agency") that no
longer matches the business.

Two supplied documents replace all of it:

- `EFKA_Web_Sitesi_Metinleri_Guncel.docx` (Turkish)
- `EFKA_Website_Content_EN .docx` (English)

Both carry the same nine sections. The business they describe is a
Philippines-focused workforce consultancy serving both families and
businesses (tourism, hospitality, manufacturing) across Turkiye.

Copy is used verbatim. Where a section has no supplied copy, nothing is
invented to fill it.

## Routing

Turkish is the default locale and sits at the root. English sits under
`/en/`. This uses Astro's native `i18n` config with
`prefixDefaultLocale: false`.

| Turkish                   | English                        | Doc section                            |
| ------------------------- | ------------------------------ | -------------------------------------- |
| `/`                       | `/en/`                         | 1 Home, plus 4 "Neden EFKA?" as a band |
| `/hizmetler`              | `/en/services`                 | 2 Services                             |
| `/neden-filipinli-bakici` | `/en/why-a-filipino-caregiver` | 3                                      |
| `/hakkimizda`             | `/en/about`                    | 5 About, Mission, Vision               |
| `/surecimiz`              | `/en/process`                  | 6                                      |
| `/sss`                    | `/en/faq`                      | 7                                      |
| `/iletisim`               | `/en/contact`                  | 8                                      |

Section 9 is the footer and applies to every page.

Section 4 is four short items and reads as a home-page band rather than a
page of its own, so that is where it goes.

## Keeping one layout, not fourteen

Each page's composition lives once in `src/components/pages/*.astro`,
taking a `lang` prop. Route files are thin:

```astro
---
import Services from '~/components/pages/Services.astro';
---

<Services lang="en" />
```

Copy lives in `src/data/tr/*.ts` and `src/data/en/*.ts`, mirroring the
existing `src/data/home/content.ts` separation of wording from markup.

`src/i18n/routes.ts` holds the slug pairs. The header's `TR | EN`
switcher uses it to link to the same page in the other language, rather
than dumping every visitor on the home page.

## Images

Converted to webp with Sharp (already a dependency). 9.6 MB of PNG
becomes 410 KB.

| Source                   | Output                   | Placement                      |
| ------------------------ | ------------------------ | ------------------------------ |
| `banner.png`             | `banner.webp`            | Strip above the footer         |
| `nanny2.png`             | `family-care.webp`       | "Aileniz Icin" lead            |
| `nanny.png`              | `childcare-reading.webp` | "Neden Filipinli Bakici?" hero |
| `hospitality.png`        | `hospitality.webp`       | "Turizm ve Konaklama"          |
| `kurumsal workforce.png` | `manufacturing.webp`     | "Uretim ve Sanayi"             |

`banner.png` carries `efka-consulting.com` and `info@efkaconsulting.com`
burned into a bar across the bottom. Row analysis puts that bar at rows
353 to 417, with photo content ending at row 352, so the image is cropped
to 1224x352. The footer already carries both the domain and the address.

The banner is 1224 px wide, which is modest for a full-bleed strip. It
may look soft on wide displays. A larger source would fix that.

## Removals

Confirmed with the user:

- Testimonials. The three entries (A.Y., M.K., S.D.) are invented and the
  documents supply no replacements.
- Statistics. "14 years", "480+ placements", "%92 retention", "%6
  acceptance" are all invented. The new copy makes no numeric claims.
- The blog ("Gunluk"). Three placeholder posts, and no blog appears in
  the new footer menu. Removing it also drops `src/pages/[...blog]/`,
  `rss.xml.ts`, and the blog nav entries.

Also removed: the AstroWind demo pages, which are still live routes
serving lorem ipsum and would collide with the new structure.
`/services` currently reads "Elevate your projects with our stunning
templates". This covers `about.astro`, `services.astro`, `contact.astro`,
`pricing.astro`, `homes/*`, and `landing/*`.

## Not built

A contact form. The documents list seven fields under "Iletisim formu
alanlari" (name, phone, email, city, service type, brief description,
KVKK consent). The user chose to skip it for now, so the contact page
keeps the existing mailto call to action. The field list stays in the
documents for later.

## Decisions taken during implementation

**Header navigation labels.** The documents specify the footer menu wording but
say nothing about the header. Five links plus a dropdown, a language switcher
and a call-to-action button do not fit the centred three-column header layout,
which gave the navigation only a third of the width and overlapped the
switcher. Two changes fixed it: the header now uses the left-aligned logo
layout (`position="right"`), and the header abbreviates the longest label
("Sik Sorulan Sorular" to "SSS", "Frequently Asked Questions" to "FAQ"). The
footer keeps the document's full wording.

**The language switcher and view transitions.** The header carries
`transition:persist`, so it survives a navigation and its server-rendered
hrefs would keep describing the page the visitor first arrived on. The
switcher re-resolves both links on every `astro:page-load` from a path table
serialized into the page, the same way `Header.astro` re-computes its
active-link class. Verified: navigating `/hizmetler` to `/surecimiz` to `/sss`
keeps the English link in step, and switching from `/sss` lands on `/en/faq`.

## Left alone, flagged

`privacy.md` and `terms.md` are template text, and the footer links a
KVKK notice at the privacy URL. The documents supply no legal copy and
none is invented. Real text is needed before launch.

## Verification

1. `npm run build` succeeds.
2. `npm run check` passes.
3. All fourteen routes return 200.
4. Turkish and English home pages reviewed in the browser, including the
   language switcher round trip and mobile width.
