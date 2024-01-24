import React from 'react'
import Article from './Article';

function Exercise() {

  return (
    <div>
      <div className="keyword px-10 mt-10 gap-4 text-4xl">Keyword</div>
      <div className="article px-10 mt-10 text-base overflow-hidden">
        <p>Article</p>
      </div>
      <div className="question px-10 mt-10 text-4xl">
        <p>Questions</p>
      </div>
      <form className="space-y-6 mt-10 px-10">
        {/* Question 1 */}
        <div className="question">
          <p className="text-2xl font-semibold mb-4">Question 1</p>
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                value="A"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer A</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                value="B"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer B</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                value="C"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer C</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question1"
                value="D"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer D</span>
            </label>
          </div>
        </div>

        {/* Question 2 */}
        <div className="question">
          <p className="text-2xl font-semibold mb-4">Question 2</p>
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                value="A"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer A</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                value="B"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer B</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                value="C"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer C</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question2"
                value="D"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer D</span>
            </label>
          </div>
        </div>

        {/* Question 3 */}
        <div className="question">
          <p className="text-2xl font-semibold mb-4">Question 3</p>
          <div className="options space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                value="A"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer A</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                value="B"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer B</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                value="C"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer C</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="question3"
                value="D"
                className="form-radio h-5 w-5"
              />
              <span className="ml-2">Answer D</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="submit">
          <button
            type="submit"
            className="new-card-button btn bg-indigo-600 hover:bg-indigo-500 px-10 py-2 w-auto mt-6"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Exercise