-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "start_address" TEXT NOT NULL,
    "destination_address" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "distance" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);
