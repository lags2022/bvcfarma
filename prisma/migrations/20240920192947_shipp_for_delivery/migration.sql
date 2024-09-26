/*
  Warnings:

  - You are about to drop the column `shipping_method` on the `order` table. All the data in the column will be lost.
  - Added the required column `delivery_type` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DeliveryType" AS ENUM ('STANDARD', 'EXPRESS', 'PICKUP');

-- AlterTable
ALTER TABLE "order" DROP COLUMN "shipping_method",
ADD COLUMN     "delivery_type" "DeliveryType" NOT NULL;

-- DropEnum
DROP TYPE "ShippingMethod";
