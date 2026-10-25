import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="wrap col g20" style={{ padding: '120px 24px', alignItems: 'flex-start' }}>
      <span className="eyebrow">404</span>
      <h1 className="h1" style={{ fontSize: 44 }}>الصفحة غير موجودة · Page not found</h1>
      <div className="row" style={{ gap: 12 }}>
        <Link className="btn btn-dark" href="/ar">الرئيسية</Link>
        <Link className="btn btn-line" href="/en">Home</Link>
      </div>
    </section>
  );
}
