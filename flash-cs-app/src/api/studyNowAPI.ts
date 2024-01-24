import { Quiz } from "../types/quiz"
import { baseURL, fetchJson } from "./utilsAPI"

export const getStudyNowCardAPI = async () => {
    const result = await fetchJson<Quiz[]>(`${baseURL}/studyNow`, {}, true)
    return result[0]
}

export const updateStudyNowCardAPI = async ({ cardId, performance }: { cardId: number, performance: string }) => {
    const result = await fetchJson(`${baseURL}/studyNow/updateDueDate`,
        {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ cardId, performance })
        },
        true)
    return result
}