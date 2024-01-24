import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { Messages } from './openai';
import { Prompt } from './chatGPT.dto';

@Injectable()
export class ChatGPTService {
  private openAi: OpenAI;
  constructor() {
    this.openAi = new OpenAI({
      apiKey: process.env.CHAT_GPT_TOKEN,
      baseURL: 'https://api.gpt.tecky.ai/v1',
    });
  }

  async callChatGPT(prompt: Prompt) {
    try {
      const userRequest = await this.setMessageFormat(prompt);
      const messageArr: Messages = [{ role: 'user', content: userRequest }];
      const completion = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messageArr,
      });
      const res = completion.choices;

      return res[0].message.content;
    } catch (err) {
      throw err;
    }
  }

  async setMessageFormat(prompt: Prompt) {
    try {
      if (prompt.articleStatus) {
        prompt.articleStatus = false;
        let userRequest = `I am an English learner and my English level is ${prompt.articleLevel}. Please generate an article which is about ${prompt.articleTheme} in 300 words to train my reading skill. Please just show as below json format { "title":"","article":""}. Please use "\\n\\n" to separate paragraphs`;
        return userRequest;
      } else {
        let userRequest = `${prompt.articleContent}
        base on above article, please create 3 multiple choices questions with 4 options .Don't say any thing just have questions and answer. Please just show as below json format. No any header respon. No any option key(A/B/C/D).

[
{
"question": "",
"options": [ //All option just show the option
"",
"",
"",
""
],"answer":// array index of answer option
},
{
"question": "",
"options": [ //All option just show the option
"",
"",
"",
""
],"answer":// array index of answer option
},
{
"question": "",
"options": [ //All option just show the option
"",
"",
"",
""
],"answer":// array index of answer option
},
]
`;
        return userRequest;
      }
    } catch (err) {
      throw err;
    }
  }
}
