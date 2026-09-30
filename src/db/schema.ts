import {
  pgTable,
  text,
  uuid,
  timestamp,
  boolean,
  integer,
  doublePrecision,
  pgEnum,
  uniqueIndex,
  index,
  check,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { statuses } from '../lib/project';
export const engagementStatus = pgEnum('engagement_status', statuses);
export const activityStatus = pgEnum('activity_status', [
  'planned',
  'confirmed',
  'completed',
  'cancelled',
]);
const created = () => timestamp('created_at', { withTimezone: true }).defaultNow().notNull();
const updated = () => timestamp('updated_at', { withTimezone: true }).defaultNow().notNull();
export const schools = pgTable(
  'schools',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    city: text('city'),
    neighborhood: text('neighborhood'),
    educationType: text('education_type'),
    latitude: doublePrecision('latitude'),
    longitude: doublePrecision('longitude'),
    publicVisibility: boolean('public_visibility').default(false).notNull(),
    createdAt: created(),
    updatedAt: updated(),
  },
  (t) => [
    uniqueIndex('school_identity').on(t.id),
    check(
      'coordinates_valid',
      sql`(${t.latitude} IS NULL AND ${t.longitude} IS NULL) OR (${t.latitude} BETWEEN -90 AND 90 AND ${t.longitude} BETWEEN -180 AND 180)`,
    ),
  ],
);
export const engagements = pgTable(
  'school_engagements',
  {
    schoolId: text('school_id')
      .primaryKey()
      .references(() => schools.id, { onDelete: 'cascade' }),
    status: engagementStatus('status').default('mapeada').notNull(),
    priority: boolean('priority').default(false).notNull(),
    summary: text('summary').default('').notNull(),
    contactedAt: timestamp('contacted_at', { withTimezone: true }),
    repliedAt: timestamp('replied_at', { withTimezone: true }),
    meetingAt: timestamp('meeting_at', { withTimezone: true }),
    confirmedAt: timestamp('confirmed_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    updatedAt: updated(),
  },
  (t) => [index('engagement_status_idx').on(t.status)],
);
export const contactEvents = pgTable(
  'contact_events',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    schoolId: text('school_id')
      .notNull()
      .references(() => schools.id),
    channel: text('channel').notNull(),
    occurredAt: timestamp('occurred_at', { withTimezone: true }).notNull(),
    kind: text('kind').notNull(),
    createdAt: created(),
  },
  (t) => [index('contact_event_school_idx').on(t.schoolId)],
);
export const activities = pgTable(
  'activities',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    schoolId: text('school_id')
      .notNull()
      .references(() => schools.id),
    title: text('title').notNull(),
    description: text('description').default('').notNull(),
    scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    status: activityStatus('status').default('planned').notNull(),
    studentsReached: integer('students_reached'),
    classesReached: integer('classes_reached'),
    createdAt: created(),
    updatedAt: updated(),
  },
  (t) => [
    index('activity_school_idx').on(t.schoolId),
    check(
      'nonnegative_reached',
      sql`(${t.studentsReached} IS NULL OR ${t.studentsReached} >= 0) AND (${t.classesReached} IS NULL OR ${t.classesReached} >= 0)`,
    ),
    check(
      'completion_date_required',
      sql`${t.status} <> 'completed' OR ${t.completedAt} IS NOT NULL`,
    ),
  ],
);
export const classes = pgTable(
  'classes',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    schoolId: text('school_id')
      .notNull()
      .references(() => schools.id),
    activityId: uuid('activity_id').references(() => activities.id),
    gradeOrAgeGroup: text('grade_or_age_group').notNull(),
    shift: text('shift'),
    estimatedStudents: integer('estimated_students'),
  },
  (t) => [
    check(
      'nonnegative_estimate',
      sql`${t.estimatedStudents} IS NULL OR ${t.estimatedStudents} >= 0`,
    ),
  ],
);
export const metrics = pgTable(
  'impact_metrics',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    metric: text('metric').notNull(),
    value: integer('value').notNull(),
    referenceDate: text('reference_date').notNull(),
    source: text('source').notNull(),
    verified: boolean('verified').default(false).notNull(),
    createdAt: created(),
  },
  (t) => [
    check('nonnegative_metric', sql`${t.value} >= 0`),
    index('metric_reference_idx').on(t.metric, t.referenceDate),
  ],
);
export const materials = pgTable('educational_materials', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(),
  fileUrl: text('file_url').notNull(),
  published: boolean('published').default(false).notNull(),
  createdAt: created(),
});
export const feedback = pgTable(
  'feedback',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    activityId: uuid('activity_id')
      .notNull()
      .references(() => activities.id),
    anonymous: boolean('anonymous').default(true).notNull(),
    rating: integer('rating').notNull(),
    response: text('response').default('').notNull(),
    createdAt: created(),
  },
  (t) => [
    check('valid_rating', sql`${t.rating} BETWEEN 1 AND 5`),
    check('only_anonymous', sql`${t.anonymous} = true`),
  ],
);
export const submissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  organization: text('organization').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  consentAt: timestamp('consent_at', { withTimezone: true }).defaultNow().notNull(),
  createdAt: created(),
});
export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  course: text('course').default('Engenharia Civil').notNull(),
  role: text('role'),
  photoUrl: text('photo_url'),
  published: boolean('published').default(false).notNull(),
});
export const siteContent = pgTable('site_content', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
  updatedAt: updated(),
});
export const rateLimits = pgTable(
  'rate_limits',
  {
    key: text('key').primaryKey(),
    count: integer('count').default(1).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  },
  (t) => [index('rate_expiry_idx').on(t.expiresAt)],
);
