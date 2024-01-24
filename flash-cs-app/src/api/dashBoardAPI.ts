import { getCorrectPercentage, getDailyTarget, revisionWords } from "../types/dashboard"
import { baseURL, fetchJson } from "./utilsAPI"

export const getRevisionVocabularyAPI = async () => {
    const result = await fetchJson<revisionWords[]>(
        `${baseURL}/dashboard/countRevisionWord`,
        {},
        true
    )
    return result
}

export const getDailyTargetAPI = async () => {
    const result = await fetchJson<getDailyTarget>(
        `${baseURL}/dashboard/getDailyTarget`,
        {},
        true
    )
    return result
}

export const getCorrectPercentageAPI = async () => {
    const result = await fetchJson<getCorrectPercentage[]>(
        `${baseURL}/dashboard/countCorrectPercentage`,
        {},
        true
    )
    return result
}
