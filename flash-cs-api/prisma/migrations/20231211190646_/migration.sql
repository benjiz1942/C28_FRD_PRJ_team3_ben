/*
  Warnings:

  - You are about to drop the `deck_flashcard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "deck_flashcard" DROP CONSTRAINT "deck_flashcard_deck_id_fkey";

-- DropForeignKey
ALTER TABLE "deck_flashcard" DROP CONSTRAINT "deck_flashcard_flashcard_id_fkey";

-- DropTable
DROP TABLE "deck_flashcard";

-- CreateTable
CREATE TABLE "_DeckToFlashcard" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DeckToFlashcard_AB_unique" ON "_DeckToFlashcard"("A", "B");

-- CreateIndex
CREATE INDEX "_DeckToFlashcard_B_index" ON "_DeckToFlashcard"("B");

-- AddForeignKey
ALTER TABLE "_DeckToFlashcard" ADD CONSTRAINT "_DeckToFlashcard_A_fkey" FOREIGN KEY ("A") REFERENCES "decks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeckToFlashcard" ADD CONSTRAINT "_DeckToFlashcard_B_fkey" FOREIGN KEY ("B") REFERENCES "flashcards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
