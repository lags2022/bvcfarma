/*
  Warnings:

  - The values [STRIPE] on the enum `PaymentMethod` will be removed. If these variants are still used in the database, this will fail.
  - The values [HOME_DELIVERY,IN_STORE_PICKUP] on the enum `ShippingMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address2` on the `order_address` table. All the data in the column will be lost.
  - Added the required column `type_document` to the `order_address` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeDocument" AS ENUM ('DNI', 'PASSPORT', 'FOREIGNER_CARD');

-- AlterEnum
BEGIN;
CREATE TYPE "PaymentMethod_new" AS ENUM ('CASH', 'TRANSFER', 'CARD', 'YAPE', 'POS');
ALTER TABLE "order" ALTER COLUMN "payment_method" TYPE "PaymentMethod_new" USING ("payment_method"::text::"PaymentMethod_new");
ALTER TYPE "PaymentMethod" RENAME TO "PaymentMethod_old";
ALTER TYPE "PaymentMethod_new" RENAME TO "PaymentMethod";
DROP TYPE "PaymentMethod_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ShippingMethod_new" AS ENUM ('STANDARD', 'EXPRESS', 'PICKUP');
ALTER TABLE "order" ALTER COLUMN "shipping_method" TYPE "ShippingMethod_new" USING ("shipping_method"::text::"ShippingMethod_new");
ALTER TYPE "ShippingMethod" RENAME TO "ShippingMethod_old";
ALTER TYPE "ShippingMethod_new" RENAME TO "ShippingMethod";
DROP TYPE "ShippingMethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "order_address" DROP COLUMN "address2",
ADD COLUMN     "reference" VARCHAR,
ALTER COLUMN "postal_code" DROP DEFAULT,
DROP COLUMN "type_document",
ADD COLUMN     "type_document" "TypeDocument" NOT NULL,
ALTER COLUMN "department" DROP DEFAULT,
ALTER COLUMN "district" DROP DEFAULT,
ALTER COLUMN "email" DROP DEFAULT,
ALTER COLUMN "province" DROP DEFAULT;
