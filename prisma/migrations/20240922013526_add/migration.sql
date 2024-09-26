/*
  Warnings:

  - A unique constraint covering the columns `[oc_number]` on the table `order` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "culqi_charge" (
    "id" TEXT NOT NULL,
    "creation_date" VARCHAR(10) NOT NULL,
    "amount" INTEGER NOT NULL,
    "amount_refunded" VARCHAR(8) NOT NULL,
    "current_amount" INTEGER NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "installments" VARCHAR(2) NOT NULL,
    "statement_descriptor" VARCHAR(255) NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "dispute" BOOLEAN NOT NULL,
    "source_id_token" VARCHAR(255) NOT NULL,
    "source_type" VARCHAR(10) NOT NULL,
    "fraud_score" INTEGER NOT NULL,
    "user_message" VARCHAR(255) NOT NULL,
    "merchant_message" VARCHAR(255) NOT NULL,
    "order_id" UUID NOT NULL,

    CONSTRAINT "culqi_charge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "culqi_charge_order_id_key" ON "culqi_charge"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "order_oc_number_key" ON "order"("oc_number");

-- AddForeignKey
ALTER TABLE "culqi_charge" ADD CONSTRAINT "culqi_charge_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
