/*
  Warnings:

  - You are about to drop the column `emoji` on the `countries` table. All the data in the column will be lost.
  - Added the required column `image_url` to the `countries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "countries" DROP COLUMN "emoji",
ADD COLUMN     "image_url" VARCHAR(255) NOT NULL;
