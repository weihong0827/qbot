import { TurnContext, CardFactory } from "botbuilder";
import {
  TextBlock,
  InputText,
  Conversation,
  CardTemplate,
  RichTextBlock,
  TextRun,
  UserAnswer,
  ChoiceSet,
} from "./types";
import { ChatHistory } from "../api/types/chat";
import { BOTCHAT, USERANSWER } from "./constants";

const appendToRichTextBlock = (
  body: Array<TextBlock | RichTextBlock | InputText | ChoiceSet>,
  identifierText: string,
  newTextElements: TextRun[]
) => {
  const richTextBlock = body.find((item) => {
    if (item.type === "RichTextBlock") {
      const richTextItem = item as RichTextBlock;
      return richTextItem.inlines.some((inlineItem) =>
        inlineItem.text.includes(identifierText)
      );
    }
    return false;
  }) as RichTextBlock;

  if (richTextBlock) {
    newTextElements.forEach((textRun) => {
      richTextBlock.inlines.push(textRun);
    });
  }
};

const getChatTextRun = (chat: ChatHistory[]): TextRun[] => {
  const textRun: TextRun[] = [];
  console.log("chathistory", chat);
  chat.forEach((answer) => {
    textRun.push({
      type: "TextRun",
      text: answer.body.user_message + "\n",
    });
    textRun.push({
      type: "TextRun",
      text: answer.body.assistant + "\n",
      weight: "bolder",
    });
  });
  return textRun;
};

const getUserAnswerTextRun = (userAnswers: UserAnswer[]): TextRun[] => {
  const textRun: TextRun[] = [];
  userAnswers.forEach((answer) => {
    textRun.push({
      type: "TextRun",
      text: answer.user + ":" + answer.answer + "\n",
      color: "accent",
    });
  });
  return textRun;
};

export const renderUpdateCard = async (
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
        type: "RichTextBlock",
        inlines: [
          {
            type: "TextRun",
            text: BOTCHAT,
            weight: "bolder",
          },
        ],
      },

      {
        type: "RichTextBlock",
        inlines: [
          {
            type: "TextRun",
            text: USERANSWER,
            weight: "bolder",
          },
        ],
      },

      // Add an empty TextBlock that will be filled dynamically below
    ],
    actions: [
      {
        type: "Action.ShowCard",
        title: "Submit A Answer",
        card: {
          type: "AdaptiveCard",
          body: [
            {
              type: "Input.Text",
              id: "answerReply",
              placeholder: "Your answer",
              inlineAction: {
                type: "Action.Execute",
                verb: "answerReply",
                iconUrl: "https://adaptivecards.io/content/send.png",
                tooltip: "Send",
              },
            },
          ],
        },
      },
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

  if (conversationObj.userAnswers) {
    appendToRichTextBlock(
      cardTemplate.body,
      USERANSWER,
      getUserAnswerTextRun(conversationObj.userAnswers)
    );
  }

  if (conversationObj.chatHist) {
    appendToRichTextBlock(
      cardTemplate.body,
      BOTCHAT,
      getChatTextRun(conversationObj.chatHist)
    );
  }

  // Render the Adaptive Card
  await context.updateActivity({
    type: "message",
    id: context.activity.replyToId,
    attachments: [CardFactory.adaptiveCard(cardTemplate)],
  });
};
