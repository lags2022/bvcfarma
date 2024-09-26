/*
  Warnings:

  - You are about to drop the column `city` on the `order_address` table. All the data in the column will be lost.
  - You are about to alter the column `postal_code` on the `order_address` table. The data in that column could be lost. The data in that column will be cast from `VarChar(20)` to `VarChar(5)`.

*/
-- AlterTable
ALTER TABLE "order_address" DROP COLUMN "city",
ADD COLUMN     "department" VARCHAR(50) NOT NULL DEFAULT 'Lima',
ADD COLUMN     "district" VARCHAR(50) NOT NULL DEFAULT 'Miraflores',
ADD COLUMN     "email" VARCHAR(150) NOT NULL DEFAULT 'melcabo@gmail.com',
ADD COLUMN     "province" VARCHAR(50) NOT NULL DEFAULT 'Callao',
ALTER COLUMN "postal_code" SET DEFAULT '21341',
ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(5);
