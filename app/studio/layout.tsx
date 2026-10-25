import type { ReactNode } from 'react';

// Separate root layout so the Studio is not wrapped in the site header/footer.
export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
