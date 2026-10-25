# MADE Design Studio — Website

Bilingual (العربية / English) website for **MADE Design Studio**, a luxury interior design, fit-out and custom furniture studio in Khobar. It is built with **Next.js 15** and managed from **Sanity CMS**.

- Arabic is the default and is served at `/ar`; English is at `/en`. Each locale sets RTL/LTR.
- Home page sections:
  - blueprint hero, services, Made to Fit
  - featured projects
  - browse by space
  - before/after slider
  - WhatsApp testimonials (16 screenshots)
  - journey
  - **cost estimator → WhatsApp** ("تحدث مع مهندس مختص")
  - studio, journal
- Other pages:
  - `/projects` has tabs for projects (with sector filters), by space (masonry + lightbox), and before & after.
  - `/projects/[slug]` shows each project's gallery and a WhatsApp CTA.
  - `/blog` and `/blog/[slug]` have an automatic table of contents, FAQ, and Article + FAQ JSON-LD.
- **Sanity Studio** is at `/studio`. From there you can edit projects, spaces, before/after pairs, testimonials, articles, estimator prices, and **every SEO field**: meta title/description, focus keyword, OG image, noIndex, and image alt text.
- SEO:
  - hreflang ar/en
  - canonical URLs
  - `sitemap.xml` and `robots.txt`
  - InteriorDesigner schema
  - self-hosted fonts
  - statically generated pages

> Until Sanity is connected, the site runs on the built-in content in `lib/seed.ts`, so it works immediately.

---

## التشغيل محليًا

```bash
npm install
cp .env.example .env
npm run dev        # http://localhost:3000/ar
```

## Sanity — متصل ✅

- المشروع: **made** · Project ID: `d5a0q2ye` · Dataset: `production`
- المحتوى مرفوع بالكامل: 18 مشروع، 8 مساحات، 6 مقارنات قبل/بعد، 16 رسالة واتساب، 3 مقالات بالـ SEO، إعدادات الموقع وأسعار الحاسبة، و193 صورة.
- CORS مضاف: `http://localhost:3000` و `https://made-sa.co` و `https://www.made-sa.co`. لو نشرت على دومين تاني (مثلًا Vercel) أضفه من sanity.io/manage → API → CORS.
- لوحة التحكم: افتح `/studio` على الموقع وسجّل دخول بحساب Sanity.

**بعد النشر — تحديث فوري بعد Publish:** من **API → Webhooks** أضف:
- URL: `https://made-sa.co/api/revalidate`
- Trigger: Create / Update / Delete — Projection: `{_type, "slug": slug.current}`
- Secret: نفس قيمة `SANITY_REVALIDATE_SECRET` في متغيرات الاستضافة
(بدون webhook الصفحات تتحدث تلقائيًا كل ساعة.)

> `npm run seed` موجود لو احتجت تعيد رفع المحتوى المدمج لمشروع/داتاسيت جديد (يحتاج `SANITY_API_WRITE_TOKEN`).

## النشر (Vercel أو Railway)

- اربط هذا المستودع، ثم أضف متغيرات `.env.example` في إعدادات المشروع.
- Build: `npm run build`، Start: `npm start` (يحترم متغير `PORT`).

## الهيكل

```
app/[locale]/            الصفحات (الرئيسية، المشاريع، المدونة)
app/studio/              Sanity Studio
app/api/revalidate/      Webhook التحديث
components/              مكوّنات الواجهة (Estimator, Testimonials, BeforeAfterSlider…)
lib/seed.ts              المحتوى المدمج (18 مشروع، 8 مساحات، 16 رسالة واتساب، 3 مقالات)
lib/i18n.ts              نصوص الواجهة عربي / إنجليزي
sanity/schemaTypes/      نماذج المحتوى + حقول SEO
scripts/seed-sanity.ts   استيراد المحتوى إلى Sanity
public/images/           صور المشاريع
```

## الخصوصية

لقطات واتساب مقصوصة، وأسماء العملاء وصورهم مخفية. في Sanity يوجد حقل «العميل وافق على النشر» لكل رسالة.
