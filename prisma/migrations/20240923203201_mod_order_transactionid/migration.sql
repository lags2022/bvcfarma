/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `transaction_id` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "transaction_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_transaction_id_key" ON "order"("transaction_id");
