import { baseURL, fetchJson } from "./utilsAPI";


export const loginAPI = async (email: string, password: string) => {
    const result = await fetchJson<{ access_token: string }>(`${baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    return result.access_token
}