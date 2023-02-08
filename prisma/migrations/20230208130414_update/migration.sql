-- AlterTable
ALTER TABLE "users" ALTER COLUMN "followers" DROP NOT NULL,
ALTER COLUMN "following" DROP NOT NULL;
