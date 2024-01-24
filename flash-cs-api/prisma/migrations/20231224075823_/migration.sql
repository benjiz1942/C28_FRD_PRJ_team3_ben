/*
  Warnings:

  - Added the required column `correct_answer` to the `exercises` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `user_answer` on the `user_article_exercise` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "correct_answer" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "user_article_exercise" DROP COLUMN "user_answer",
ADD COLUMN     "user_answer" INTEGER NOT NULL;
