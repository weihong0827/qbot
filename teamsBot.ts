import {
  TeamsActivityHandler,
  CardFactory,
  TurnContext,
  AdaptiveCardInvokeValue,
  AdaptiveCardInvokeResponse,
  TeamsInfo,
  teamsGetChannelId,
} from "botbuilder";
import rawWelcomeCard from "./adaptiveCards/welcome.json";
import rawQuestionCard from "./adaptiveCards/question.json";
import { AdaptiveCards } from "@microsoft/adaptivecards-tools";
import { Conversation, QuestionDataInterface } from "./src/botAction/types";
import { renderSelectAnswerCard } from "./src/botAction/renderSelectAnswerCard";
import {
  submitQuestion,
  submitUserAnswers,
} from "./src/botAction/cardInvokeAction";

export class TeamsBot extends TeamsActivityHandler {
  // record the likeCount
  conversationObj: Conversation;

  constructor() {
    super();

    this.conversationObj = { question: "", userAnswers: [] };

    this.onMessageReaction(async (context, next) => {
      console.log("Running with Message Reaction Activity.");
      console.log(context.activity);
    });

    this.onMessage(async (context, next) => {
      console.log("Running with Message Activity.");

      let txt = context.activity.text;
      const removedMentionText = TurnContext.removeRecipientMention(
        context.activity
      );
      if (removedMentionText) {
        // Remove the line break
        txt = removedMentionText.toLowerCase().replace(/\n|\r/g, "").trim();
      }
      console.log(context.activity);

      const teaminfo = await TeamsInfo.getTeamDetails(context);
      // console.log(teaminfo);
      // console.log(context.activity);

      var memebers = await TeamsInfo.getTeamMember(
        context,
        context.activity.conversation.id,
        context.activity.from.id
      );

      // console.log(memebers);
      // console.log(context.activity.conversation.id);

      // console.log(await TeamsInfo.getPagedTeamMembers(context));

      // Trigger command by IM text

      switch (txt) {
        case "select answer": {
          await renderSelectAnswerCard(context, this.conversationObj);
        }
        default: {
          const card = AdaptiveCards.declare<QuestionDataInterface>(
            rawQuestionCard
          ).render({
            conversationId: context.activity.conversation.id,
            conversation: this.conversationObj,
          });
          await context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card)],
          });
          break;
        }
      }
      // By calling next() you ensure that the next BotHandler is run.
      await next();
    });

    this.onMembersAdded(async (context, next) => {
      const membersAdded = context.activity.membersAdded;
      for (let cnt = 0; cnt < membersAdded.length; cnt++) {
        if (membersAdded[cnt].id) {
          const card =
            AdaptiveCards.declareWithoutData(rawWelcomeCard).render();
          await context.sendActivity({
            attachments: [CardFactory.adaptiveCard(card)],
          });
          break;
        }
      }
      await next();
    });
  }

  // Invoked when an action is taken on an Adaptive Card. The Adaptive Card sends an event to the Bot and this
  // method handles that event.
  async onAdaptiveCardInvoke(
    context: TurnContext,
    invokeValue: AdaptiveCardInvokeValue
  ): Promise<AdaptiveCardInvokeResponse> {
    // The verb "userlike" is sent from the Adaptive Card defined in adaptiveCards/learn.json
    switch (invokeValue.action.verb) {
      case "submitQuestion": {
        this.conversationObj.question = invokeValue.action.data
          .userInput as string;
        await submitQuestion(
          context,
          this.conversationObj,
          invokeValue.action.data.userInput as string
        );
        return { statusCode: 200, type: undefined, value: undefined };
      }
      case "botReply": {
        await submitQuestion(
          context,
          this.conversationObj,
          invokeValue.action.data.userInput as string
        );
        return { statusCode: 200, type: undefined, value: undefined };
      }
      case "answerReply": {
        await submitUserAnswers(context, this.conversationObj, invokeValue);
        return { statusCode: 200, type: undefined, value: undefined };
      }
    }
  }
}
