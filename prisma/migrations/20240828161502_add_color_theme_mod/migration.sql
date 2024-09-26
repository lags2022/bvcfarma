/*
  Warnings:

  - You are about to alter the column `color_theme` on the `user_table` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(7)`.

*/
-- AlterTable
ALTER TABLE "user_table" ALTER COLUMN "color_theme" SET DATA TYPE VARCHAR(7);
