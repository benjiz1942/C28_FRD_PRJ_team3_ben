import React, { useState } from "react";
import { getAllDeck, postDeck } from "../api/CardAPI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "../api/utilsAPI";
import { useTheme } from "../ThemeContext";

interface AddDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddDeckModal({ isOpen, onClose }: AddDeckModalProps) {
  const [deckName, setDeckName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();
  const addDeck = useMutation({
    mutationFn: getAllDeck,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [queryKey.DECK] }),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const result = await postDeck(deckName);
      addDeck.mutate();
      setDeckName('')
      onClose();
    } catch (err: any) {
      setErrorMessage(err.toString().split("Error: ").at(1));
    }
  };

const closeButton = () => {
  setDeckName('')
  onClose()
}

  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return <></>;

  return (
    <div className="fixed w-screen h-screen bg-slate-300/10 backdrop-blur-sm z-10 pointer-events-auto">
      <div className="fixed inset-0 overflow-auto bg-smoke-light flex">
        <div className="relative p-8 bg-base-100 shadow-2xl shadow-indigo-500/100 w-full max-w-md m-auto flex-col flex rounded-lg backdrop-brightness-[5]">
          <div className="flex justify-end ml-4 mb-4">
            <button
              className="mr-2 text-4xl lg:text-2xl focus:outline-none focus:border-none text-indigo-800 hover:text-indigo-500 transition duration-300 ease-in-out transform hover:scale-110"
              onClick={closeButton}
            >
              &#x2715;
            </button>
          </div>

          <div className="items-center">
            <div className="flex flex-row gap-4">
            <span
                        className={`${
                          theme === "light"
                            ? "adddeck-logo-light-fixed"
                            : theme === "light"
                            ? "logo-light"
                            : "logo-dark"
                        }`}
                      >
                <img src="/mydecks.png" alt="logo"></img>
              </span>
              <h1 className="mb-12 text-lg font-bold">
                Create a New Deck
              </h1>
            </div>
            <div className="mt-1 mb-6">
              <form
                className="flex flex-row items-center justify-between gap-2"
                onSubmit={handleSubmit}
              >
                {errorMessage && (
                  <div className="text-red-500 mb-4">{errorMessage}</div>
                )}
                <input
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  type="text"
                  className="text-black grow px-3 py-2 bg-white border shadow-sm border-gray-300 rounded-md focus:outline-none focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="Deck Name"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded focus:outline-none transition duration-300 ease-in-out transform hover:scale-110"
                >
                  <span className="lg:hidden">
                    <img className="invert" src="/confirm.png"></img>
                  </span>
                  <span className="hidden lg:inline-block">Create Deck</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDeckModal;
