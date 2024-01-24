import { CardList, Deck, InCard, OutCard } from "../types/card";
import { baseURL, fetchJson } from "./utilsAPI";

/////////////////////////Used
export const postCardBack = async (form: FormData) => {
  const result = await fetchJson<OutCard[]>(
    `${baseURL}/flashcards/formSubmit`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: form,
    }
  );
  return result;
};
/////////////////////////
/////////////////////////Used
export const updateCardBack = async (form: FormData, itemId: number) => {
  const result = await fetchJson(`${baseURL}/flashcards/formSubmit/${itemId}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: form,
  });
  return result;
};
/////////////////////////
/////////////////////////Used
export const getSpecificCard = async (itemId: number) => {
  const resp = await fetchJson<InCard>(
    `${baseURL}/flashcards/specificCard/${itemId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }
  );
  return resp;
};
/////////////////////////
/////////////////////////Used
export const getAllCard = async () => {
  const result = await fetchJson<OutCard[]>(`${baseURL}/flashcards`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};
/////////////////////////
/////////////////////////Used
export const getPartialFlashcards = async (query: string) => {
  const result = await fetchJson<CardList[]>(
    `${baseURL}/flashcards/filter?` + query,
    {},
    true
  );
  return result;
};
/////////////////////////
/////////////////////////Used
export const deleteSpecificCard = async (itemId: number) => {
  const result = await fetchJson(`${baseURL}/flashcards/${itemId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};
/////////////////////////
/////////////////////////Used
export const getAllDeck = async () => {
  const result = await fetchJson<Deck[]>(`${baseURL}/decks`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  return result;
};

export const postDeck = async (topic: string) => {
  const result = await fetchJson(
    `${baseURL}/decks/addDeck`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ topic }),
    },
    true
  );
  return result;
};

export const deleteDeckAPI = async (deckId: number) => {
  const result = await fetchJson(
    `${baseURL}/decks/deleteDeck`,
    {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ deckId }),
    },
    true
  );
  return result;
};
