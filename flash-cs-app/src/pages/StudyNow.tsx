import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { queryKey } from "../api/utilsAPI";
import { getStudyNowCardAPI, updateStudyNowCardAPI } from "../api/studyNowAPI";
import { Link } from "react-router-dom";

export default function StudyNow() {
  const [isShowQuestion, setIsShowQuestion] = useState(true);
  const [userAnswer, setUserAnswer] = useState("");
  const queryClient = useQueryClient();

  const {
    data: quiz,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [queryKey.STUDYNOW],
    queryFn: getStudyNowCardAPI,
  });

  const updateDueDate = useMutation({
    mutationFn: (variables: { cardId: number; performance: string }) =>
      updateStudyNowCardAPI(variables),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey.STUDYNOW] });
      setIsShowQuestion((isShowQuestion) => !isShowQuestion);
      setUserAnswer(() => "");
    },
  });

  if (isLoading || isFetching)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );

  if (error || !quiz)
    return (
      <div className="lg:mx-auto mt-20 text-center text-xl">
        <h1 className="text-4xl mb-10">WELL DONE!</h1>
        <p>All exercises for today are completed,</p>
        <p>Please come back on the next due date!</p>
        <div className="mt-10 flex flex-col items-center space-y-4">
          <Link
            to="/mydecks"
            className="btn bg-indigo-600 hover:bg-indigo-500 w-3/4 sm:w-auto sm:min-w-[300px] text-white py-2 px-4 rounded-md"
          >
            My Decks
          </Link>
          <Link
            to="/home"
            className="btn bg-indigo-600 hover:bg-indigo-500 w-3/4 sm:w-auto sm:min-w-[300px] text-white py-2 px-4 rounded-md"
          >
            Home
          </Link>
        </div>
      </div>
    );

  const handleClick = (data: { cardId: number; performance: string }) =>
    updateDueDate.mutate(data);

  return (
    <div className="studycard rounded-box mt-10 mx-4 sm:mx-8 md:mx-20 text-lg p-4 sm:p-6 md:p-8 text-primary-content border-y-[30px] border-indigo-500 bg-neutral-50">
      {isShowQuestion && (
        <>
          <div className="border-b-2 mb-10">
            <h2 className="card-title font-semibold font-kalnia text-3xl text-justify mb-10">
              Please answer the following questions:
            </h2>

            <div className="ml-4 mt-10 mb-8">
              <p>{quiz.question}</p>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="answer"
              className="block text-md font-medium leading-6 text-black ml-2"
            >
              Answer
            </label>
            <div className="mt-6">
              <input
                type="text"
                id="answer"
                placeholder="Enter your answer"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="btngroup gap-10 justify-between mt-[200px] flex flex-wrap sm:justify-start">
            <button
              className="new-card-button btn text-lg bg-indigo-600 hover:bg-indigo-500 w-auto px-10 mx-auto sm:ml-auto sm:mx-0"
              onClick={() => setIsShowQuestion(!isShowQuestion)}
            >
              Show answer
            </button>
          </div>
        </>
      )}

      {!isShowQuestion && (
        <>
          <h2 className="card-title font-semibold font-kalnia lg:text-3xl text-4xl text-justify ml-5 mb-2">
            {quiz.vocabulary.charAt(0).toUpperCase() + quiz.vocabulary.slice(1)}
          </h2>

          <div className="sm:col-span-4 mt-10 mb-10 pl-4">
            <div className="border-2 rounded-lg p-2 mb-4">
              ✏️ Your answer is: {userAnswer}
            </div>
            <div className="border-2 rounded-lg p-2 mb-4">
              {userAnswer.toLowerCase() === quiz.answer.toLowerCase() && (
                <p>
                  ⭕ Spot on, you got it right!
                </p>
              )}
              {userAnswer.toLowerCase() !== quiz.answer.toLowerCase() && (
                  <p>❌ Good try! The correct answer should be '{quiz.answer}'</p>
              )}
            </div>
            <div className="border-2 rounded-lg p-2 mb-4">
              🗒️ Note: {quiz.notes}
            </div>
            <div className="border-2 rounded-lg p-2 max-w-lg">
              🏞️ Photo:
              {quiz.image && (
                <img
                  src={`http://flashcs-uploader.s3-website-ap-southeast-1.amazonaws.com/${quiz.image}`}
                />
              )}
            </div>
          </div>

          <div className="btngroup sm:gap-0 ml-4 flex flex-col sm:flex-row">
            <button
              className="new-card-button btn bg-red-600 hover:bg-red-500 w-full sm:w-auto px-10 mr-6 mb-4 sm:mb-0"
              onClick={() =>
                handleClick({ cardId: quiz.id, performance: "Again" })
              }
            >
              <span className=" text-white text-lg">Try Later</span>
            </button>

            <button
              className="new-card-button btn bg-orange-600 hover:bg-orange-500 w-full sm:w-auto px-10 mr-6 mb-4 sm:mb-0"
              onClick={() =>
                handleClick({ cardId: quiz.id, performance: "Hard" })
              }
            >
              <span className=" text-white text-lg">Hard</span>
            </button>

            <button
              className="new-card-button btn bg-sky-600 hover:bg-sky-500 w-full sm:w-auto px-10"
              onClick={() =>
                handleClick({ cardId: quiz.id, performance: "Good" })
              }
            >
              <span className=" text-white text-lg">Good</span>
            </button>
          </div>

          <div className="instruction text-sm mt-4 ml-4">
            Got it wrong? Tap
            <span className="text-red-500">"Try Later"</span>. Weren't sure? That's
            <span className="text-orange-400">"Hard"</span>. Easy peasy? Go for
            <span className="text-sky-400">"Good"</span>.
          </div>
        </>
      )}
    </div>
  );
}
