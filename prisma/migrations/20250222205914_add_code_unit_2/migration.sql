/*
  Warnings:

  - You are about to drop the column `name` on the `code_unit` table. All the data in the column will be lost.
  - Added the required column `code` to the `code_unit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "code_unit" DROP COLUMN "name",
ADD COLUMN     "alias" VARCHAR(30),
ADD COLUMN     "code" VARCHAR(30) NOT NULL,
ADD COLUMN     "description" VARCHAR(255);
