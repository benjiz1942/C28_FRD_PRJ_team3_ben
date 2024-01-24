import React, { useState, useEffect } from "react";
import { baseURL } from "../api/utilsAPI";
import CardBack from "../components/CardBack";
import { useAppSelector } from "../store";
import { Link } from "react-router-dom";

// Define the shape of the word of the day data
export interface WordData {
  word: string;
  meaning: string;
}

function Home() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [currentDate, setCurrentDate] = useState("");
  const [wordOfTheDay, setWordOfTheDay] = useState<WordData>({
    word: "",
    meaning: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  // State to hold the current cardId
  // const [currentCardId, setCurrentCardId] = useState<number | null>(null);

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    // Function to update the current date
    const updateDate = () => {
      const now = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      } as Intl.DateTimeFormatOptions;
      const formattedDate = now.toLocaleDateString(undefined, options);
      setCurrentDate(formattedDate);
    };

    // Fetch the word of the day from the backend
    const fetchWordOfTheDay = async () => {
      try {
        const response = await fetch(`${baseURL}/dailyWord`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the JSON response and declare data with the WordData type
        const data: WordData = await response.json();

        // Update the state with the fetched data
        setWordOfTheDay({
          word: data.word,
          meaning: data.meaning,
        });
      } catch (error) {
        console.error("Error fetching the word of the day:", error);
      }
    };

    // Call the functions to update date and fetch the word of the day
    updateDate();
    fetchWordOfTheDay();

    // Update the date every second (if needed)
    const interval = setInterval(updateDate, 1000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`overflow-auto px-4`}>
      <div
        className={`title font-mono text-4xl flex justify-center py-10`}
        style={{
          animation: "slideInFromTop 1s ease-out forwards",
        }}
      >
        <h1 className="space-nowrap">Word of the Day</h1>
      </div>

      <div
        className={`mt-5 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1 mx-auto max-w-[800px]`}
        style={{
          animation: "borderFadeIn 3s ease-in-out forwards",
        }}
      >
        <div className="bg-base-100 p-8">
          <div className="body font-mono flex justify-center">
            <h1>{currentDate}</h1>
          </div>
          <div className="divider w-[100px] h-px bg-gray-300 my-2 mx-auto mt-6"></div>
          <div className="word capitalize hover:uppercase flex justify-center text-4xl mt-10">
            <h2>{wordOfTheDay.word}</h2>
          </div>
          <div className="def flex text-center text-base mt-10">
            <h2>{wordOfTheDay.meaning}</h2>
          </div>
          <div className="flex justify-center mt-10">
            {isAuthenticated && (
              <button
                onClick={() => setIsOpen(true)}
                className="group flex w-auto justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <span className="inline-block group-hover:rotate-90 transition-transform duration-900 ease-in-out mr-2">
                  +
                </span>
                Add to new flash card
              </button>
            )}
          </div>
        </div>
      </div>

      <div
        className={`border-2 border-white/0 mx-auto mt-10 max-w-[500px]`}
        style={{
          animation: "borderFadeIn 5s ease-in-out forwards",
        }}
      >
        <div className="footer flex flex-col justify-center items-center sm:items-start text-4xl mt-5 mb-10">
          <div className="words-buttons-container flex flex-wrap flex-col sm:flex-row justify-center sm:justify-between">
            <h3 className="flex sm:max-w-none font-mono text-center sm:mb-5 text-xl sm:text-4xl">
              Learn a new word every day. Manage your flash card collection!
            </h3>
            {/* <div className="buttons flex flex-wrap justify-center sm:justify-start pl-0 sm:pl-20">
              {!isAuthenticated && (
                <Link to="/signup">
                  <button className="w-36 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Signup
                  </button>
                </Link>
              )}
              {!isAuthenticated && (
                <Link to="/login">
                  <button className="ml-6 w-36 flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-0">
                    Login
                  </button>
                </Link>
              )}
            </div> */}
          </div>
        </div>
      </div>

      <div className={`mx-auto mt-0 max-w-[800px] daily-tip-container`}>
        <h2 className="text-xl sm:text-4xl font-mono mb-4 text-center flex-nowrap">
          FLASH CS helps your memory based on forgetting curve theory
        </h2>
      </div>
      {/* <div className={`mx-auto mt-10 daily-tip-content-container text-2xl text-center`}>
        <li>Practice without looking</li>
        <li>Make it a daily habit</li>
        <li>Tailor your flashcard deck</li>
        <li>Organize flashcards into categories</li>
      </div> */}
      {/* <div className={`mx-auto mt-10 daily-tip-content-container text-2xl text-center`}>
        <li>Practice without looking</li>
        <li>Make it a daily habit</li>
        <li>Tailor your flashcard deck</li>
        <li>Organize flashcards into categories</li>
      </div> */}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-slate-300/10 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-base-100 shadow-2xl shadow-indigo-500/100 text-white p-4 rounded">
            <CardBack
              childClose={() => handleClose()}
              id={0}
              vocabulary={wordOfTheDay.word}
              meaning={wordOfTheDay.meaning}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
