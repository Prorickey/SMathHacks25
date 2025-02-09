/*
  Warnings:

  - Added the required column `ir` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uv` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "ir" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "uv" DOUBLE PRECISION NOT NULL;
