/**
 * Built-in content. The site renders this until a Sanity project is connected
 * (NEXT_PUBLIC_SANITY_PROJECT_ID). `npm run seed` imports the same content into Sanity.
 * Image numbers refer to files in /public/images.
 */
import type { BeforeAfter, Img, Post, Project, Settings, Space, Testimonial, L } from './types';

const img = (n: number | string) => `/images/${typeof n === 'number' ? String(n).padStart(4, '0') : n}.jpg`;

type RawProject = Omit<Project, 'cover' | 'gallery'> & { cover: number; imgs: number[] };

export const RAW_PROJECTS: RawProject[] = [
  { slug: 'almoosa-north-tower', name: { ar: 'مستشفى الموسى التخصصي — البرج الشمالي', en: 'Al Moosa Specialist Hospital — North Tower' }, sector: 'medical', kind: { ar: 'منشأة طبية', en: 'Healthcare' }, scope: { ar: 'تصميم وتنفيذ — مكاتب إدارية، نادي رياضي، كافيه، غرف مرضى', en: 'Design & fit-out — admin offices, staff gym, café and patient rooms' }, executed: true, featured: true, cover: 254, imgs: [254,266,256,257,277,262,263,271,272,261,250,264,282,286,310,307,283,288,317,320] },
  { slug: 'rehab-hospital', name: { ar: 'مستشفى التأهيل — Rehab', en: 'Rehab Hospital' }, sector: 'medical', kind: { ar: 'منشأة طبية', en: 'Healthcare' }, scope: { ar: 'الجناح الملكي، مصلى، صالة أطفال، علاج طبيعي، صيدلية، مكاتب', en: 'Royal suite, prayer zone, pediatric gym, physiotherapy, pharmacy and offices' }, executed: true, featured: true, cover: 64, imgs: [64,58,52,54,61,69,72,91,96,106,107,102,118,87,73,113,99,119] },
  { slug: 'phc-nakheel', name: { ar: 'مركز الرعاية الصحية الأولية — النخيل', en: 'Primary Health Care — Nakheel' }, sector: 'medical', kind: { ar: 'منشأة طبية', en: 'Healthcare' }, scope: { ar: 'استقبال، عيادات، أشعة، أطفال، طوارئ، واجهات', en: 'Reception, clinics, radiology, pediatrics, urgent care and façades' }, executed: false, featured: true, cover: 139, imgs: [139,144,148,149,156,164,169,170,163,145,154,178,133,134,137,140] },
  { slug: 'quiet-guest-villa', name: { ar: 'فيلا الضيافة الهادئة', en: 'The Quiet Guest Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'مجالس الضيوف، المعيشة، الماستر، غرف الأبناء', en: 'Guest majlis, family living, master suite and children’s rooms' }, executed: false, featured: true, cover: 370, imgs: [370,361,362,365,366,373,376,378,354,353,355,380,384,392,391,398,371,372] },
  { slug: 'misk-villa', name: { ar: 'فيلا مسك', en: 'Misk Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'تشطيب وتأثيث تسليم مفتاح', en: 'Turnkey finishing and furnishing' }, executed: true, featured: true, cover: 190, imgs: [190,192,194,197,198,199,200,201,188,189] },
  { slug: 'warm-rattan-home', name: { ar: 'شقة الراتان الدافئة', en: 'The Warm Rattan Home' }, sector: 'residential', kind: { ar: 'شقة سكنية', en: 'Apartment' }, scope: { ar: 'تصميم وتنفيذ وأثاث مفصّل وإضاءة', en: 'Design, fit-out, custom furniture and lighting' }, executed: true, featured: true, cover: 334, imgs: [334,340,331,332,339,344,329,338,327,326,325,343,345,346] },
  { slug: 'barista-store', name: { ar: 'متجر باريستا', en: 'Barista Store' }, sector: 'commercial', kind: { ar: 'تجزئة ومقاهي', en: 'Retail & café' }, scope: { ar: 'تصميم وتنفيذ متجر قهوة', en: 'Design and fit-out of a coffee store' }, executed: true, featured: true, cover: 246, imgs: [246,243,244,242,248,249,245,247,240] },
  { slug: 'serene-blue-villa', name: { ar: 'فيلا الأزرق الهادئ', en: 'The Serene Blue Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'المجلس والمدخل والسفرة', en: 'Majlis, entrance and dining' }, executed: false, cover: 228, imgs: [228,230,232,234,237,238,239,229] },
  { slug: 'almoosa-college', name: { ar: 'كلية الموسى', en: 'Al Moosa College' }, sector: 'commercial', kind: { ar: 'تعليمي', en: 'Education' }, scope: { ar: 'مساحات طلابية ومكتبة', en: 'Student lounges and library' }, executed: true, cover: 348, imgs: [348,347,350,351,352,349] },
  { slug: 'classic-view-villa', name: { ar: 'فيلا الإطلالة الكلاسيكية', en: 'The Classic View Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'تجديد كامل: قبل / أثناء / بعد', en: 'Full renovation: before, progress, after' }, executed: true, cover: 28, imgs: [28,30,26,25,19,21,18,20,22] },
  { slug: 'stone-wood-villa', name: { ar: 'فيلا الحجر والخشب', en: 'Stone & Wood Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'الدور الأرضي والأول بالكامل', en: 'Complete ground and first floors' }, executed: false, cover: 207, imgs: [207,208,213,212,214,216,217,205,209,211] },
  { slug: 'love-and-more-dewaniya', name: { ar: 'ديوانية Love & More', en: 'Love & More Dewaniya' }, sector: 'commercial', kind: { ar: 'ضيافة', en: 'Hospitality' }, scope: { ar: 'تجديد ديوانية: قبل / بعد', en: 'Dewaniya renovation: before and after' }, executed: true, cover: 222, imgs: [222,221,223,220,225,226,227,218,219] },
  { slug: 'chandelier-villa', name: { ar: 'فيلا الثريا', en: 'The Chandelier Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'تصميم وتنفيذ', en: 'Design and fit-out' }, executed: true, cover: 38, imgs: [38,39,40,45,46,42,43] },
  { slug: 'youthful-workspace', name: { ar: 'مكتب الطاقة الشبابية', en: 'Youthful Workspace' }, sector: 'commercial', kind: { ar: 'مكاتب', en: 'Office' }, scope: { ar: 'تجديد مكتب مع غرف راحة', en: 'Office renovation with rest pods' }, executed: true, cover: 33, imgs: [33,34,32,37,35,36,29] },
  { slug: 'warm-wood-villa', name: { ar: 'فيلا الخشب الهادئ', en: 'The Warm Wood Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'من العظم إلى التصميم النهائي', en: 'From shell to final design' }, executed: false, cover: 11, imgs: [11,12,13,16,27,15,9] },
  { slug: 'sada-project', name: { ar: 'مشروع سدى', en: 'Sada Project' }, sector: 'residential', kind: { ar: 'سكني', en: 'Residential' }, scope: { ar: 'تأثيث وتنسيق', en: 'Furnishing and styling' }, executed: true, cover: 5, imgs: [5,8,24,56] },
  { slug: 'riyadh-villa', name: { ar: 'فيلا الرياض', en: 'Riyadh Villa' }, sector: 'residential', kind: { ar: 'فيلا سكنية', en: 'Private villa' }, scope: { ar: 'تشطيب وتأثيث', en: 'Finishing and furnishing' }, executed: true, cover: 47, imgs: [47,49,48] },
  { slug: 'nlc-hall', name: { ar: 'قاعة NLC', en: 'NLC Hall' }, sector: 'commercial', kind: { ar: 'ضيافة', en: 'Hospitality' }, scope: { ar: 'تصميم قاعة مطعم وفعاليات', en: 'Restaurant and events hall design' }, executed: false, cover: 206, imgs: [206,204] },
];

export const RAW_SPACES: { slug: string; name: L; intro: L; imgs: number[] }[] = [
  { slug: 'majlis', name: { ar: 'المجالس وصالات الاستقبال', en: 'Majlis & Living' }, intro: { ar: 'مجالس عصرية تجمع الأصالة مع الفخامة الهادئة.', en: 'Contemporary majlis rooms that pair heritage with quiet luxury.' }, imgs: [228,230,370,361,365,376,207,190,26,28,39,225,5,11,47,214,222] },
  { slug: 'dining', name: { ar: 'السفرة', en: 'Dining' }, intro: { ar: 'غرف طعام مصمّمة للعائلة والضيوف.', en: 'Dining rooms designed for family and guests.' }, imgs: [232,237,366,373,378,49,25,45,227,234] },
  { slug: 'bedrooms', name: { ar: 'غرف النوم', en: 'Bedrooms' }, intro: { ar: 'أجنحة ماستر وغرف أبناء بتفاصيل مفصّلة.', en: 'Master suites and children’s rooms with bespoke details.' }, imgs: [354,380,384,213,198,199,27,392,398,200] },
  { slug: 'custom-joinery', name: { ar: 'الأثاث المفصّل والخشبيات', en: 'Custom Joinery' }, intro: { ar: 'خزائن ووحدات وأثاث يُصنع للمساحة بدقة.', en: 'Wardrobes, units and furniture made to fit.' }, imgs: [355,327,326,329,12,15,16,391,353,331] },
  { slug: 'bathrooms', name: { ar: 'الحمامات', en: 'Bathrooms' }, intro: { ar: 'حمامات بخامات فاخرة وإضاءة مدروسة.', en: 'Bathrooms with premium materials and considered lighting.' }, imgs: [212,46,338,220,128] },
  { slug: 'offices', name: { ar: 'المكاتب والشركات', en: 'Offices' }, intro: { ar: 'بيئات عمل مصمّمة حول طبيعة كل شركة.', en: 'Workspaces designed around each business.' }, imgs: [262,263,310,307,102,113,283,288,350,33,317] },
  { slug: 'healthcare', name: { ar: 'المنشآت الطبية', en: 'Healthcare' }, intro: { ar: 'مستشفيات ومراكز صحية تُشعر المريض بالطمأنينة.', en: 'Hospitals and clinics that put patients at ease.' }, imgs: [139,148,149,169,271,58,72,91,164,156,170] },
  { slug: 'hospitality', name: { ar: 'الكافيهات والتجزئة والضيافة', en: 'Cafés, Retail & Hospitality' }, intro: { ar: 'مساحات تجارية تحوّل البراند إلى تجربة.', en: 'Commercial spaces that turn a brand into an experience.' }, imgs: [254,266,261,246,243,206,256,277,107,145] },
];

const spaceOf: Record<number, string> = {};
RAW_SPACES.forEach((s) => s.imgs.forEach((n) => { if (!spaceOf[n]) spaceOf[n] = s.slug; }));
const BEFORE = new Set([188, 189, 19, 21, 218, 219, 240, 35, 36, 43, 9]);
const PROGRESS = new Set([18, 20, 29, 42]);

const mkImg = (p: RawProject, n: number): Img => {
  const sp = RAW_SPACES.find((s) => s.slug === spaceOf[n]);
  return {
    src: img(n),
    alt: { ar: `${p.name.ar}${sp ? ' — ' + sp.name.ar : ''}`, en: `${p.name.en}${sp ? ' — ' + sp.name.en : ''}` },
    space: spaceOf[n],
    stage: BEFORE.has(n) ? 'before' : PROGRESS.has(n) ? 'progress' : p.executed ? 'after' : 'render',
  };
};

export const PROJECTS: Project[] = RAW_PROJECTS.map((p) => ({
  ...p,
  cover: mkImg(p, p.cover),
  gallery: p.imgs.map((n) => mkImg(p, n)),
}));

export const SPACES: Space[] = RAW_SPACES.map((s) => ({
  slug: s.slug,
  name: s.name,
  intro: s.intro,
  cover: img(s.imgs[0]),
  images: s.imgs.flatMap((n) => {
    const p = RAW_PROJECTS.find((x) => x.imgs.includes(n) || x.cover === n);
    return p ? [{ ...mkImg(p, n), project: p.slug, projectName: p.name }] : [];
  }),
}));

export const BEFORE_AFTER: BeforeAfter[] = [
  { project: 'classic-view-villa', label: { ar: 'صالة المعيشة', en: 'Living room' }, before: img(21), after: img(30) },
  { project: 'classic-view-villa', label: { ar: 'السفرة', en: 'Dining' }, before: img(19), after: img(25) },
  { project: 'misk-villa', label: { ar: 'صالة المعيشة', en: 'Living room' }, before: img(188), after: img(190) },
  { project: 'love-and-more-dewaniya', label: { ar: 'الديوانية', en: 'Dewaniya' }, before: img(218), after: img(222) },
  { project: 'barista-store', label: { ar: 'واجهة المتجر', en: 'Storefront' }, before: img(240), after: img(246) },
  { project: 'youthful-workspace', label: { ar: 'المكتب', en: 'Office' }, before: img(35), after: img(33) },
].map((b) => ({ ...b, projectName: RAW_PROJECTS.find((p) => p.slug === b.project)!.name }));

export const TESTIMONIALS: Testimonial[] = [
  { screenshot: img('wa-1'), featured: true, who: { ar: 'عميلة · فيلا سكنية', en: 'Client · private villa' }, quote: { ar: 'انتي الوحيدة اللي حسّيت إنها خُلقت لحتى تمسك هالشغلات… فنانة جدًا. شفت كتير عم يعملوا بيوتن، بس ما شفت متلك.', en: '“You’re the only one who felt born to do this… truly an artist. I’ve seen many people do homes, but never like you.”' } },
  { screenshot: img('wa-2'), featured: true, who: { ar: 'عميل · مساحة عائلية', en: 'Client · family space' }, quote: { ar: 'والله يا ريم لو تعرفين كمية العزايم اللي سويناها في المكان الجديد راح تضحكين.. ما بقى زملاء عمل، أصحاب، أقارب، شركاء عمل…', en: '“Reem, if you knew how many gatherings we’ve hosted in the new place, you’d laugh — colleagues, friends, family, partners…”' } },
  { screenshot: img('wa-3'), featured: true, who: { ar: 'عميلة · ركن القهوة', en: 'Client · coffee corner' }, quote: { ar: 'كل يوم كنت أروح قهوة عشان أقرأ وأتقهوى… الحين القهوة صارت عندي. الحمدلله.', en: '“I used to go to a café every day to read… now the café is at home.”' } },
  { screenshot: img('wa-07'), featured: true, who: { ar: 'عميلة · تصميم وتنفيذ', en: 'Client · design & build' }, quote: { ar: 'أنا كلّمت مهندسين كتير… والله زي تعاملك وإخلاصك وحبّك لشغلك نفسها ما شفت.', en: '“I’ve spoken to many engineers… I’ve never seen dedication and love for the work like yours.”' } },
  { screenshot: img('wa-01'), featured: true, who: { ar: 'عميلة · مشروع سكني', en: 'Client · residential' }, quote: { ar: 'حُسن تعاملك ينافس جمال عملك… إنتي رائعة يا ريم، ما شاء الله ربي يحرسك.', en: '“The way you work is as beautiful as the work itself.”' } },
  { screenshot: img('wa-4'), featured: true, who: { ar: 'عميلة · غرفة السفرة', en: 'Client · dining room' }, quote: { ar: 'روعة… خيال… جمال… أناقة. بساطة.', en: '“Stunning… imaginative… elegant. Simple.”' } },
  ...['wa-02', 'wa-03', 'wa-04', 'wa-06', 'wa-08', 'wa-17', 'wa-19', 'wa-20', 'wa-23', 'wa-24'].map((f) => ({ screenshot: img(f), featured: false, who: { ar: 'عميل MADE', en: 'MADE client' } })),
];

export const POSTS: Post[] = [
  {
    slug: 'villa-fit-out-cost-khobar',
    title: { ar: 'كم تكلفة تصميم وتشطيب فيلا في الخبر للمتر المربع؟', en: 'How much does villa design & fit-out cost per m² in Khobar?' },
    category: { ar: 'التكاليف', en: 'Costs' },
    excerpt: { ar: 'العوامل التي تحدد تكلفة المتر في مشاريع التصميم والتشطيب وتسليم المفتاح بالمنطقة الشرقية، وكيف تحصل على تقدير دقيق.', en: 'What drives the per-m² cost of design, fit-out and turnkey projects in the Eastern Province.' },
    image: { src: img('blog-3'), alt: { ar: 'من الاسكتش إلى الفيلا المنفذة مع عينات الخامات', en: 'From sketch to finished villa with material samples' } },
    publishedAt: '2026-10-20',
    author: 'MADE Design Studio',
    body: { ar: [
      { _type: 'block', style: 'normal', text: 'السؤال الأول الذي يصلنا من ملاك الفلل في الخبر والدمام والظهران هو: كم سيكلفني المتر؟ الإجابة الدقيقة تعتمد على ثلاثة قرارات أساسية تتخذها قبل البدء.' },
      { _type: 'block', style: 'h2', text: '1. نوع الخدمة التي تحتاجها' },
      { _type: 'block', style: 'normal', text: 'التصميم الداخلي فقط يختلف تمامًا عن التشطيب والتنفيذ، ويختلف الاثنان عن نظام تسليم المفتاح الذي يشمل التصميم والتنفيذ والأثاث المفصّل والتنسيق النهائي.' },
      { _type: 'block', style: 'h2', text: '2. مستوى التشطيب والخامات' },
      { _type: 'block', style: 'normal', text: 'الرخام الطبيعي، الخشب الطبيعي، الإضاءة المخفية، والأثاث المفصّل ترفع التكلفة لكنها تصنع الفرق الحقيقي في الإحساس بالمساحة. الفخامة لا تعني الخامة الأغلى، بل الخامة الصحيحة في المكان الصحيح.' },
      { _type: 'block', style: 'h2', text: '3. حالة الموقع والمساحة' },
      { _type: 'block', style: 'normal', text: 'استلام الفيلا على العظم يختلف عن تجديد فيلا قائمة. كلما كانت المساحة أكبر، توزعت تكاليف الإدارة والتصميم على عدد أمتار أكبر.' },
      { _type: 'block', style: 'h3', text: 'احصل على تقدير مبدئي في دقيقة' },
      { _type: 'block', style: 'normal', text: 'استخدم حاسبة التكلفة في الصفحة الرئيسية لاختيار نوع المساحة والخدمة والمستوى، ثم تحدث مع مهندس مختص على واتساب لتحديد التكلفة الدقيقة بعد زيارة الموقع.' },
    ] },
    faq: [
      { q: { ar: 'هل التقدير في الحاسبة نهائي؟', en: 'Is the estimator price final?' }, a: { ar: 'لا، هو تقدير مبدئي. التكلفة النهائية تُحدد بعد زيارة الموقع واعتماد التصميم والخامات.', en: 'No — it is an initial range. The final price is set after a site visit and design approval.' } },
      { q: { ar: 'هل تعملون خارج الخبر؟', en: 'Do you work outside Khobar?' }, a: { ar: 'نعم، نعمل في الخبر والدمام والظهران وكامل المنطقة الشرقية.', en: 'Yes — Khobar, Dammam, Dhahran and across the Eastern Province.' } },
    ],
    seo: { focusKeyword: 'تكلفة تشطيب فيلا الخبر', metaTitle: { ar: 'تكلفة تصميم وتشطيب فيلا في الخبر للمتر | MADE', en: 'Villa fit-out cost per m² in Khobar | MADE' }, metaDescription: { ar: 'تعرّف على العوامل التي تحدد تكلفة المتر في تصميم وتشطيب الفلل بالخبر والدمام، واحصل على تقدير مبدئي فوري من MADE Design Studio.', en: 'What determines villa design and fit-out cost per m² in Khobar and Dammam — get an instant estimate from MADE Design Studio.' } },
  },
  {
    slug: 'modern-majlis-design',
    title: { ar: 'المجلس العصري: كيف تجمع الأصالة مع الفخامة الحديثة؟', en: 'The modern majlis: blending heritage with contemporary luxury' },
    category: { ar: 'تصميم المجالس', en: 'Majlis design' },
    excerpt: { ar: 'مبادئ تصميم المجلس العصري في الفلل السعودية: التوزيع، الخامات، الإضاءة، والقطع المفصّلة.', en: 'Principles of the modern Saudi majlis: layout, materials, lighting and bespoke pieces.' },
    image: { src: img('blog-2'), alt: { ar: 'مجلس غائر بإطلالة وقت الغروب', en: 'Sunken majlis at sunset' } },
    publishedAt: '2026-10-18',
    author: 'MADE Design Studio',
    body: { ar: [
      { _type: 'block', style: 'normal', text: 'المجلس هو أول ما يراه الضيف، وهو المساحة التي تعبّر عن كرم البيت وذوق أهله. المجلس العصري لا يتخلى عن روح المجلس التقليدي، بل يعيد تقديمها بلغة أهدأ.' },
      { _type: 'block', style: 'h2', text: 'التوزيع أولًا' },
      { _type: 'block', style: 'normal', text: 'جلسات متصلة على شكل حرف U أو L تحافظ على التواصل بين الجالسين، مع مسافة مريحة للحركة وطاولات قريبة من كل مقعد.' },
      { _type: 'block', style: 'h2', text: 'خامات دافئة وإضاءة متدرجة' },
      { _type: 'block', style: 'normal', text: 'تجاليد الخشب، الأقمشة الطبيعية، والرخام بدرجات هادئة، مع إضاءة مخفية في الأسقف والجدران تمنح المجلس دفئًا في المساء.' },
      { _type: 'block', style: 'h2', text: 'قطع تُصنع للمساحة' },
      { _type: 'block', style: 'normal', text: 'الجلسات المفصّلة على مقاس الجدار، ووحدات الضيافة المدمجة، تجعل المجلس يبدو كأنه وُلد مع المكان. شاهد مجالس من أعمالنا في صفحة المساحات.' },
    ] },
    seo: { focusKeyword: 'تصميم مجالس مودرن', metaTitle: { ar: 'تصميم المجلس العصري في الفلل | MADE Design Studio', en: 'Modern majlis interior design | MADE Design Studio' }, metaDescription: { ar: 'أفكار ومبادئ تصميم المجالس المودرن في الفلل السعودية بالخبر والدمام: التوزيع والخامات والإضاءة والأثاث المفصّل.', en: 'Modern majlis design ideas for Saudi villas: layout, materials, lighting and custom seating.' } },
  },
  {
    slug: 'office-design-trends-dammam-khobar',
    title: { ar: 'اتجاهات تصميم المكاتب في الدمام والخبر لعام 2026', en: 'Office design trends in Dammam & Khobar for 2026' },
    category: { ar: 'المساحات التجارية', en: 'Commercial spaces' },
    excerpt: { ar: 'كيف تصمم مكتبًا يجذب الكفاءات ويعبّر عن هوية شركتك في المنطقة الشرقية.', en: 'Designing offices that attract talent and express your brand in the Eastern Province.' },
    image: { src: img('blog-1'), alt: { ar: 'استقبال نادي رياضي بتصميم خشبي وذهبي', en: 'Gym reception in wood and gold' } },
    publishedAt: '2026-10-15',
    author: 'MADE Design Studio',
    body: { ar: [
      { _type: 'block', style: 'normal', text: 'المكتب لم يعد مكانًا للعمل فقط؛ أصبح أداة لجذب الكفاءات وبناء ثقافة الشركة. هذه أبرز الاتجاهات التي نطبقها في مشاريعنا التجارية.' },
      { _type: 'block', style: 'h2', text: 'مساحات متعددة الاستخدام' },
      { _type: 'block', style: 'normal', text: 'غرف اجتماعات مرنة، مناطق تركيز هادئة، وصالات استراحة ومقاهٍ داخلية للموظفين — كما في مشروع مستشفى الموسى التخصصي.' },
      { _type: 'block', style: 'h2', text: 'الهوية في كل تفصيلة' },
      { _type: 'block', style: 'normal', text: 'ألوان البراند والخامات والجداريات تحوّل المكتب إلى تجربة يعيشها العميل والموظف معًا.' },
      { _type: 'block', style: 'h2', text: 'الراحة والصحة' },
      { _type: 'block', style: 'normal', text: 'إضاءة طبيعية، نباتات، مقاعد مريحة، وأندية رياضية للموظفين أصبحت جزءًا أساسيًا من بيئة العمل الحديثة.' },
    ] },
    seo: { focusKeyword: 'تصميم مكاتب الدمام', metaTitle: { ar: 'اتجاهات تصميم المكاتب في الدمام والخبر 2026 | MADE', en: 'Office design trends Dammam & Khobar 2026 | MADE' }, metaDescription: { ar: 'أبرز اتجاهات تصميم وتشطيب المكاتب والشركات في الدمام والخبر: مساحات مرنة، هوية البراند، وراحة الموظفين.', en: 'Top office design and fit-out trends in Dammam and Khobar: flexible spaces, brand identity and wellbeing.' } },
  },
];

export const SETTINGS: Settings = {
  phone: '+966 56 843 4230',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '966568434230',
  address: { ar: 'الخُبر — حي الراكة الجنوبية، المنطقة الشرقية', en: 'Al Rakah Al Janubiyah, Khobar, Eastern Province' },
  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/made.design.co/' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@made.design.co' },
    { label: 'YouTube', url: 'https://www.youtube.com/@MadeDesignStudio' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/made-design-studio-interior-design-fit-out' },
    { label: 'Pinterest', url: 'https://www.pinterest.com/Madedesignsa' },
  ],
  rates: { design: 250, fitout: 1800, turnkey: 3200 },
};
