export const queryKey = Object.freeze({
  FLASHCARD: "flashcard",
  DECK: "deck",
  ARTICLE: "article",
  STUDYNOW: "studyNow",
  DASHBOARDREVISION: "dashboardrevision",
  DASHBOARDEXERCISES: "dashboardexercises",
  TARGET: "target",
  USERINFO: "userInfo",
});

export const baseURL =
  process.env.REACT_APP_API_SERVER ?? "https://localhost:8080";

export const fetchJson = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined,
  requiredAuth: boolean = false
) => {
  try {
    if (requiredAuth) {
      const token = window.localStorage.getItem("token");
      init = typeof init === "undefined" ? {} : init;
      init =
        typeof init["headers"] === "undefined"
          ? { ...init, headers: {} }
          : init;
      init["headers"] = {
        ...init["headers"],
        Authorization: `Bearer ${token}`,
      };
    }
    const resp = await fetch(input, init);
    const data = await resp.json();
    if (resp.status >= 200 && resp.status < 300) return data as T;
    else throw new ApplicationError(data.message);
  } catch (err) {
    console.error((err as any).message);
    throw new ApplicationError((err as any).message || "unknown error");
  }
};

export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
