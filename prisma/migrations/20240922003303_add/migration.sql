/*
  Warnings:

  - You are about to alter the column `transaction_id` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `document_url` on the `order` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `created_at` on the `order_address` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `order_address` table. All the data in the column will be lost.
  - You are about to alter the column `reference` on the `order_address` table. The data in that column could be lost. The data in that column will be cast from `VarChar` to `VarChar(150)`.
  - You are about to drop the column `created_at` on the `order_item_products` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `order_item_products` table. All the data in the column will be lost.
  - Added the required column `discount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_cost` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_cart` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `order_item_products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `order_item_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shipping_cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "total_cart" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "transaction_id" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "document_url" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "order_address" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ALTER COLUMN "reference" SET DATA TYPE VARCHAR(150);

-- AlterTable
ALTER TABLE "order_item_products" DROP COLUMN "created_at",
DROP COLUMN "updated_at",
ADD COLUMN     "image" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(150) NOT NULL;
