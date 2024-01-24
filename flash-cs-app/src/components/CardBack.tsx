import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteSpecificCard,
  getAllDeck,
  getSpecificCard,
  postCardBack,
  updateCardBack,
} from "../api/CardAPI";
import { queryKey } from "../api/utilsAPI";
import ReactDOM from "react-dom";

interface CardBack {
  childClose: () => void;
  id?: number;
  vocabulary?: string;
  meaning?: string;
}

function CardBack(props: Readonly<CardBack>) {
  const queryClients = useQueryClient();
  const param = useParams<{ itemId: string }>();
  const [preview, setPreview] = useState<string>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const { data: defaultData, isLoading: isDefaultDataLoading } = useQuery({
    queryKey: [queryKey.FLASHCARD, props.id],
    queryFn: async () => {
      if (props.id && props.id > 0) {
        return await getSpecificCard(props.id!);
      } else {
        return null;
      }
    },
  });

  const createdCard = useMutation({
    mutationFn: (inputData: FormData) =>
      props.id ? updateCardBack(inputData, props.id) : postCardBack(inputData),
    onSuccess: () => {
      queryClients.invalidateQueries({
        queryKey: [queryKey.FLASHCARD],
      });
      props.childClose();
    },
  });

  const deleteCard = useMutation({
    mutationFn: () => deleteSpecificCard(props.id!),
    onSuccess: () => {
      queryClients.invalidateQueries({
        queryKey: [queryKey.FLASHCARD],
      });
      props.childClose();
    },
  });

  const { data: decks, isLoading: isDataLoading } = useQuery({
    queryKey: [queryKey.DECK],
    queryFn: getAllDeck,
  });

  const selectedFile = watch("image");
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = window.URL.createObjectURL(
      new Blob(selectedFile, { type: "application/zip" })
    );
    setPreview(objectUrl);

    return () => window.URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  if (isDefaultDataLoading || isDataLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <form
        onSubmit={handleSubmit((data) => {
          const formData = new FormData();

          formData.append("vocabulary", data.vocabulary);
          formData.append("deckId", data.deckId);
          formData.append("notes", data.notes);

          if (data.image) {
            formData.append("image", data.image[0]);
          }

          formData.append("question", data.question);
          formData.append("answer", data.answer);
          if (props.id)
            formData.append(
              "isImageDeleted",
              (
                !defaultData?.image &&
                (!selectedFile || selectedFile.length === 0)
              ).toString()
            );
          createdCard.mutate(formData);
        })}
      >
        <div className="py-4 px-4 block border-b border-white/10 pb-2">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="vocabulary"
                className="block text-md font-medium leading-6 text-white"
              >
                Vocabulary
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="vocabulary"
                  placeholder="Enter a vocabulary"
                  defaultValue={
                    (defaultData ? defaultData.vocabulary : "") ||
                    props.vocabulary
                  }
                  {...register("vocabulary", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.vocabulary && (
                  <span style={{ color: "red" }}>
                    Please enter a vocabulary
                  </span>
                )}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="deckId"
                className="block text-md font-medium leading-6 text-white"
              >
                Deck
              </label>
              <div className="mt-2">
                <select
                  id="deckId"
                  placeholder="Choose a deck"
                  defaultValue={
                    defaultData?.deckFlashcards[0]?.deck.id ?? undefined
                  }
                  {...register("deckId", { required: true })}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled selected>
                    Choose a deck
                  </option>
                  {decks &&
                    decks.map((deck) => (
                      <option key={deck.id} value={deck.id}>
                        {deck.topic}
                      </option>
                    ))}
                </select>
                {errors.deck && (
                  <span style={{ color: "red" }}>Please choose a deck</span>
                )}
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="notes"
                className="block text-md font-medium leading-6 text-white"
              >
                Notes
              </label>
              <div className="mt-2 flex ">
                <textarea
                  id="notes"
                  placeholder="Enter your notes here"
                  defaultValue={
                    (defaultData ? defaultData.notes : "") || props.meaning
                  }
                  {...register("notes")}
                  className="min-h-[220px] w-full block rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="cover-photo"
                className="block text-md font-medium leading-6 text-white mb-2"
              >
                Photo
              </label>
              <div
                className={`relative photo-border max-w-[320px] max-h-[250px] flex justify-center rounded-lg border border-dashed border-white/50 ${
                  (!selectedFile || selectedFile.length === 0) &&
                  defaultData?.image == null &&
                  ("p-10" || "")
                }`}
              >
                <div className="text-center">
                  {(!selectedFile || selectedFile.length === 0) &&
                    defaultData?.image == null && (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  <div className="p-2 mt-0 flex flex-col text-md leading-6 text-white">
                    {(!selectedFile || selectedFile.length === 0) &&
                      props.id !== 0 &&
                      defaultData?.image !== null && (
                        <img
                          src={`https://image.lhydm.me/${defaultData?.image}`}
                        />
                      )}
                    {selectedFile?.length > 0 && <img src={preview} />}
                    {(!selectedFile || selectedFile.length === 0) &&
                      defaultData?.image == null && (
                        <>
                          <label
                            htmlFor="file-upload"
                            className="photo-text relative cursor-pointer whitespace-nowrap px-2 rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <p>Upload a file</p>
                            <input
                              id="file-upload"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              {...register("image")}
                            />
                          </label>
                          <p className="photo-text whitespace-nowrap">
                            or drag and drop
                          </p>
                        </>
                      )}
                  </div>
                  {(!selectedFile || selectedFile.length === 0) &&
                    defaultData?.image == null && (
                      <p className="photo-text text-xs leading-5 text-white">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    )}
                  {(selectedFile || defaultData?.image) && (
                    <button
                      type="button"
                      onClick={() => {
                        // setPreview(undefined);
                        if (defaultData?.image) defaultData.image = null;
                        setValue("image", undefined);
                      }}
                      className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-xl text-sm p-1 w-6 h-6 grid place-content-center"
                    >
                      X
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="question"
                className="block text-md font-medium leading-6 text-white"
              >
                Question
              </label>
              <div className="mt-2">
                <input
                  defaultValue={
                    (defaultData ? defaultData.question : "") ||
                    props.vocabulary
                  }
                  type="text"
                  id="question"
                  placeholder="Enter a question which you will be asked frequently"
                  {...register("question")}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="answer"
                className="block text-md font-medium leading-6 text-white"
              >
                Answer
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  id="answer"
                  placeholder="Enter your answer"
                  defaultValue={
                    (defaultData ? defaultData.answer : "") || props.meaning
                  }
                  {...register("answer")}
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex my-8 gap-6 justify-end">
            {!(props.id === 0) && (
              <button
                type="button"
                onClick={openModal}
                className="btn bg-red-600 hover:bg-red-500 w-24 mr-auto"
              >
                Delete
              </button>
            )}

            <button
              onClick={() => props.childClose()}
              className="btn bg-indigo-600 hover:bg-indigo-500 w-24"
            >
              Close
            </button>

            <button
              type="submit"
              className="btn bg-indigo-600 hover:bg-indigo-500 w-24"
            >
              Save
            </button>
          </div>
        </div>
      </form>
      {isModalOpen && (
        <dialog open className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Are you sure?</h3>
            <p className="py-4">
              Do you really want to delete this item? This process cannot be
              undone.
            </p>
            <div className="modal-action">
              <button className="btn" onClick={closeModal}>
                Cancel
              </button>
              <button
                className="btn bg-red-600 hover:bg-red-500"
                onClick={(event) => {
                  event.preventDefault();
                  deleteCard.mutate(undefined, {
                    onSuccess: () => {
                      closeModal();
                      props.childClose();
                    },
                  });
                }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}

export default CardBack;
