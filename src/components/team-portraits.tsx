import Image from 'next/image';
import type { CSSProperties } from 'react';
import { portraits } from '@/lib/team';
type Member = { name: string; course: string; photoUrl: string | null };
export function TeamPortraits({ members, eager = false }: { members: Member[]; eager?: boolean }) {
  const ordered = Object.keys(portraits).flatMap((name) =>
    members.filter((m) => m.name === name && m.photoUrl),
  );
  if (!ordered.length) return null;
  return (
    <div className="team-portraits">
      {ordered.map((m) => (
        <figure key={m.name} className="member-portrait">
          <div
            className="portrait-frame"
            style={{ '--portrait-left': portraits[m.name].left } as CSSProperties}
          >
            <Image
              src={m.photoUrl!}
              alt={`${m.name}, ${portraits[m.name].position}`}
              width={1280}
              height={960}
              sizes="1920px"
              loading={eager ? 'eager' : 'lazy'}
            />
          </div>
          <figcaption>
            <h3>{m.name}</h3>
            <p>{m.course} · FUMEC</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
