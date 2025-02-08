/*
  Warnings:

  - You are about to drop the column `latitude` on the `Station` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Station` table. All the data in the column will be lost.
  - Added the required column `accelX` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accelY` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accelZ` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `angVelX` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `angVelY` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `angVelZ` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `WeatherData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `WeatherData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Station" DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "WeatherData" ADD COLUMN     "accelX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "accelY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "accelZ" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "angVelX" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "angVelY" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "angVelZ" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
