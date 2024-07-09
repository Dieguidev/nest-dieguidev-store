/*
  Warnings:

  - Added the required column `totalAmount` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalItems` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `totalAmount` DECIMAL(10, 2) NOT NULL,
    ADD COLUMN `totalItems` INTEGER NOT NULL;
