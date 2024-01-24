import React, { useState } from "react";
import ArticleModal from "./ArticleModal";
import ArticleCard from "../components/ArticleCard";
import ArticleList from "../components/ArticleList";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getAllArticleCard, postGPTArticle } from "../api/articleAPI";
import { Link, useNavigate } from "react-router-dom";

function Article() {
  const [getValue, setGetValue] = useState("");
  const queryClients = useQueryClient();
  const { data: cards, isLoading } = useQuery({
    queryKey: [queryKey.ARTICLE],
    queryFn: getAllArticleCard,
  });
  const navigate = useNavigate();
  const postAIArticle = useMutation({
    mutationFn: postGPTArticle,
    onSuccess: (data) => {
      queryClients.invalidateQueries({
        queryKey: [queryKey.ARTICLE],
      });
      navigate("/exercise/" + data.id);
    },
    // onMutate: () => {}
  });

  if (postAIArticle.isPending) 
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    )

  return (
    <div className="px-10 mt-10 mb-5">
      <div className="flex flex-wrap px-8 mt-10 gap-4">
        <input
          onChange={(e) => setGetValue(e.target.value)}
          type="text"
          id="search-card"
          placeholder="Enter keywords here..."
          className="w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-lg leading-6 sm:w-[350px]"
        />

        <button
          onClick={() => {
            postAIArticle.mutate(getValue);
          }}
          className="new-card-button btn flex w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 px-4 py-2 sm:px-10 sm:py-2 gap-4 justify-center items-center"
        >
          <Link to="/exercise" className="text-white">
            Generate
          </Link>
        </button>

        {/* <button
          onClick={() => true}
          className="my-article-button btn flex text-base bg-indigo-600 hover:bg-indigo-500 ml-auto px-20 sm:w-auto w-full gap-4"
        >
          My Article
        </button> */}
      </div>
      <div className="instruction px-8 my-5">
        <p className="mb-2">
          - Enter keywords to generate a topic of your choice, read through and
          try to comprehend the article, answer the questions can help you
          improve reading skill.
        </p>
        {/* <p>
          - After all answers are submitted, you can hightlight any word to look
          up in dictionary and add the vocabulary to your flash card collection.
        </p> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {cards &&
          cards.map((oneCard) => (
            <button
              className="cursor-pointer"
              key={oneCard.id}
              onClick={() => navigate(`/exercise/${oneCard.id}`)}
            >
              <div className="">
                <ArticleCard
                  theme={oneCard.articleTheme}
                  level={oneCard.articleLevel}
                  creator={oneCard.creator}
                  createdAt={oneCard.createdAt}
                />
              </div>
            </button>
          ))}
        {/* <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} />
          <ArticleCard id={0} vocabulary={""} deckFlashcards={[]} /> */}
      </div>
    </div>
  );
}

export default Article;
