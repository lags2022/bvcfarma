-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'TRANSFER', 'STRIPE', 'YAPE');

-- CreateEnum
CREATE TYPE "StatusOrder" AS ENUM ('CANCELLED', 'VALIDATING', 'PREPARING', 'ASSIGNED', 'DELIVERED');

-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('HOME_DELIVERY', 'IN_STORE_PICKUP');

-- CreateTable
CREATE TABLE "user_addresses" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "address2" VARCHAR(255),
    "postal_code" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "country_id" INTEGER NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields_add_product" (
    "id" UUID NOT NULL,
    "id_product_erp" UUID NOT NULL,
    "slug" TEXT,
    "not_active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "fields_add_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL,
    "payment_method" "PaymentMethod" NOT NULL,
    "status" "StatusOrder" NOT NULL DEFAULT 'VALIDATING',
    "shipping_method" "ShippingMethod" NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "paid_at" TIMESTAMP(3),
    "quantity_items" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "tax" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "observation" TEXT,
    "transaction_id" TEXT,
    "document_url" TEXT,
    "user_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item_products" (
    "id" UUID NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "units" INTEGER NOT NULL,
    "id_product_erp" UUID NOT NULL,
    "subtotal_item" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "order_id" UUID NOT NULL,

    CONSTRAINT "order_item_products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_address" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR NOT NULL,
    "address2" VARCHAR,
    "postal_code" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "city" VARCHAR,
    "country_id" INTEGER NOT NULL,
    "order_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "order_address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_addresses_user_id_key" ON "user_addresses"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "fields_add_product_id_product_erp_slug_key" ON "fields_add_product"("id_product_erp", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "order_address_order_id_key" ON "order_address"("order_id");

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_table"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_item_products" ADD CONSTRAINT "order_item_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_address" ADD CONSTRAINT "order_address_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "countries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_address" ADD CONSTRAINT "order_address_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
