CREATE TYPE "public"."playlist_type_enum" AS ENUM('default', 'custom');--> statement-breakpoint
CREATE TYPE "public"."oauth_provides" AS ENUM('google');--> statement-breakpoint
CREATE TABLE "oAuth_account_table" (
	"userId" uuid NOT NULL,
	"provider" "oauth_provides" NOT NULL,
	"providerAccountId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "oAuth_account_table_providerAccountId_provider_pk" PRIMARY KEY("providerAccountId","provider"),
	CONSTRAINT "oAuth_account_table_providerAccountId_unique" UNIQUE("providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "playlist_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"imageName" varchar(225),
	"type" "playlist_type_enum" DEFAULT 'custom' NOT NULL,
	"creatorId" uuid NOT NULL,
	CONSTRAINT "playlist_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "playlist_tracks_table" (
	"playlistId" uuid NOT NULL,
	"trackId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "track_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"author" varchar(225) NOT NULL,
	"imageName" varchar(225),
	"trackDir" varchar(222) NOT NULL,
	"duration" real NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"likes_count" integer GENERATED ALWAYS AS ((SELECT COUNT(*) FROM likes WHERE likes.track_id = tracks.id)) STORED,
	CONSTRAINT "track_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_session_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"isEnded" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"endedAt" timestamp,
	CONSTRAINT "user_session_table_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "user_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" text,
	"salt" text,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_table_id_unique" UNIQUE("id"),
	CONSTRAINT "user_table_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "oAuth_account_table" ADD CONSTRAINT "oAuth_account_table_userId_user_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_table" ADD CONSTRAINT "playlist_table_creatorId_user_table_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."user_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_tracks_table" ADD CONSTRAINT "playlist_tracks_table_playlistId_playlist_table_id_fk" FOREIGN KEY ("playlistId") REFERENCES "public"."playlist_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_tracks_table" ADD CONSTRAINT "playlist_tracks_table_trackId_track_table_id_fk" FOREIGN KEY ("trackId") REFERENCES "public"."track_table"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_session_table" ADD CONSTRAINT "user_session_table_userId_user_table_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user_table"("id") ON DELETE no action ON UPDATE no action;