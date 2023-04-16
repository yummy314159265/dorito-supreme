DROP TABLE IF EXISTS channelProfiles;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS channels; 

CREATE TABLE "channelProfiles"(
    "id" UUID NOT NULL,
    "channel_id" UUID NOT NULL,
    "profile_id" UUID NOT NULL
);
ALTER TABLE
    "channelprofiles" ADD PRIMARY KEY("id");
CREATE TABLE "messages"(
    "id" UUID NOT NULL,
    "channel_id" UUID NOT NULL,
    "sender_profile_id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "updated_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL
);
ALTER TABLE
    "messages" ADD PRIMARY KEY("id");
CREATE TABLE "channels"(
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL,
        "owner_id" UUID NOT NULL
);
ALTER TABLE
    "channels" ADD PRIMARY KEY("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_channel_id_foreign" FOREIGN KEY("channel_id") REFERENCES "channels"("id");
ALTER TABLE
    "channels" ADD CONSTRAINT "channels_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "profiles"("id");
ALTER TABLE
    "channelprofiles" ADD CONSTRAINT "channelprofiles_profile_id_foreign" FOREIGN KEY("profile_id") REFERENCES "profiles"("id");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_sender_profile_id_foreign" FOREIGN KEY("sender_profile_id") REFERENCES "profiles"("id");
ALTER TABLE
    "channelprofiles" ADD CONSTRAINT "channelprofiles_channel_id_foreign" FOREIGN KEY("channel_id") REFERENCES "channels"("id");