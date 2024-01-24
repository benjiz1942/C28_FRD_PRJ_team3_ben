import { Link } from "react-router-dom";
import { queryKey } from "../api/utilsAPI";
import { useQuery } from "@tanstack/react-query";
import DeleteDeckModal from "./DeleteDeckModal";
import { getAllDeck } from "../api/CardAPI";
import { useEffect, useState } from "react";

type CardListFilterProps = {
  theme: string; // Or use a more specific type, like 'light' | 'dark'
  isOpen: boolean;
};

export default function CardListFilter({ theme, isOpen }: CardListFilterProps) {
  const {
    data: decks,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [queryKey.DECK],
    queryFn: getAllDeck,
  });

  const [isNavOpen, setIsNavOpen] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleNavbar = () => {
    if (windowWidth <= 1024) {
      setIsNavOpen((prevState) => !prevState);
    } else {
      setIsNavOpen(true);
    }
  };

  useEffect(() => {
    if (windowWidth <= 1024) {
      setIsNavOpen(false);
    } else {
      setIsNavOpen(true);
    }
  }, [windowWidth]);

  if (isLoading || isFetching || error || !decks) return (
    <div className="flex items-center justify-center h-screen">
      <div className="loading loading-dots loading-8xl"></div>
    </div>
  );

  return (
    <>
      <li className="btn filter-broder bg-transparent hover:bg-transparent">
        <Link to="/mydecks" onClick={toggleNavbar} className="mr-auto min-w-[250px]">
            Show all decks
        </Link>
      </li>
      {/* Deck list */}
      {decks?.map((deck) => (
        <li
          key={deck.id}
          className="btn filter-broder bg-transparent hover:bg-transparent"
        >
          <Link
            to={`/mydecks/?topic=${deck.topic}`}
            onClick={toggleNavbar}
            className="mr-auto min-w-[190px] group hover:scale-100 bg-transparent border-transparent hover:border-transparent"
          >
            {deck.topic}
          </Link>
          <DeleteDeckModal
            deckId={deck.id}
            deckTopic={deck.topic}
            switchtheme={theme}
            isOpen={isOpen}
          />
        </li>
      ))}
    </>
  );
}
