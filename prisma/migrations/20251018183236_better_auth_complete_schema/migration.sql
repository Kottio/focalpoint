/*
  Warnings:

  - You are about to drop the column `avatar_url` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider_account_id` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `idle_expires_at` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `consumed_at` on the `verifications` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `verifications` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[provider_id,account_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `account_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "accounts_provider_provider_account_id_key";

-- DropIndex
DROP INDEX "sessions_idle_expires_at_idx";

-- DropIndex
DROP INDEX "verifications_type_idx";

-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "avatar_url",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "provider",
DROP COLUMN "provider_account_id",
DROP COLUMN "scope",
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "username",
ADD COLUMN     "account_id" TEXT NOT NULL,
ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "password" TEXT,
ADD COLUMN     "provider_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "idle_expires_at";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "verifications" DROP COLUMN "consumed_at",
DROP COLUMN "type";

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_id_account_id_key" ON "accounts"("provider_id", "account_id");

-- CreateIndex
CREATE INDEX "verifications_user_id_idx" ON "verifications"("user_id");
