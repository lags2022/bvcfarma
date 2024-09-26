-- CreateEnum
CREATE TYPE "Role" AS ENUM ('PUBLIC', 'PHARMACY', 'OWNER', 'ADMIN');

-- CreateTable
CREATE TABLE "user_table" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "email_verified" TIMESTAMPTZ(6),
    "password" TEXT NOT NULL,
    "favorites" TEXT[],
    "role" "Role" NOT NULL DEFAULT 'PUBLIC',
    "birthdate" DATE,
    "ruc" VARCHAR(11),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_email_key" ON "user_table"("email");
