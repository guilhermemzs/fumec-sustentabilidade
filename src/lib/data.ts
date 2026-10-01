import 'server-only';
import { cache } from 'react';
import { eq } from 'drizzle-orm';
import { getDb } from '@/db';
import { schools, engagements, activities, materials, teamMembers } from '@/db/schema';
import { summarizeSchools, type School, referenceDate } from './project';
import { initialSchools } from './survey';
import { publicSchools, publicResults } from './publication';
import { documentedMembers } from './team';
export const getProjectData = cache(async () => {
  const db = getDb();
  if (db) {
    try {
      const [rows, activityRows, materialRows, members] = await Promise.all([
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
        db.select().from(teamMembers).where(eq(teamMembers.published, true)),
      ]);
      const schoolRows = publicSchools(
        rows.map((s) => ({ ...s, summary: '', priority: false })) as School[],
      );
      return {
        schools: schoolRows,
        stats: summarizeSchools(schoolRows),
        ...publicResults(activityRows),
        materials: materialRows,
        members,
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
    schools: publicSchools(initialSchools),
    stats: summarizeSchools(initialSchools),
    activities: [],
    materials: [],
    members: documentedMembers,
    completed: null,
    students: null,
    classes: null,
    source: 'snapshot' as const,
    referenceDate,
  };
});
