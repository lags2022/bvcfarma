/*
  Warnings:

  - Added the required column `emoji` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" ADD COLUMN     "emoji" VARCHAR(15) NOT NULL;
