import {
  ArticleCard,
  ArticleCardContent,
  SpecificArticle,
} from "../types/article";
import { baseURL, fetchJson } from "./utilsAPI";

export const getAllArticleCard = async () => {
  const result = await fetchJson<ArticleCard[]>(`${baseURL}/article`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};

export const postGPTArticle = async (articleTheme: string) => {
  const result = await fetchJson<ArticleCardContent>(
    `${baseURL}/article/gptgen`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ articleTheme }),
    },
    true
  );
  return result;
};
export const getSpecificArticleCard = async (itemId: string) => {
  const result = await fetchJson<SpecificArticle>(
    `${baseURL}/article/specificArticle/${itemId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return result;
};
export const postArticleAnswer = async (answer: number[], itemId: string) => {
  const result = await fetchJson<Array<string>>(
    `${baseURL}/article/specificArticleAnswer/${itemId}`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ answer }),
    }
  );
  return result;
};
