import { AdaptiveCardInvokeValue, TurnContext } from "botbuilder";
import { Conversation } from "./types";
import { questionFlow } from "../clientAction/questionFlow";
import { renderUpdateCard } from "./renderUpdateCard";

export const submitQuestion = async (
  context: TurnContext,
  conversationObj: Conversation,
  question: string
) => {
  conversationObj.chatHist = await questionFlow(question, context);
  await renderUpdateCard(context, conversationObj);
};

export const submitUserAnswers = async (
  context: TurnContext,
  conversationObj: Conversation,
  invokeValue: AdaptiveCardInvokeValue
) => {
  conversationObj.userAnswers.push({
    user: context.activity.from.name,
    answer: invokeValue.action.data.answerReply as string,
  });
  await renderUpdateCard(context, conversationObj);
};
