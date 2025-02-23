/*
  Warnings:

  - You are about to drop the column `alias` on the `code_unit` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `code_unit` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `code_unit` table. All the data in the column will be lost.
  - Added the required column `name` to the `code_unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "code_unit" DROP COLUMN "alias",
DROP COLUMN "code",
DROP COLUMN "description",
ADD COLUMN     "name" VARCHAR(30) NOT NULL;
