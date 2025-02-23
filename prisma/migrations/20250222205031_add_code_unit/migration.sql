/*
  Warnings:

  - You are about to drop the column `codeUnit` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "codeUnit",
ADD COLUMN     "codeUnitId" INTEGER;

-- CreateTable
CREATE TABLE "code_unit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "code_unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_codeUnitId_fkey" FOREIGN KEY ("codeUnitId") REFERENCES "code_unit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
