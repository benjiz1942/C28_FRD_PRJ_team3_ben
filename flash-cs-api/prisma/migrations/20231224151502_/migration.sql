/*
  Warnings:

  - You are about to drop the column `exericse_id` on the `user_article_exercise` table. All the data in the column will be lost.
  - Added the required column `exercise_id` to the `user_article_exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_article_exercise" DROP CONSTRAINT "user_article_exercise_exericse_id_fkey";

-- AlterTable
ALTER TABLE "user_article_exercise" DROP COLUMN "exericse_id",
ADD COLUMN     "exercise_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "user_article_exercise" ADD CONSTRAINT "user_article_exercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
