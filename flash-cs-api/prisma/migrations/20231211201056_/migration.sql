/*
  Warnings:

  - You are about to drop the `_DeckToFlashcard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_DeckToFlashcard" DROP CONSTRAINT "_DeckToFlashcard_A_fkey";

-- DropForeignKey
ALTER TABLE "_DeckToFlashcard" DROP CONSTRAINT "_DeckToFlashcard_B_fkey";

-- DropTable
DROP TABLE "_DeckToFlashcard";

-- CreateTable
CREATE TABLE "deck_flashcard" (
    "id" SERIAL NOT NULL,
    "deck_id" INTEGER NOT NULL,
    "flashcard_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deck_flashcard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "deck_flashcard" ADD CONSTRAINT "deck_flashcard_deck_id_fkey" FOREIGN KEY ("deck_id") REFERENCES "decks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck_flashcard" ADD CONSTRAINT "deck_flashcard_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "flashcards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
