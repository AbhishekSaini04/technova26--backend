/*
  Warnings:

  - You are about to drop the `Department` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Registration" DROP CONSTRAINT "Registration_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_registrationId_fkey";

-- DropTable
DROP TABLE "Department";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Otp";

-- DropTable
DROP TABLE "Registration";

-- DropTable
DROP TABLE "TeamMember";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "department" TEXT NOT NULL,
    "minTeamSize" INTEGER NOT NULL DEFAULT 0,
    "maxTeamSize" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dqf7raj6f/image/upload/v1770367590/imageLoading_vaij1l.gif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "otp" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "teamName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "registration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "teamMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "registrationId" INTEGER NOT NULL,

    CONSTRAINT "teamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "department" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "department_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "otp_email_key" ON "otp"("email");

-- CreateIndex
CREATE INDEX "registration_eventId_idx" ON "registration"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "registration_userId_eventId_key" ON "registration"("userId", "eventId");

-- CreateIndex
CREATE INDEX "teamMember_registrationId_idx" ON "teamMember"("registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "department_name_key" ON "department"("name");

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration" ADD CONSTRAINT "registration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teamMember" ADD CONSTRAINT "teamMember_registrationId_fkey" FOREIGN KEY ("registrationId") REFERENCES "registration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
