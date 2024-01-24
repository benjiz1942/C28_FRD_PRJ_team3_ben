import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { getAllCard } from "../api/CardAPI";
import { queryKey } from "../api/utilsAPI";
import moment from "moment";

interface ArticleCardProps {
  theme: string;
  level: string;
  creator: string;
  createdAt: Date;
}

function ArticleCard({
  theme,
  level,
  creator,
  createdAt,
}: Readonly<ArticleCardProps>) {
  const formattedDate = moment(createdAt).format("YYYY-MM-DD");
  return (
    <div className=" card text-lg h-72 text-primary-content border-y-[15px] border-indigo-500 bg-neutral-50 justify-center items-center m-3 hover:shadow-xl hover:shadow-indigo-500">
      <div className="leading-3"></div>
      <div>
        <h2 className="card-title font-semibold font-kalnia capitalize lg:text-3xl text-xl mt-5 mb-4 px-5">
          {theme}
          {/* Article Topic */}
        </h2>
      </div>
      <div>
        <h2 className="card-level capitalize font-semibold font-kalnia lg:text-xl text-xl text-justify my-3">
          {level}
          {/* Article Level */}
        </h2>
      </div>
      <div>
        <p className="font-mono bd-base-100 text-lg mb-3 py-4 flex-nowrap">
          Creator: {creator}
        </p>
        {/* Creator */}
      </div>
      <div>
        <p className="font-mono bd-base-100 text-lg">
          Created: {formattedDate}
        </p>
      </div>
    </div>
  );
}

export default ArticleCard;
