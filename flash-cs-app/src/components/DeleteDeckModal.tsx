import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKey } from "../api/utilsAPI";
import { deleteDeckAPI, getAllDeck } from "../api/CardAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import ReactDOM from "react-dom";

type DeckProps = {
  deckId: number;
  deckTopic: string;
  switchtheme: string; // Or use a more specific type, like 'light' | 'dark'
  isOpen: boolean;
};

export default function DeleteDeckModal({
  deckId,
  deckTopic,
  switchtheme,
  isOpen,
}: DeckProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteDeck = useMutation({
    mutationFn: deleteDeckAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.DECK] });
      setIsModalOpen((isModalOpen) => !isModalOpen);
      if (location.search === `?topic=${deckTopic}`) navigate("/mydecks");
    },
  });

  const { theme, toggleTheme } = useTheme();

  const barBorderColor =
    theme === "light" ? "bar-border-light" : "bar-border-dark";

  const renderModal = () =>
    ReactDOM.createPortal(
      <dialog
        open
        className="modal p-5 fixed inset-0 z-10 overflow-y-auto bg-black bg-slate-300/10 backdrop-blur-sm"
      >
        <div className="modal-box min-w-[150px] bg-base-100 shadow-2xl shadow-indigo-500/100 m-auto p-10 flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
          <p>Do you really want to delete this deck?</p>
          <p>This process cannot be undone.</p>

          <div className="flex flex-col w-full">
            <button
              className="btn bg-indigo-600 hover:bg-indigo-500 my-4 transform hover:scale-105"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              className="btn bg-red-600 hover:bg-red-500 transform hover:scale-105"
              onClick={() => deleteDeck.mutate(deckId)}
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </dialog>,
      document.body
    );

  return (
    <>
      <button
        onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)}
        className="btn w-auto ml-auto bg-transparent border-transparent hover:bg-transparent hover:border-transparent"
      >
        <span className="inline-block hover:bg-red-500 p-1 rounded transition-colors duration-300 ease-in-out">
          <img
            src={"/delete.png"}
            alt="Delete"
            className={`w-5 h-5 ${
              switchtheme === "light" && isOpen
                ? "logo-light-fixed"
                : switchtheme === "light"
                ? "logo-light"
                : "logo-dark"
            }`}
          />
        </span>
      </button>

      {isModalOpen && renderModal()}
    </>
  );
}
