import type { Locale } from './types';

export const locales: Locale[] = ['ar', 'en'];
export const isLocale = (v: string): v is Locale => (locales as string[]).includes(v);
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://made-sa.co').replace(/\/$/, '');

const ar = {
  nav: { home: 'الرئيسية', services: 'الخدمات', projects: 'المشاريع', journey: 'رحلة المشروع', studio: 'الاستوديو', blog: 'المدونة', start: 'ابدأ مشروعك', other: 'EN' },
  hero: {
    eyebrow: 'LUXURY INTERIOR DESIGN · CRAFTED & DELIVERED',
    title1: 'من خطٍّ على الورق', title2: 'إلى مساحةٍ تُشبهك.',
    body: 'استوديو تصميم داخلي وتنفيذ فاخر في المنطقة الشرقية. نصمّم المساحة، ونصنع أثاثها بأيدينا، وندير تنفيذها حتى نسلّمك المفتاح.',
    cta1: 'احسب تكلفة مشروعك', cta2: 'شاهد مشاريعنا', cities: ['الخُبر', 'الظهران', 'الدمام'], badge: 'من المخطط إلى التنفيذ',
  },
  words: [['01 — DESIGN', 'رؤية وتصميم مدروس'], ['02 — CRAFT', 'أثاث وخشبيات تُصنع للمكان'], ['03 — EXECUTION', 'إدارة تنفيذ بجودة عالية'], ['04 — EXPERIENCE', 'تجربة تسليم مفتاح مريحة']],
  services: {
    eyebrow: 'SERVICES', title: 'فريق واحد. رؤية واحدة. مساحة مكتملة.', body: 'لا تحتاج أن تدير خمس شركات لتصنع مساحة واحدة جميلة. نتولى كل مرحلة، أو المرحلة التي تحتاجها فقط.',
    items: [
      ['التصميم الداخلي', 'تخطيط المساحات، الهوية البصرية للمكان، Mood boards، ومخططات تنفيذية دقيقة.'],
      ['التشطيب والتنفيذ Fit-Out', 'إدارة الموقع، توريد الخامات، والإشراف الهندسي الكامل حتى آخر تفصيلة.'],
      ['الأثاث والخشبيات المفصّلة', 'مطابخ، خزائن، وحدات تلفزيون، أبواب، تجاليد جدارية وأثاث مجالس… تُصنع للمساحة بدقة.'],
      ['تسليم مفتاح Turnkey', 'نستلم المشروع من مرحلة العظم وحتى الفرش النهائي. أنت تستلم مساحة جاهزة للحياة.'],
    ],
    for: 'نصمّم لـ', sectors: ['الفلل والمنازل', 'الشقق الفاخرة', 'المكاتب والشركات', 'المطاعم والكافيهات', 'المتاجر والمعارض', 'المنشآت الطبية والمستشفيات'], more: 'اعرف أكثر ←',
  },
  fit: { eyebrow: 'MADE TO FIT', t1: 'لا نشتري للمساحة.', t2: 'نصنع لها.', body: 'الفخامة لا تأتي من الخامة الأغلى، بل من الخامة الصحيحة في المكان الصحيح. كل قطعة تمر من التصميم إلى الورشة إلى التركيب تحت إشرافنا.', steps: ['مساحة فارغة', 'تصميم على المقاس', 'التصنيع في الورشة', 'التركيب في الموقع', 'المساحة النهائية'] },
  projects: { eyebrow: 'THE STORY BEHIND MADE', title: 'كل مشروع له قصة.', all: 'كل المشاريع', featured: 'FEATURED · HEALTHCARE', executed: 'منفّذ · صور حقيقية', view: 'شاهد المشروع كاملًا', photos: 'صورة' },
  spaces: { eyebrow: 'BROWSE BY SPACE', title: 'ادخل إلى المساحة التي تهمّك', body: 'مجالس، سفرة، غرف نوم، أثاث مفصّل… كل مساحة تجمع أعمالنا من مشاريع مختلفة في مكان واحد.' },
  ba: { eyebrow: 'BEFORE → AFTER', title: 'اسحب… وشاهد التحوّل.', all: 'كل مقارنات قبل وبعد', before: 'قبل', after: 'بعد', note: 'صور حقيقية من الموقع' },
  wa: { eyebrow: 'IN THEIR WORDS · شو قالوا عنّا', title1: 'كلامهم… كما وصلنا', title2: 'على الواتساب.', note: 'رسائل حقيقية من عملائنا بعد التسليم. أخفينا الأسماء والصور الشخصية احترامًا لخصوصيتهم.', count: 'رسالة من عملائنا', hint: 'مرّر فوق أي رسالة لإيقافها · اضغط لتكبيرها' },
  journey: { eyebrow: 'TURNKEY JOURNEY', title: 'رحلة مشروعك معنا', steps: [['استشارة وفهم الاحتياج', 'نسمع أسلوب حياتك أو طبيعة عملك قبل أي خط.'], ['التصميم واختيار الخامات', 'مخططات، تصوّر ثلاثي الأبعاد، وعينات خامات حقيقية.'], ['التصنيع والتنفيذ', 'الورشة والموقع يعملان معًا بإشراف هندسي واحد.'], ['التنسيق والتسليم', 'نرتّب آخر التفاصيل ونسلّمك المفتاح.']] },
  est: {
    eyebrow: 'PROJECT ESTIMATE', title1: 'اعرف تكلفة مشروعك', title2: 'في دقيقة.', body: 'اختر نوع المساحة والخدمة والمساحة التقريبية، وسنرسل لك تقديرًا مبدئيًا ثم نكمل معك على واتساب.', note: '* التقدير مبدئي، والتكلفة النهائية بعد زيارة الموقع.',
    type: 'نوع المساحة', service: 'الخدمة المطلوبة', tier: 'مستوى التشطيب', area: 'المساحة التقريبية', result: 'التكلفة التقديرية', perM: 'ريال / م²', cta: 'تحدث مع مهندس مختص',
    types: [['villa', 'فيلا / منزل', 1], ['apt', 'شقة', 0.95], ['office', 'مكتب', 1.05], ['retail', 'مطعم / متجر', 1.15], ['medical', 'منشأة طبية', 1.3]],
    services: [['design', 'تصميم داخلي فقط'], ['fitout', 'تشطيب وتنفيذ'], ['turnkey', 'تسليم مفتاح']],
    tiers: [['signature', 'Signature — فاخر', 1], ['bespoke', 'Bespoke — فاخر جدًا', 1.35]],
    msg: ['مرحبًا MADE، أرغب في تقدير لمشروعي:', 'نوع المساحة', 'الخدمة', 'المستوى', 'المساحة', 'التقدير المبدئي', 'ريال', 'م²'],
  },
  studio: { eyebrow: 'THE DESIGN VOICE', quote: '«ما يبدو سهلًا في النهاية، صُنع بدقّة في كل خطوة.»', reem: ['م. ريم رسلان', 'المصممة الرئيسية'], nader: ['م. نادر', 'المدير العام'], bio: 'استوديو تصميم داخلي وتنفيذ في الخبر، من بين أعماله منشآت طبية لأحد أكبر مستشفيات المملكة.' },
  blog: { eyebrow: "DESIGNER'S EYE", title: 'قرارات تصميم أذكى', all: 'كل المقالات', toc: 'محتوى المقال', faq: 'أسئلة شائعة', cta: 'جاهز تبدأ مشروعك؟', ctaBody: 'احسب التكلفة المبدئية أو تحدث مع مهندس مختص الآن.', back: '→ المدونة' },
  pj: { eyebrow: 'OUR WORK · أعمالنا', title1: 'مشاريع صُنعت لتبقى.', title2: 'من الفلل إلى المستشفيات.', body: 'تصفّح مشاريع MADE حسب القطاع، أو ادخل إلى المساحة التي تهمّك وشاهد التحوّل قبل وبعد.', tabs: ['المشاريع', 'حسب المساحة', 'قبل وبعد'], filters: ['الكل', 'سكني', 'تجاري وضيافة', 'طبي'], stats: ['مشروع منشور', 'صورة من أعمالنا', 'مشروع منفّذ بصور حقيقية'], hint: 'اضغط على أي مشروع لرؤية كل صوره', from: 'صورة من', projects: 'مشاريع مختلفة', drag: 'صور حقيقية من مواقع MADE. اسحب الخط لترى المساحة قبل وبعد.', open: 'افتح المشروع ←' },
  detail: { back: '→ كل المشاريع', kind: 'النوع', scope: 'نطاق العمل', photos: 'الصور', real: 'من الموقع بعد التنفيذ + تصاميم', render: 'تصاميم ثلاثية الأبعاد', cta: 'أعجبك هذا المشروع؟ نصمّم ونصنع وننفّذ مساحتك بنفس الدقة.', prev: '→ المشروع السابق', next: 'المشروع التالي ←', waMsg: (n: string) => `مرحبًا MADE، شاهدت مشروع «${n}» على موقعكم وأرغب في مشروع مشابه.` },
  footer: { tagline: 'تصميم داخلي · تنفيذ وتشطيب · أثاث مفصّل', studio: 'الاستوديو', follow: 'تابعنا', bottom: 'تصميم داخلي فاخر في الخبر · الدمام · الظهران' },
  meta: { title: 'MADE Design Studio | تصميم داخلي وتشطيب فاخر في الخبر والدمام', description: 'استوديو تصميم داخلي وتنفيذ وتشطيب فاخر وأثاث مفصّل وتسليم مفتاح في الخبر والدمام والظهران — فلل، مكاتب، مطاعم، ومنشآت طبية.' },
};

type Dict = typeof ar;

const en: Dict = {
  nav: { home: 'Home', services: 'Services', projects: 'Projects', journey: 'Process', studio: 'Studio', blog: 'Journal', start: 'Start your project', other: 'عربي' },
  hero: { eyebrow: 'LUXURY INTERIOR DESIGN · CRAFTED & DELIVERED', title1: 'From a line on paper', title2: 'to a space that feels like you.', body: 'A luxury interior design & fit-out studio in the Eastern Province. We design the space, craft its furniture in-house and manage the build until we hand you the keys.', cta1: 'Estimate your project', cta2: 'See our projects', cities: ['Khobar', 'Dhahran', 'Dammam'], badge: 'From drawing to delivery' },
  words: [['01 — DESIGN', 'Thoughtful design'], ['02 — CRAFT', 'Joinery made for the space'], ['03 — EXECUTION', 'Expertly managed fit-out'], ['04 — EXPERIENCE', 'A calm turnkey journey']],
  services: { eyebrow: 'SERVICES', title: 'One team. One vision. One finished space.', body: 'You shouldn’t have to manage five companies to create one beautiful space. We handle every stage — or just the one you need.', items: [['Interior Design', 'Space planning, identity, mood boards and detailed construction drawings.'], ['Fit-Out & Execution', 'Site management, procurement and full engineering supervision.'], ['Custom Furniture & Joinery', 'Kitchens, wardrobes, TV units, doors, wall panels and majlis seating — made to fit.'], ['Turnkey', 'From shell to final styling. You receive a space ready to live in.']], for: 'We design', sectors: ['Villas & homes', 'Luxury apartments', 'Offices', 'Restaurants & cafés', 'Retail & showrooms', 'Healthcare & hospitals'], more: 'Learn more →' },
  fit: { eyebrow: 'MADE TO FIT', t1: 'Not bought for the space.', t2: 'Made for it.', body: 'Luxury isn’t about the most expensive material — it’s the right material used the right way. Every piece moves from design to workshop to installation under our supervision.', steps: ['Empty space', 'Made-to-measure design', 'Workshop', 'Installation', 'Finished space'] },
  projects: { eyebrow: 'THE STORY BEHIND MADE', title: 'Every project has a story.', all: 'All projects', featured: 'FEATURED · HEALTHCARE', executed: 'Built · real photos', view: 'View the full project', photos: 'photos' },
  spaces: { eyebrow: 'BROWSE BY SPACE', title: 'Step into the space you care about', body: 'Majlis, dining, bedrooms, joinery… each space gathers our work from different projects in one place.' },
  ba: { eyebrow: 'BEFORE → AFTER', title: 'Drag… and see the change.', all: 'All before & after', before: 'Before', after: 'After', note: 'Real site photos' },
  wa: { eyebrow: 'IN THEIR WORDS', title1: 'What clients sent us', title2: 'on WhatsApp.', note: 'Real messages from our clients after handover. Names and personal photos are hidden for their privacy.', count: 'client messages', hint: 'Hover to pause · click to enlarge' },
  journey: { eyebrow: 'TURNKEY JOURNEY', title: 'Your project journey', steps: [['Consultation', 'We listen to how you live or work before drawing a line.'], ['Design & materials', 'Drawings, 3D visuals and real material samples.'], ['Build & craft', 'Workshop and site work together under one engineer.'], ['Styling & handover', 'We finish every detail and hand you the keys.']] },
  est: { eyebrow: 'PROJECT ESTIMATE', title1: 'Know your project cost', title2: 'in a minute.', body: 'Choose the space type, service and approximate area — we’ll send an initial estimate and continue on WhatsApp.', note: '* Initial estimate; the final price follows a site visit.', type: 'Space type', service: 'Service', tier: 'Finish level', area: 'Approximate area', result: 'Estimated cost', perM: 'SAR / m²', cta: 'Talk to an engineer', types: [['villa', 'Villa / home', 1], ['apt', 'Apartment', 0.95], ['office', 'Office', 1.05], ['retail', 'Restaurant / retail', 1.15], ['medical', 'Healthcare', 1.3]], services: [['design', 'Interior design only'], ['fitout', 'Fit-out & execution'], ['turnkey', 'Turnkey']], tiers: [['signature', 'Signature', 1], ['bespoke', 'Bespoke', 1.35]], msg: ['Hello MADE, I’d like an estimate for my project:', 'Space type', 'Service', 'Level', 'Area', 'Initial estimate', 'SAR', 'm²'] },
  studio: { eyebrow: 'THE DESIGN VOICE', quote: '“What looks effortless is built through precision.”', reem: ['Eng. Reem Reslan', 'Lead Designer'], nader: ['Eng. Nader', 'General Manager'], bio: 'An interior design and fit-out studio in Khobar whose work includes healthcare facilities for one of the Kingdom’s major hospitals.' },
  blog: { eyebrow: "DESIGNER'S EYE", title: 'Smarter design decisions', all: 'All articles', toc: 'In this article', faq: 'FAQ', cta: 'Ready to start?', ctaBody: 'Get an instant estimate or talk to an engineer now.', back: '← Journal' },
  pj: { eyebrow: 'OUR WORK', title1: 'Projects made to last.', title2: 'From villas to hospitals.', body: 'Browse MADE projects by sector, step into the space you care about, and see the before & after.', tabs: ['Projects', 'By space', 'Before & after'], filters: ['All', 'Residential', 'Commercial', 'Healthcare'], stats: ['projects', 'photos of our work', 'built projects with real photos'], hint: 'Click a project to see all its photos', from: 'photos from', projects: 'projects', drag: 'Real photos from MADE sites. Drag the line to compare.', open: 'Open project →' },
  detail: { back: '← All projects', kind: 'Type', scope: 'Scope', photos: 'Photos', real: 'Site photos after handover + renders', render: '3D renders', cta: 'Like this project? We design, craft and build your space with the same precision.', prev: '← Previous project', next: 'Next project →', waMsg: (n: string) => `Hello MADE, I saw the “${n}” project on your website and would like something similar.` },
  footer: { tagline: 'Interior design · Fit-out · Custom furniture', studio: 'Studio', follow: 'Follow', bottom: 'Luxury interior design in Khobar · Dammam · Dhahran' },
  meta: { title: 'MADE Design Studio | Luxury Interior Design & Fit-Out in Khobar', description: 'Luxury interior design, fit-out, custom furniture and turnkey projects in Khobar, Dammam and Dhahran — villas, offices, restaurants and healthcare.' },
};

export const dict = { ar, en };
export type { Dict };
export const getDict = (l: Locale) => dict[l];
