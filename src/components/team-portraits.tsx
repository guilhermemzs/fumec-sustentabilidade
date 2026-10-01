import Image from 'next/image';
import type { CSSProperties } from 'react';
import { portraits } from '@/lib/team';
type Member = { name: string; course: string; photoUrl: string | null };
function Portrait({ member: m, eager }: { member: Member; eager: boolean }) {
  const portrait = portraits[m.name];
  return (
    <figure className="member-portrait">
      <div
        className={'portrait-frame ' + portrait.kind}
        style={
          {
            '--portrait-left': portrait.left,
            '--portrait-position': portrait.objectPosition,
            '--portrait-zoom': portrait.zoom,
          } as CSSProperties
        }
      >
        <Image
          src={m.photoUrl!}
          alt={portrait.position ? `${m.name}, ${portrait.position}` : m.name}
          width={portrait.kind === 'group' ? 1280 : 640}
          height={portrait.kind === 'group' ? 960 : 640}
          sizes={portrait.kind === 'group' ? '1920px' : '(max-width: 640px) 100vw, 33vw'}
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <figcaption>
        <h3>{m.name}</h3>
        <p>{m.course} · FUMEC</p>
      </figcaption>
    </figure>
  );
}
export function TeamPortraits({ members, eager = false }: { members: Member[]; eager?: boolean }) {
  const ordered = Object.keys(portraits).flatMap((name) =>
    members.filter((m) => m.name === name && m.photoUrl),
  );
  if (!ordered.length) return null;
  return (
    <div className="team-portraits">
      {(['group', 'individual'] as const).map((kind) => {
        const group = ordered.filter((m) => portraits[m.name].kind === kind);
        return group.length ? (
          <div
            key={kind}
            className={kind === 'individual' ? 'portrait-group portrait-pair' : 'portrait-group'}
          >
            {group.map((m) => (
              <Portrait key={m.name} member={m} eager={eager} />
            ))}
          </div>
        ) : null;
      })}
    </div>
  );
}
