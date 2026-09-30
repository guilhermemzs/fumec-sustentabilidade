import { notFound } from 'next/navigation';
import { z } from 'zod';
import { and, eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { activities, schools } from '@/db/schema';
import { PageIntro } from '@/components/ui';
import { FeedbackForm } from '@/components/feedback-form';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Avaliação anônima', robots: { index: false, follow: false } };
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.uuid().safeParse(id).success) notFound();
  const db = getDb();
  if (!db) notFound();
  const [activity] = await db
    .select({ title: activities.title })
    .from(activities)
    .innerJoin(schools, eq(activities.schoolId, schools.id))
    .where(
      and(
        eq(activities.id, id),
        eq(activities.status, 'completed'),
        eq(schools.publicVisibility, true),
      ),
    );
  if (!activity) notFound();
  return (
    <>
      <PageIntro
        eyebrow="APRENDER COM O ENCONTRO"
        title="Como foi essa experiência?"
        description={'Avaliação anônima da atividade: ' + activity.title}
      />
      <div className="container content-space">
        <FeedbackForm activityId={id} />
      </div>
    </>
  );
}
