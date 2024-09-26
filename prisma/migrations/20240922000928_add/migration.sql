/*
  Warnings:

  - Added the required column `oc_number` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "oc_number" VARCHAR(13) NOT NULL;
