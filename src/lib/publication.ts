import type { School } from './project';

export function publicSchools(schools: School[]): School[] {
  return schools
    .filter((school) => school.publicVisibility)
    .map((school) => ({
      ...school,
      // A resposta é documentada; a possibilidade de um encontro futuro não é um resultado.
      status: school.status === 'possibilidade_futura' ? 'respondeu' : school.status,
      summary: '',
      priority: false,
    }));
}

type ActivityResult = {
  status: string;
  completedAt: Date | null;
  studentsReached: number | null;
  classesReached: number | null;
};

export function publicResults<T extends ActivityResult>(activities: T[]) {
  const completed = activities.filter((a) => a.status === 'completed' && a.completedAt !== null);
  return {
    activities: completed,
    completed: completed.length || null,
    students:
      completed.length && completed.every((a) => a.studentsReached !== null)
        ? completed.reduce((sum, a) => sum + (a.studentsReached ?? 0), 0)
        : null,
    classes:
      completed.length && completed.every((a) => a.classesReached !== null)
        ? completed.reduce((sum, a) => sum + (a.classesReached ?? 0), 0)
        : null,
  };
}
