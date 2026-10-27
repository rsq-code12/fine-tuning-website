import type { Block } from '@/data/content/types';
import Rich from './Rich';

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\*\*|\[|\]\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 64);

/** Long-form content renderer. H2s get ids so the table of contents and answer engines can deep-link. */
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="prose-wc">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2 key={i} id={slugify(b.text)}>
                <Rich text={b.text} />
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i}>
                <Rich text={b.text} />
              </h3>
            );
          case 'p':
            return (
              <p key={i}>
                <Rich text={b.text} />
              </p>
            );
          case 'ul':
          case 'ol': {
            const List = b.type;
            return (
              <List key={i}>
                {b.items.map((it, k) => (
                  <li key={k}>
                    <Rich text={it} />
                  </li>
                ))}
              </List>
            );
          }
          case 'callout':
            return (
              <aside key={i} className="callout">
                <p className="callout__title">{b.title ? <Rich text={b.title} /> : 'Rule of thumb'}</p>
                <p>
                  <Rich text={b.text} />
                </p>
              </aside>
            );
          case 'table':
            return (
              <div key={i} className="table-wrap">
                <table>
                  {b.caption && (
                    <caption>
                      <Rich text={b.caption} />
                    </caption>
                  )}
                  <thead>
                    <tr>
                      {b.head.map((h, k) => (
                        <th key={k} scope="col">
                          <Rich text={h} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, k) => (
                      <tr key={k}>
                        {r.map((c, j) =>
                          j === 0 ? (
                            <th key={j} scope="row">
                              <Rich text={c} />
                            </th>
                          ) : (
                            <td key={j}>
                              <Rich text={c} />
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
