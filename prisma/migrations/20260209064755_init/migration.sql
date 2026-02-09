-- CreateTable
CREATE TABLE "registrationId" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registrationId_pkey" PRIMARY KEY ("id")
);
