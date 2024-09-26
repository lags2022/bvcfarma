/*
  Warnings:

  - A unique constraint covering the columns `[source_id_token]` on the table `culqi_charge` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `creation_date` on the `culqi_charge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `amount_refunded` on the `culqi_charge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `installments` on the `culqi_charge` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "culqi_charge" DROP COLUMN "creation_date",
ADD COLUMN     "creation_date" INTEGER NOT NULL,
DROP COLUMN "amount_refunded",
ADD COLUMN     "amount_refunded" INTEGER NOT NULL,
DROP COLUMN "installments",
ADD COLUMN     "installments" INTEGER NOT NULL,
ALTER COLUMN "fraud_score" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "culqi_charge_source_id_token_key" ON "culqi_charge"("source_id_token");
