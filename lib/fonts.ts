/**
 * Self-hosted fonts (via @fontsource) — no request to Google at build or run time,
 * which keeps builds reliable and is better for privacy and Core Web Vitals.
 */
// Arabic: Almarai stands in for the brand's GE SS until licensed web files arrive.
// Latin: ITC Avant Garde Gothic → TeX Gyre Adventor (public/fonts, declared in globals.css).
import '@fontsource/almarai/300.css';
import '@fontsource/almarai/400.css';
import '@fontsource/almarai/700.css';
import '@fontsource/almarai/800.css';

export const fontVars = '';
