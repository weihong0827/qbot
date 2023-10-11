import { TurnContext } from "botbuilder";
import { AddQuestionParams } from "../api/chat/chat";
import { ChatHistory, ChatQuestion } from "../api/types/chat";
import { getContextBrain, getContextChat } from "./getContext";
import { useChatApi } from "../api/chat/useChatApi";

const { addQuestion, getHistory } = useChatApi();

export const questionFlow = async (
  txt: string,
  context: TurnContext
): Promise<ChatHistory[]> => {
  try {
    const brainId = await getContextBrain(context);
    const chatId = await getContextChat(brainId, context);
    const chatQuestion: ChatQuestion = {
      model: "gpt-3.5-turbo-0613",
      question: txt,
      temperature: 0,
      max_tokens: 256,
    };
    const question: AddQuestionParams = {
      chatId,
      brainId,
      chatQuestion,
    };
    const ans = await addQuestion(question);
    console.log(ans);
    const hist: ChatHistory[] = await getHistory(chatId);

    return hist;
  } catch (error) {
    console.log(error);
    await context.sendActivity("There is a error. Please try again. ");
  }
};
