/*
  Warnings:

  - You are about to drop the column `url` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "url",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "externalId" INTEGER NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_externalId_key" ON "Product"("externalId");
