import React, { useState } from "react";
import Card from "./Card";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getAllCard, getPartialFlashcards } from "../api/CardAPI";
import CardBack from "./CardBack";
import { Link, useSearchParams } from "react-router-dom";

function CardList() {
  const [query, setQuery] = useState("")
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: cards, isLoading } = useQuery({

    queryKey: [queryKey.FLASHCARD, searchParams.toString()],
    queryFn: () => getPartialFlashcards(searchParams.toString()),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState(0);

  const handleOpen = (id: number) => {
    setIsOpen(true);
    setCurrentId(id);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  if (isLoading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="loading loading-dots loading-8xl"></div>
    </div>
  );

  return (
    <>
      <div className="flex flex-wrap gap-4 px-10 mt-10">
        <input
          type="text"
          id="search-card"
          placeholder="search card here..."
          className="w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg leading-6 sm:w-[350px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="flex sm:ml-auto w-full sm:w-auto gap-4">
          <Link to="/studynow" className="w-1/2">
            <span className="btn bg-indigo-600 hover:bg-indigo-500 w-full px-10 whitespace-nowrap">
              Study Now
            </span>
          </Link>
          <button
            onClick={() => handleOpen(0)}
            className="w-1/2 btn bg-indigo-600 hover:bg-indigo-500 px-10"
          >
            New Card
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-4">
        {cards &&
          cards.filter((oneCard) => oneCard.vocabulary.includes(query)).map((oneCard) => (
            <button
              className="cursor-pointer"
              onClick={() => {
                handleOpen(oneCard.id);
              }}
              key={oneCard.id}
            >
              <div>
                <Card
                  id={oneCard.id}
                  vocabulary={oneCard.vocabulary}
                  topic={oneCard.topic}
                  dueDate={oneCard.dueDate}
                />
              </div>
            </button>
          ))}

      </div>
      {isOpen && (
        <div className="overflow-auto fixed inset-0  bg-slate-300/10 backdrop-blur-sm flex justify-center items-center z-10">
          <div className="overflow-scroll bg-base-100 shadow-2xl shadow-indigo-500/100 text-white p-4 rounded max-w-full max-h-full">
            <CardBack childClose={() => handleClose()} id={currentId} />
          </div>
        </div>
      )}
    </>
  );
}

export default CardList;
