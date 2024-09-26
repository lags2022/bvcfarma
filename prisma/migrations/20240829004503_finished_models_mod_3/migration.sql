/*
  Warnings:

  - Changed the type of `id_product_erp` on the `fields_add_product` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `id_product_erp` on the `order_item_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "fields_add_product" DROP COLUMN "id_product_erp",
ADD COLUMN     "id_product_erp" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "order_item_products" DROP COLUMN "id_product_erp",
ADD COLUMN     "id_product_erp" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "fields_add_product_id_product_erp_slug_key" ON "fields_add_product"("id_product_erp", "slug");
