/*
  Warnings:

  - Added the required column `moisture` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "moisture" DOUBLE PRECISION NOT NULL;
