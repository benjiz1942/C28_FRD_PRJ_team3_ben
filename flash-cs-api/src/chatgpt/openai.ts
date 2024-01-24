import OpenAI from 'openai';

export type Messages = OpenAI.Chat.Completions.ChatCompletionMessageParam[];

export const openAi = new OpenAI({
  apiKey: process.env.CHAT_GPT_TOKEN,
  baseURL: 'https://api.gpt.tecky.ai/v1',
});
