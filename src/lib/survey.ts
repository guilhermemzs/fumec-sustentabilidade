import surveySchools from '../data/school-survey.json';
import { institutionKey, type School, type Status } from './project';

// Fonte integral para importação e gestão; não importar em componentes de cliente.
export const initialSchools: School[] = surveySchools.map((school) => ({
  ...school,
  id: institutionKey(school.name),
  status: school.status as Status,
  latitude: null,
  longitude: null,
  publicVisibility: true,
}));
