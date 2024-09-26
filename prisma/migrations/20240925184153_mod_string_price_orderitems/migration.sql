/*
  Warnings:

  - You are about to alter the column `price` on the `order_item_products` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `VarChar(8)`.

*/
-- AlterTable
ALTER TABLE "order_item_products" ALTER COLUMN "price" SET DATA TYPE VARCHAR(8);
