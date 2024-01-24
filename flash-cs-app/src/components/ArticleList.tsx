import React from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { getAllArticleCard } from "../api/articleAPI";
import ArticleCard from "./ArticleCard";
import { Link } from "react-router-dom";

function ArticleList() {
  const { data: cards, isLoading } = useQuery({
    queryKey: [queryKey.ARTICLE],
    queryFn: getAllArticleCard
  });

        // Ready for use when backend is setup.
    // const [searchParams, setSearchParams] = useSearchParams();
  // const { data: cards, isLoading } = useQuery({
  //   queryKey: [queryKey.ARTICLECARD, searchParams.toString()],
  //   queryFn: () => getAllArticleCard(searchParams.toString()),
  // });


  // if (isLoading) return null;

  return (
    <>
      <div>
        {cards &&
          cards.map((oneCard) => (
            <Link to={`/exercise/${oneCard.id}`}
              className="cursor-pointer"
              key={oneCard.id}
            >
              <ArticleCard
                theme={oneCard.articleTheme}
                level={oneCard.articleLevel}
                creator={oneCard.creator}
                createdAt={oneCard.createdAt}
              />
            </Link>
          ))}
      </div>
    </>
  );
}

export default ArticleList;