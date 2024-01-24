import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getAllCard } from "../api/CardAPI";
import { queryKey } from "../api/utilsAPI";
import moment from "moment";
import CardBack from "./CardBack";

interface CardProps {
  id: number;
  vocabulary: string;
  topic: string;
  dueDate: Date;
}

function Card({ vocabulary, dueDate, topic }: Readonly<CardProps>) {
  const formattedDate = moment(dueDate).format("YYYY-MM-DD");
  return (
    <div className="card text-lg sm:col-span-1 h-72 text-primary-content border-y-[15px] border-indigo-500 bg-neutral-50 justify-center items-center m-3 hover:shadow-xl hover:shadow-indigo-500 transition duration-300 ease-in-out transform hover:scale-90">
      <div className="leading-3"></div>
      <div>
        <h2 className="card-title font-semibold font-kalnia lg:text-3xl text-4xl text-justify mb-6">
          {vocabulary}
        </h2>
      </div>
      <div className="badge font-mono bd-base-100 text-lg mb-6 py-4 bg-indigo-600 hover:bg-indigo-500 w-24">
        {topic}
      </div>
      <div>
        Due Date:
        <p>{formattedDate}</p>
      </div>
    </div>
  );
}

export default Card;
