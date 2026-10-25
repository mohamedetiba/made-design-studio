import { PortableText, type PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/sanity/client';
import type { Block } from '@/lib/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

/** Seed blocks use `{text}`; Sanity blocks use `children[]`. Normalise to Portable Text. */
export function normalize(blocks: Block[] = []): Any[] {
  return blocks.map((b: Any, i) =>
    b._type === 'block' && typeof b.text === 'string'
      ? { _type: 'block', _key: `b${i}`, style: b.style, markDefs: [], children: [{ _type: 'span', _key: `s${i}`, text: b.text, marks: [] }] }
      : { _key: b._key || `k${i}`, ...b },
  );
}

export const plain = (b: Any) => (b.children || []).map((c: Any) => c.text || '').join('');
export const anchor = (text: string, i: number) => `h-${i}-${text.trim().toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').slice(0, 60)}`;

export function headings(blocks: Any[]) {
  return blocks
    .map((b, i) => ({ b, i }))
    .filter(({ b }) => b._type === 'block' && (b.style === 'h2' || b.style === 'h3'))
    .map(({ b, i }) => ({ id: anchor(plain(b), i), text: plain(b), level: b.style as 'h2' | 'h3' }));
}

export default function RichText({ blocks }: { blocks: Any[] }) {
  const idOf = new Map(blocks.map((b, i) => [b._key, anchor(plain(b), i)]));
  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => <h2 id={idOf.get(value._key)}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={idOf.get(value._key)}>{children}</h3>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    marks: {
      link: ({ children, value }) => {
        const href: string = value?.href || '#';
        const ext = /^https?:/.test(href);
        return <a href={href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>{children}</a>;
      },
    },
    types: {
      image: ({ value }) => (
        <figure style={{ margin: '32px 0' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value.src || urlFor(value, 1400)} alt={value.alt || ''} loading="lazy" style={{ width: '100%', height: 'auto' }} />
          {value.caption && <figcaption className="muted small" style={{ marginTop: 8 }}>{value.caption}</figcaption>}
        </figure>
      ),
      table: ({ value }) => (
        <div style={{ overflowX: 'auto' }}>
          <table><tbody>{(value.rows || []).map((r: Any, i: number) => <tr key={i}>{(r.cells || []).map((c: string, j: number) => (i === 0 ? <th key={j} style={{ border: '1px solid var(--line)', padding: '10px 12px', textAlign: 'start' }}>{c}</th> : <td key={j}>{c}</td>))}</tr>)}</tbody></table>
        </div>
      ),
    },
  };
  return <div className="prose"><PortableText value={blocks} components={components} /></div>;
}
