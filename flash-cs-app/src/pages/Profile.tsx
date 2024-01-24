import { useState } from "react";
import { queryKey } from "../api/utilsAPI";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, postUserInfo } from "../api/UserProfileAPI";
import { UserData } from "../types/userProfile";
import { useTheme } from "../ThemeContext";

function Profile() {
  const queryClients = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    queryKey: [queryKey.USERINFO],
    queryFn: getUserInfo,
  });
  const [englishLevel, setEnglishLevel] = useState(userData?.englishLevel);
  const [dailyExercise, setDailyExercise] = useState(
    Number(userData?.dailyExercise) || 0
  );
  const [dailyWord, setDailyWord] = useState(userData?.dailyWord);
  const createdUser = useMutation({
    mutationFn: (data: UserData) =>
      postUserInfo(data.englishLevel, data.dailyExercise, data.dailyWord),
    onSuccess: () => {
      queryClients.invalidateQueries({
        queryKey: [queryKey.USERINFO],
      });
    },
  });
  const { theme, toggleTheme } = useTheme();
  const englishLevelString = (userData?.englishLevel ?? "").toLowerCase();

  if (isLoading)
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="loading loading-dots loading-8xl"></div>
      </div>
    );
  return (
    <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className={`mx-auto h-20 w-auto ${
            theme === "light" ? "logo-light" : "logo-dark"
          }`}
          src="/boxlogo.png"
          alt="Logo"
        />
        <h2
          className={`mt-10 text-center text-2xl font-bold leading-9 tracking-tight`}
        >
          Hello {userData?.nickname} !
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="mt-[24px]">
          <label
            htmlFor="englishLevel"
            className="block text-sm font-medium leading-6 text-white"
          >
            Current English level
          </label>
          <div className="mt-2">
            <select
              id="englishLevel"
              name="englishLevel"
              required
              value={englishLevel}
              // defaultValue={"elementary"}
              // englishLevelString}
              onChange={(e) => setEnglishLevel(e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <option value="" selected disabled>
                Select your english level
              </option>
              <option value="elementary">Elementary</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="native">Native</option>
            </select>
          </div>
        </div>

        <div className="mt-[24px]">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Daily Target: Vocabulary
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="text"
              pattern="[0-9]"
              required
              value={dailyWord}
              defaultValue={userData?.dailyWord}
              onChange={(e) => setDailyWord(Number(e.target.value) || 0)}
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-[24px]">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-white"
          >
            Daily Target: Article Exercise
          </label>
          <div className="mt-2">
            <input
              id="dailyExercise"
              name="dailyExercise"
              type="text"
              pattern="\d*"
              required
              value={dailyExercise}
              defaultValue={userData?.dailyExercise}
              onChange={(e) => setDailyExercise(Number(e.target.value) || 0)}
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-[24px]">
          {createdUser.error && (
            <span className="text-red-500">
              Please filled in all the above fields.
            </span>
          )}

          {createdUser.isSuccess && (
            <span className="text-green-500">Save Successful !</span>
          )}
        </div>
        <div className="mt-2">
          <button
            type="submit"
            onClick={() => {
              createdUser.mutate({
                englishLevel: englishLevel ?? "",
                dailyExercise: dailyExercise ?? 0,
                dailyWord: dailyWord ?? 0,
              });
            }}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
