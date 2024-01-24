import { UserInfo } from "../types/userProfile";
import { baseURL, fetchJson } from "./utilsAPI";

export const getUserInfo = async () => {
  const result = await fetchJson<UserInfo>(`${baseURL}/user/target`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return result;
};

export const postUserInfo = async (
  englishLevel: string,
  dailyExercise: number,
  dailyWord: number
) => {
  const result = await fetchJson(
    `${baseURL}/user/target`,
    {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ englishLevel, dailyExercise, dailyWord }),
    },
    true
  );
  return result;
};
