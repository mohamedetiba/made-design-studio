import type { Locale } from './types';

export const locales: Locale[] = ['ar', 'en'];
export const isLocale = (v: string): v is Locale => (locales as string[]).includes(v);
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://made-sa.co').replace(/\/$/, '');

const ar = {
  nav: { home: 'الرئيسية', services: 'الخدمات', projects: 'المشاريع', ba: 'قبل وبعد', reviews: 'آراء العملاء', journey: 'رحلة المشروع', studio: 'من نحن', blog: 'المدونة', start: 'ابدأ مشروعك', other: 'EN' },
  hero: {
    eyebrow: 'LUXURY INTERIOR DESIGN · CRAFTED & DELIVERED',
    title1: 'من خطٍّ على الورق', title2: 'إلى مساحةٍ تُشبهك.',
    body: 'استوديو تصميم داخلي وتنفيذ فاخر في المنطقة الشرقية. نصمّم المساحة، ونصنع أثاثها بأيدينا، وندير تنفيذها حتى نسلّمك المفتاح.',
    cta1: 'اطلب عرض سعر', cta2: 'شاهد مشاريعنا', cities: ['الخُبر', 'الظهران', 'الدمام', 'الأحساء', 'الرياض', 'جدة'], badge: 'من المخطط إلى التنفيذ',
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
  projects: { eyebrow: 'SIGNATURE PROJECTS', title: 'مشاريع مختارة من أعمالنا', all: 'كل المشاريع', featured: 'FEATURED', executed: 'منفّذ · صور حقيقية', view: 'شاهد المشروع كاملًا', photos: 'صورة' },
  spaces: { eyebrow: 'BROWSE BY SPACE', title: 'ادخل إلى المساحة التي تهمّك', body: 'مجالس، سفرة، غرف نوم، أثاث مفصّل… كل مساحة تجمع أعمالنا من مشاريع مختلفة في مكان واحد.' },
  ba: { eyebrow: 'BEFORE → AFTER', title: 'اسحب… وشاهد التحوّل.', all: 'كل مقارنات قبل وبعد', before: 'قبل', after: 'بعد', design: 'التصميم ثلاثي الأبعاد', real: 'بعد التنفيذ', note: 'صور حقيقية من الموقع' },
  wa: { eyebrow: 'IN THEIR WORDS · شو قالوا عنّا', title1: 'كلامهم… كما وصلنا', title2: 'على الواتساب.', note: 'رسائل حقيقية من عملائنا بعد التسليم. أخفينا الأسماء والصور الشخصية احترامًا لخصوصيتهم.', count: 'رسالة من عملائنا', hint: 'مرّر فوق أي رسالة لإيقافها · اضغط لتكبيرها' },
  journey: { eyebrow: 'TURNKEY JOURNEY', title: 'رحلة مشروعك معنا', steps: [['استشارة وفهم الاحتياج', 'نسمع أسلوب حياتك أو طبيعة عملك قبل أي خط.'], ['التصميم واختيار الخامات', 'مخططات، تصوّر ثلاثي الأبعاد، وعينات خامات حقيقية.'], ['التصنيع والتنفيذ', 'الورشة والموقع يعملان معًا بإشراف هندسي واحد.'], ['التنسيق والتسليم', 'نرتّب آخر التفاصيل ونسلّمك المفتاح.']] },
  est: {
    eyebrow: 'PROJECT QUOTE', title1: 'احكِ لنا عن مشروعك', title2: 'ونجهّز لك عرض السعر.', body: 'املأ التفاصيل التالية وسيتواصل معك مهندس مختص على واتساب لدراسة المشروع وتجهيز عرض سعر يناسبه.', note: 'لا نعرض أسعارًا ثابتة؛ كل مشروع يُسعَّر بعد فهم تفاصيله.',
    name: 'الاسم', phone: 'رقم الجوال', city: 'المدينة', type: 'نوع المشروع', service: 'الخدمة المطلوبة', area: 'المساحة التقريبية (م²)', stage: 'حالة الموقع', time: 'موعد البدء المتوقع', notes: 'تفاصيل إضافية', notesPh: 'عدد الغرف، الأسلوب المفضل، أي ملاحظات…', cta: 'تحدث مع مهندس مختص', required: 'يرجى كتابة الاسم ورقم الجوال',
    cities: ['الخبر', 'الظهران', 'الدمام', 'الأحساء', 'الرياض', 'جدة', 'أخرى'],
    types: ['فيلا / منزل', 'شقة', 'مكتب', 'مطعم / كافيه', 'متجر / معرض', 'منشأة طبية'],
    services: ['تصميم داخلي فقط', 'تشطيب وتنفيذ', 'تسليم مفتاح', 'أثاث وخشبيات مفصّلة'],
    stages: ['عظم', 'مشطّب ويحتاج تجديد', 'جاهز للفرش'],
    times: ['فورًا', 'خلال شهر', 'خلال ٣ أشهر', 'لم أحدد بعد'],
    msg: 'مرحبًا MADE، أرغب في عرض سعر لمشروعي:',
  },
  studio: { eyebrow: 'THE DESIGN VOICE', quote: '«ما يبدو سهلًا في النهاية، صُنع بدقّة في كل خطوة.»', reem: ['م. ريم رسلان', 'المصممة الرئيسية'], nader: ['م. نادر', 'المدير العام'], bio: 'استوديو تصميم داخلي وتنفيذ في الخبر، من بين أعماله منشآت طبية لأحد أكبر مستشفيات المملكة.' },
  blog: { eyebrow: "DESIGNER'S EYE", title: 'قرارات تصميم أذكى', all: 'كل المقالات', toc: 'محتوى المقال', faq: 'أسئلة شائعة', cta: 'جاهز تبدأ مشروعك؟', ctaBody: 'أرسل تفاصيل مشروعك لنجهّز لك عرض سعر، أو تحدث مع مهندس مختص الآن.', back: '→ المدونة' },
  pj: { eyebrow: 'OUR WORK · أعمالنا', title1: 'مشاريع صُنعت لتبقى.', title2: 'من الفلل إلى المستشفيات.', body: 'تصفّح مشاريع MADE حسب القطاع، أو ادخل إلى المساحة التي تهمّك وشاهد التحوّل قبل وبعد.', tabs: ['المشاريع', 'حسب المساحة', 'قبل وبعد', 'فيديوهات'], filters: ['الكل', 'سكني', 'تجاري وضيافة', 'طبي'], stats: ['مشروع منشور', 'صورة من أعمالنا', 'مشروع منفّذ بصور حقيقية'], hint: 'اضغط على أي مشروع لرؤية كل صوره', from: 'صورة من', projects: 'مشاريع مختلفة', drag: 'اسحب الخط لترى المساحة قبل وبعد التنفيذ، أو التصميم ثلاثي الأبعاد مقابل الواقع.', videos: 'جولات مصوّرة في مشاريعنا من حسابنا على إنستجرام.', open: 'افتح المشروع ←' },
  detail: { back: '→ كل المشاريع', kind: 'النوع', scope: 'نطاق العمل', photos: 'الصور', real: 'صور من الواقع', render: 'تصاميم ثلاثية الأبعاد', video: 'فيديو المشروع', cta: 'أعجبك هذا المشروع؟ نصمّم ونصنع وننفّذ مساحتك بنفس الدقة.', prev: '→ المشروع السابق', next: 'المشروع التالي ←', waMsg: (n: string) => `مرحبًا MADE، شاهدت مشروع «${n}» على موقعكم وأرغب في مشروع مشابه.` },
  reviews: { title: 'آراء عملائنا', body: 'رسائل وصلتنا من عملائنا بعد استلام مشاريعهم.' },
  about: { eyebrow: 'ABOUT MADE', title: 'من نحن', body: 'استوديو تصميم داخلي وتنفيذ وأثاث مفصّل في الخبر، نعمل في الخبر والظهران والدمام والأحساء والرياض وجدة.' },
  footer: { tagline: 'تصميم داخلي · تنفيذ وتشطيب · أثاث مفصّل', studio: 'الاستوديو', follow: 'تابعنا', bottom: 'الخبر · الظهران · الدمام · الأحساء · الرياض · جدة' },
  meta: { title: 'MADE Design Studio | تصميم داخلي وتشطيب فاخر في الخبر والدمام', description: 'استوديو تصميم داخلي وتنفيذ وتشطيب فاخر وأثاث مفصّل وتسليم مفتاح في الخبر والظهران والدمام والأحساء والرياض وجدة — فلل، مكاتب، مطاعم، ومنشآت طبية.' },
};

type Dict = typeof ar;

const en: Dict = {
  nav: { home: 'Home', services: 'Services', projects: 'Projects', ba: 'Before & after', reviews: 'Testimonials', journey: 'Process', studio: 'About', blog: 'Journal', start: 'Start your project', other: 'عربي' },
  hero: { eyebrow: 'LUXURY INTERIOR DESIGN · CRAFTED & DELIVERED', title1: 'From a line on paper', title2: 'to a space that feels like you.', body: 'A luxury interior design & fit-out studio in the Eastern Province. We design the space, craft its furniture in-house and manage the build until we hand you the keys.', cta1: 'Request a quote', cta2: 'See our projects', cities: ['Khobar', 'Dhahran', 'Dammam', 'Al-Ahsa', 'Riyadh', 'Jeddah'], badge: 'From drawing to delivery' },
  words: [['01 — DESIGN', 'Thoughtful design'], ['02 — CRAFT', 'Joinery made for the space'], ['03 — EXECUTION', 'Expertly managed fit-out'], ['04 — EXPERIENCE', 'A calm turnkey journey']],
  services: { eyebrow: 'SERVICES', title: 'One team. One vision. One finished space.', body: 'You shouldn’t have to manage five companies to create one beautiful space. We handle every stage — or just the one you need.', items: [['Interior Design', 'Space planning, identity, mood boards and detailed construction drawings.'], ['Fit-Out & Execution', 'Site management, procurement and full engineering supervision.'], ['Custom Furniture & Joinery', 'Kitchens, wardrobes, TV units, doors, wall panels and majlis seating — made to fit.'], ['Turnkey', 'From shell to final styling. You receive a space ready to live in.']], for: 'We design', sectors: ['Villas & homes', 'Luxury apartments', 'Offices', 'Restaurants & cafés', 'Retail & showrooms', 'Healthcare & hospitals'], more: 'Learn more →' },
  fit: { eyebrow: 'MADE TO FIT', t1: 'Not bought for the space.', t2: 'Made for it.', body: 'Luxury isn’t about the most expensive material — it’s the right material used the right way. Every piece moves from design to workshop to installation under our supervision.', steps: ['Empty space', 'Made-to-measure design', 'Workshop', 'Installation', 'Finished space'] },
  projects: { eyebrow: 'SIGNATURE PROJECTS', title: 'Selected work', all: 'All projects', featured: 'FEATURED', executed: 'Built · real photos', view: 'View the full project', photos: 'photos' },
  spaces: { eyebrow: 'BROWSE BY SPACE', title: 'Step into the space you care about', body: 'Majlis, dining, bedrooms, joinery… each space gathers our work from different projects in one place.' },
  ba: { eyebrow: 'BEFORE → AFTER', title: 'Drag… and see the change.', all: 'All before & after', before: 'Before', after: 'After', design: '3D design', real: 'Reality', note: 'Real site photos' },
  wa: { eyebrow: 'IN THEIR WORDS', title1: 'What clients sent us', title2: 'on WhatsApp.', note: 'Real messages from our clients after handover. Names and personal photos are hidden for their privacy.', count: 'client messages', hint: 'Hover to pause · click to enlarge' },
  journey: { eyebrow: 'TURNKEY JOURNEY', title: 'Your project journey', steps: [['Consultation', 'We listen to how you live or work before drawing a line.'], ['Design & materials', 'Drawings, 3D visuals and real material samples.'], ['Build & craft', 'Workshop and site work together under one engineer.'], ['Styling & handover', 'We finish every detail and hand you the keys.']] },
  est: {
    eyebrow: 'PROJECT QUOTE', title1: 'Tell us about your project', title2: 'and we’ll prepare your quote.', body: 'Fill in the details below and a specialist engineer will reach you on WhatsApp to study the project and prepare a tailored quote.', note: 'We don’t publish fixed prices — every project is quoted once we understand it.',
    name: 'Name', phone: 'Mobile number', city: 'City', type: 'Project type', service: 'Service', area: 'Approximate area (m²)', stage: 'Site condition', time: 'Expected start', notes: 'More details', notesPh: 'Number of rooms, preferred style, any notes…', cta: 'Talk to an engineer', required: 'Please enter your name and mobile number',
    cities: ['Khobar', 'Dhahran', 'Dammam', 'Al-Ahsa', 'Riyadh', 'Jeddah', 'Other'],
    types: ['Villa / home', 'Apartment', 'Office', 'Restaurant / café', 'Retail / showroom', 'Healthcare'],
    services: ['Interior design only', 'Fit-out & execution', 'Turnkey', 'Custom furniture & joinery'],
    stages: ['Shell', 'Finished, needs renovation', 'Ready to furnish'],
    times: ['Immediately', 'Within a month', 'Within 3 months', 'Not decided yet'],
    msg: 'Hello MADE, I’d like a quote for my project:',
  },
  studio: { eyebrow: 'THE DESIGN VOICE', quote: '“What looks effortless is built through precision.”', reem: ['Eng. Reem Reslan', 'Lead Designer'], nader: ['Eng. Nader', 'General Manager'], bio: 'An interior design and fit-out studio in Khobar whose work includes healthcare facilities for one of the Kingdom’s major hospitals.' },
  blog: { eyebrow: "DESIGNER'S EYE", title: 'Smarter design decisions', all: 'All articles', toc: 'In this article', faq: 'FAQ', cta: 'Ready to start?', ctaBody: 'Send your project details for a quote, or talk to an engineer now.', back: '← Journal' },
  pj: { eyebrow: 'OUR WORK', title1: 'Projects made to last.', title2: 'From villas to hospitals.', body: 'Browse MADE projects by sector, step into the space you care about, and see the before & after.', tabs: ['Projects', 'By space', 'Before & after', 'Videos'], filters: ['All', 'Residential', 'Commercial', 'Healthcare'], stats: ['projects', 'photos of our work', 'built projects with real photos'], hint: 'Click a project to see all its photos', from: 'photos from', projects: 'projects', drag: 'Drag the line to compare before and after — or the 3D design against the finished space.', videos: 'Walkthroughs of our projects from our Instagram.', open: 'Open project →' },
  detail: { back: '← All projects', kind: 'Type', scope: 'Scope', photos: 'Photos', real: 'Reality photos', render: '3D designs', video: 'Project video', cta: 'Like this project? We design, craft and build your space with the same precision.', prev: '← Previous project', next: 'Next project →', waMsg: (n: string) => `Hello MADE, I saw the “${n}” project on your website and would like something similar.` },
  reviews: { title: 'Client testimonials', body: 'Messages our clients sent us after handover.' },
  about: { eyebrow: 'ABOUT MADE', title: 'About us', body: 'An interior design, fit-out and custom furniture studio based in Khobar, working across Khobar, Dhahran, Dammam, Al-Ahsa, Riyadh and Jeddah.' },
  footer: { tagline: 'Interior design · Fit-out · Custom furniture', studio: 'Studio', follow: 'Follow', bottom: 'Khobar · Dhahran · Dammam · Al-Ahsa · Riyadh · Jeddah' },
  meta: { title: 'MADE Design Studio | Luxury Interior Design & Fit-Out in Khobar', description: 'Luxury interior design, fit-out, custom furniture and turnkey projects in Khobar, Dhahran, Dammam, Al-Ahsa, Riyadh and Jeddah — villas, offices, restaurants and healthcare.' },
};

export const dict = { ar, en };
export type { Dict };
export const getDict = (l: Locale) => dict[l];
