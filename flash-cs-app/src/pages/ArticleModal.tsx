import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { getSpecificArticleCard, postArticleAnswer } from "../api/articleAPI";
import { queryKey } from "../api/utilsAPI";
import { useNavigate, useParams } from "react-router-dom";

// function ArticleModal({ isOpen, onClose }: ArticleModalProps) {
//   if (!isOpen) return null;
function ArticleModal() {
  const queryClients = useQueryClient();
  const navigate = useNavigate();
  const param = useParams<{ itemId: string }>();
  const [answer0, setAnswer0] = useState(4);
  const [answer1, setAnswer1] = useState(4);
  const [answer2, setAnswer2] = useState(4);
  const { data } = useQuery({
    queryKey: [queryKey.ARTICLE, param.itemId],
    queryFn: async () => {
      return await getSpecificArticleCard(param.itemId!);
    },
  });
  const postAnswer = useMutation({
    mutationFn: (answer: number[]) => postArticleAnswer(answer, param.itemId!),
    onSuccess: () => {
      queryClients.invalidateQueries({
        queryKey: [queryKey.ARTICLE, param.itemId!],
      });
    },
  });

  return (
    <div>
      <div className="keyword px-10 p-5 mx-5 mt-10 gap-4 text-4xl capitalize border-b-2 border-gray-100/40 rounded-lg">
        {data?.articleTheme}
      </div>
      <div className="article border-b-2 rounded-lg border-gray-100/40 p-5 my-10 mx-5 text-lg overflow-hidden leading-8">
        {data?.content.split("\n").map((paragraph, idx) => <p key={`p_${idx}`} className="mb-2">{paragraph}</p>)}
      </div>
      <div className="question px-10 mt-10 text-4xl border-b-2 border-gray-100/40 rounded-lg p-5 mx-5">
        <p>Questions</p>
      </div>
      <div className="space-y-6 mt-10 px-10">
        {/* Question 1 */}
        <div className="question border-b-1 rounded-lg">
          <p className="text-2xl font-semibold mb-4">
            Question 1: {data?.exercises?.[0].question}
          </p>
          {postAnswer.data && postAnswer.data?.[0].includes("true") && (
            <p className="text-2xl font-semibold  text-green-400 mb-4">
              {postAnswer.data[0]}
            </p>
          )}
          {postAnswer.data && postAnswer.data?.[0].includes("wrong") && (
            <p className="text-2xl font-semibold  text-rose-600 mb-4">
              {postAnswer.data[0]}
            </p>
          )}
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                onChange={() => setAnswer0(0)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">A. {data?.exercises?.[0].option0}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                onChange={() => setAnswer0(1)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">B. {data?.exercises?.[0].option1}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                onChange={() => setAnswer0(2)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">C. {data?.exercises?.[0].option2}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                onChange={() => setAnswer0(3)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">D. {data?.exercises?.[0].option3}</span>
            </label>
          </div>
        </div>

        {/* Question 2 */}
        <div className="question">
          <p className="text-2xl font-semibold mb-4">
            Question 2: {data?.exercises?.[1].question}
          </p>
          {postAnswer.data && postAnswer.data?.[1].includes("true") && (
            <p className="text-2xl font-semibold  text-green-400 mb-4">
              {postAnswer.data[1]}
            </p>
          )}
          {postAnswer.data && postAnswer.data?.[1].includes("wrong") && (
            <p className="text-2xl font-semibold  text-rose-600 mb-4">
              {postAnswer.data[1]}
            </p>
          )}
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                onChange={() => setAnswer1(0)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">A. {data?.exercises?.[1].option0}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                onChange={() => setAnswer1(1)}
                disabled={postAnswer.data ? true : false}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">B. {data?.exercises?.[1].option1}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                onChange={() => setAnswer1(2)}
                disabled={postAnswer.data ? true : false}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">C. {data?.exercises?.[1].option2}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                onChange={() => setAnswer1(3)}
                disabled={postAnswer.data ? true : false}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">D. {data?.exercises?.[1].option3}</span>
            </label>
          </div>
        </div>

        {/* Question 3 */}
        <div className="question">
          <p className="text-2xl font-semibold mb-4">
            Question 3: {data?.exercises?.[2].question}
          </p>
          {postAnswer.data && postAnswer.data?.[2].includes("true") && (
            <p className="text-2xl font-semibold  text-green-400 mb-4">
              {postAnswer.data[2]}
            </p>
          )}
          {postAnswer.data && postAnswer.data?.[2].includes("wrong") && (
            <p className="text-2xl font-semibold  text-rose-600 mb-4">
              {postAnswer.data[2]}
            </p>
          )}
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                onChange={() => setAnswer2(0)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">A. {data?.exercises?.[2].option0}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                onChange={() => setAnswer2(1)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">B. {data?.exercises?.[2].option1}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                onChange={() => setAnswer2(2)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">C. {data?.exercises?.[2].option2}</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                onChange={() => setAnswer2(3)}
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">D. {data?.exercises?.[2].option3}</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        {postAnswer.data ? (
          <button
            onClick={() => navigate(`/article`)}
            className="new-card-button btn bg-indigo-600 hover:bg-indigo-500 px-10 py-2 w-auto my-6"
          >
            Back
          </button>
        ) : (
          <>
            <button
              onClick={() => {
                postAnswer.mutate([answer0, answer1, answer2]);
              }}
              className="new-card-button btn bg-indigo-600 hover:bg-indigo-500 px-10 py-2 w-auto my-6"
            >
              Submit
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ArticleModal;
