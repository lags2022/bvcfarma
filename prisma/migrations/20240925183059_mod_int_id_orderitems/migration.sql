/*
  Warnings:

  - The primary key for the `order_item_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `order_item_products` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "order_item_products" DROP CONSTRAINT "order_item_products_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "order_item_products_pkey" PRIMARY KEY ("id");
