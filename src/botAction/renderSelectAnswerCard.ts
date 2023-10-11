import { TurnContext, CardFactory } from "botbuilder";
import {
  TextBlock,
  InputText,
  Conversation,
  CardTemplate,
  RichTextBlock,
  TextRun,
} from "./types";
import { BOTCHAT, USERANSWER } from "./constants";
import { ChatHistory } from "../api/types/chat";
export const renderSelectAnswerCard = async (
  context: TurnContext,
  conversationObj: Conversation
) => {
  // Prepare the base structure of your Adaptive Card
  const cardTemplate: CardTemplate = {
    type: "AdaptiveCard",
    version: "1.4",
    $schema: "http://adaptivecards.io/schemas/adaptive-card.json",
    body: [
      {
        type: "TextBlock",
        size: "medium",
        weight: "bolder",
        text: conversationObj.question, // Replacing "${conversation.question}"
      },
      {
        type: "ChoiceSet",
        id: "answer",
        style: "expanded",
        isMultiSelect: false,
        value: "1",
        choices: [
          {
            title: "1",
            value: "1",
          },
          {
            title: "2",
            value: "2",
          },
        ],
      },

      // Add an empty TextBlock that will be filled dynamically below
    ],
    actions: [
      {
        type: "Action.ShowCard",
        title: "Reply to Bot",
        card: {
          type: "AdaptiveCard",
          body: [
            {
              type: "TextBlock",
              text: "Please reply to the bot:",
              wrap: true,
            },
            {
              type: "Input.Text",
              id: "userInput",
              placeholder: "Type your reply here",
              inlineAction: {
                type: "Action.Execute",
                verb: "botReply",
                iconUrl: "https://adaptivecards.io/content/send.png",
                tooltip: "Send",
              },
            },
          ],
        },
      },
    ],
  };
  console.log(cardTemplate);
  await context.sendActivity({
    attachments: [CardFactory.adaptiveCard(cardTemplate)],
  });
};
