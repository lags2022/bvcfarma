/*
  Warnings:

  - You are about to drop the `countries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `fields_add_product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order_item_products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_addresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order_address" DROP CONSTRAINT "order_address_country_id_fkey";

-- DropForeignKey
ALTER TABLE "order_item_products" DROP CONSTRAINT "order_item_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_country_id_fkey";

-- DropForeignKey
ALTER TABLE "user_addresses" DROP CONSTRAINT "user_addresses_user_id_fkey";

-- AlterTable
ALTER TABLE "order_address" ALTER COLUMN "country_id" DROP NOT NULL;

-- DropTable
DROP TABLE "countries";

-- DropTable
DROP TABLE "fields_add_product";

-- DropTable
DROP TABLE "order_item_products";

-- DropTable
DROP TABLE "user_addresses";

-- CreateTable
CREATE TABLE "user_address" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "image" TEXT,
    "phone" VARCHAR(20),
    "address" VARCHAR(255),
    "address2" VARCHAR(255),
    "postal_code" VARCHAR(20),
    "city" VARCHAR(255),
    "country_id" INTEGER,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" UUID NOT NULL,
    "id_excel" VARCHAR(50),
    "name" VARCHAR(255) NOT NULL,
    "codeUnit" VARCHAR(20),
    "price_unit" DOUBLE PRECISION,
    "stock" INTEGER DEFAULT 0,
    "expiration" DATE,
    "lote" VARCHAR(20),
    "image_url" VARCHAR(255),
    "description" TEXT,
    "slug" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "product_line_id" INTEGER,
    "category_id" INTEGER,
    "sub_category_id" INTEGER,
    "distributionTypeId" INTEGER,
    "typeOfferId" INTEGER,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_line" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "product_line_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "category_id" INTEGER,

    CONSTRAINT "sub_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "distribution_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,
    "description" VARCHAR(100),

    CONSTRAINT "distribution_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "type_offer" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(100),

    CONSTRAINT "type_offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_product" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price_at_time" DOUBLE PRECISION NOT NULL,
    "subtotal_item" DOUBLE PRECISION NOT NULL,
    "name_product_backup" VARCHAR(150) NOT NULL,
    "image_product_backup" VARCHAR(255) NOT NULL,
    "product_id" UUID,
    "order_id" UUID NOT NULL,

    CONSTRAINT "order_item_product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_address_user_id_key" ON "user_address"("user_id");

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_address" ADD CONSTRAINT "user_address_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_product_line_id_fkey" FOREIGN KEY ("product_line_id") REFERENCES "product_line"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_sub_category_id_fkey" FOREIGN KEY ("sub_category_id") REFERENCES "sub_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_distributionTypeId_fkey" FOREIGN KEY ("distributionTypeId") REFERENCES "distribution_type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_typeOfferId_fkey" FOREIGN KEY ("typeOfferId") REFERENCES "type_offer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_product" ADD CONSTRAINT "order_item_product_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_product" ADD CONSTRAINT "order_item_product_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_address" ADD CONSTRAINT "order_address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE CASCADE;
