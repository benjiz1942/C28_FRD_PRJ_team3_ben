import { baseURL, fetchJson } from "./utilsAPI"

export const signupAPI = async (email: string, nickname: string, englishLevel: string, password: string) => {
    const result = await fetchJson(`${baseURL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nickname, englishLevel, password }),
    })
    return result
}