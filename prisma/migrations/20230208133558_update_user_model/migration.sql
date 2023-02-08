-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "likes" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" VARCHAR(150);
