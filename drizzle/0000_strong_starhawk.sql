CREATE TYPE "public"."activity_status" AS ENUM('planned', 'confirmed', 'completed', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."engagement_status" AS ENUM('mapeada', 'contatada', 'respondeu', 'interessada', 'em_alinhamento', 'reuniao_agendada', 'reuniao_realizada', 'atividade_confirmada', 'atividade_realizada', 'possibilidade_futura', 'indisponivel');--> statement-breakpoint
CREATE TABLE "activities" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"scheduled_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"status" "activity_status" DEFAULT 'planned' NOT NULL,
	"students_reached" integer,
	"classes_reached" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "nonnegative_reached" CHECK (("activities"."students_reached" IS NULL OR "activities"."students_reached" >= 0) AND ("activities"."classes_reached" IS NULL OR "activities"."classes_reached" >= 0)),
	CONSTRAINT "completion_date_required" CHECK ("activities"."status" <> 'completed' OR "activities"."completed_at" IS NOT NULL)
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" text NOT NULL,
	"activity_id" uuid,
	"grade_or_age_group" text NOT NULL,
	"shift" text,
	"estimated_students" integer,
	CONSTRAINT "nonnegative_estimate" CHECK ("classes"."estimated_students" IS NULL OR "classes"."estimated_students" >= 0)
);
--> statement-breakpoint
CREATE TABLE "contact_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"school_id" text NOT NULL,
	"channel" text NOT NULL,
	"occurred_at" timestamp with time zone NOT NULL,
	"kind" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "school_engagements" (
	"school_id" text PRIMARY KEY NOT NULL,
	"status" "engagement_status" DEFAULT 'mapeada' NOT NULL,
	"priority" boolean DEFAULT false NOT NULL,
	"summary" text DEFAULT '' NOT NULL,
	"contacted_at" timestamp with time zone,
	"replied_at" timestamp with time zone,
	"meeting_at" timestamp with time zone,
	"confirmed_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"activity_id" uuid NOT NULL,
	"anonymous" boolean DEFAULT true NOT NULL,
	"rating" integer NOT NULL,
	"response" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "valid_rating" CHECK ("feedback"."rating" BETWEEN 1 AND 5),
	CONSTRAINT "only_anonymous" CHECK ("feedback"."anonymous" = true)
);
--> statement-breakpoint
CREATE TABLE "educational_materials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" text NOT NULL,
	"file_url" text NOT NULL,
	"published" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "impact_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"metric" text NOT NULL,
	"value" integer NOT NULL,
	"reference_date" text NOT NULL,
	"source" text NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "nonnegative_metric" CHECK ("impact_metrics"."value" >= 0)
);
--> statement-breakpoint
CREATE TABLE "rate_limits" (
	"key" text PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schools" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city" text,
	"neighborhood" text,
	"education_type" text,
	"latitude" double precision,
	"longitude" double precision,
	"public_visibility" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "coordinates_valid" CHECK (("schools"."latitude" IS NULL AND "schools"."longitude" IS NULL) OR ("schools"."latitude" BETWEEN -90 AND 90 AND "schools"."longitude" BETWEEN -180 AND 180))
);
--> statement-breakpoint
CREATE TABLE "site_content" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"organization" text NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "team_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"course" text DEFAULT 'Engenharia Civil' NOT NULL,
	"role" text,
	"photo_url" text,
	"published" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activities" ADD CONSTRAINT "activities_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "classes" ADD CONSTRAINT "classes_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_events" ADD CONSTRAINT "contact_events_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "school_engagements" ADD CONSTRAINT "school_engagements_school_id_schools_id_fk" FOREIGN KEY ("school_id") REFERENCES "public"."schools"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_activity_id_activities_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "activity_school_idx" ON "activities" USING btree ("school_id");--> statement-breakpoint
CREATE INDEX "contact_event_school_idx" ON "contact_events" USING btree ("school_id");--> statement-breakpoint
CREATE INDEX "engagement_status_idx" ON "school_engagements" USING btree ("status");--> statement-breakpoint
CREATE INDEX "metric_reference_idx" ON "impact_metrics" USING btree ("metric","reference_date");--> statement-breakpoint
CREATE INDEX "rate_expiry_idx" ON "rate_limits" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "school_identity" ON "schools" USING btree ("id");