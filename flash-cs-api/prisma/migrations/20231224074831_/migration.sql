/*
  Warnings:

  - Added the required column `option0` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option1` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option2` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Added the required column `option3` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `correct_answer` on the `exercises` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "option0" TEXT NOT NULL,
ADD COLUMN     "option1" TEXT NOT NULL,
ADD COLUMN     "option2" TEXT NOT NULL,
ADD COLUMN     "option3" TEXT NOT NULL,
DROP COLUMN "correct_answer",
ADD COLUMN     "correct_answer" INTEGER NOT NULL;
