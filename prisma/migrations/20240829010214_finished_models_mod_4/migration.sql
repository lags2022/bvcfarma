/*
  Warnings:

  - You are about to drop the column `subtotal` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "subtotal",
DROP COLUMN "tax";
