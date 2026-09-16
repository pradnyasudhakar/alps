-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_packageId_fkey";

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "packageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
