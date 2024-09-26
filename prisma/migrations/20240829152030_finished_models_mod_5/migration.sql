/*
  Warnings:

  - The `favorites` column on the `user_table` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_table" DROP COLUMN "favorites",
ADD COLUMN     "favorites" INTEGER[];
