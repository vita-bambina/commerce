/*
  Warnings:

  - Added the required column `vat` to the `orderitem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orderitem` ADD COLUMN `vat` DOUBLE NOT NULL;
