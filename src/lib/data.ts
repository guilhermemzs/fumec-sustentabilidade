import 'server-only';
import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { schools, engagements, activities, materials, metrics, teamMembers } from '@/db/schema';
import { initialSchools, summarizeSchools, type School, referenceDate } from './project';
import { documentedMembers } from './team';
export const getProjectData = cache(async () => {
  const db = getDb();
  if (db) {
    try {
      const [rows, activityRows, materialRows, metricRows, members] = await Promise.all([
        db
          .select({
            id: schools.id,
            name: schools.name,
            city: schools.city,
            address: schools.address,
            neighborhood: schools.neighborhood,
            state: schools.state,
            postalCode: schools.postalCode,
            educationType: schools.educationType,
            snapshotDate: schools.snapshotDate,
            latitude: schools.latitude,
            longitude: schools.longitude,
            publicVisibility: schools.publicVisibility,
            status: engagements.status,
            summary: engagements.summary,
            priority: engagements.priority,
          })
          .from(schools)
          .innerJoin(engagements, eq(schools.id, engagements.schoolId))
          .where(eq(schools.publicVisibility, true)),
        db
          .select({
            id: activities.id,
            title: activities.title,
            description: activities.description,
            status: activities.status,
            scheduledAt: activities.scheduledAt,
            completedAt: activities.completedAt,
            studentsReached: activities.studentsReached,
            classesReached: activities.classesReached,
          })
          .from(activities)
          .innerJoin(schools, eq(activities.schoolId, schools.id))
          .where(eq(schools.publicVisibility, true)),
        db.select().from(materials).where(eq(materials.published, true)),
        db.select().from(metrics),
        db.select().from(teamMembers).where(eq(teamMembers.published, true)),
      ]);
      const completed = activityRows.filter((a) => a.status === 'completed');
      return {
        schools: rows as School[],
        stats: summarizeSchools(rows),
        activities: activityRows,
        materials: materialRows,
        members,
        metrics: metricRows,
        completed: completed.length,
        students:
          completed.every((a) => a.studentsReached !== null) && completed.length
            ? completed.reduce((sum, a) => sum + (a.studentsReached ?? 0), 0)
            : null,
        classes:
          completed.every((a) => a.classesReached !== null) && completed.length
            ? completed.reduce((sum, a) => sum + (a.classesReached ?? 0), 0)
            : null,
        source: 'database' as const,
        referenceDate,
      };
    } catch {
      console.error(
        'Dados dinâmicos indisponíveis; exibindo registro institucional de referência.',
      );
    }
  }
  return {
    schools: initialSchools,
    stats: summarizeSchools(initialSchools),
    activities: [],
    materials: [],
    members: documentedMembers,
    metrics: [],
    completed: null,
    students: null,
    classes: null,
    source: 'snapshot' as const,
    referenceDate,
  };
});
