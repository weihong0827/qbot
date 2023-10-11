import { TeamsInfo, TurnContext } from "botbuilder";
import { useChatApi } from "../api/chat/useChatApi";
import { useBrainApi } from "../api/brain/useBrainApi";
import { Brain } from "../api/types/brain";
import { CreateChatConvLink } from "../api/types/chat";
import { Conversation } from "../botAction/types";

const { getChannelBrains } = useBrainApi();

const { getChatWithConv } = useChatApi();

const getContextBrain = async (context: TurnContext) => {
  var channels = await TeamsInfo.getTeamChannels(context);
  var brain: Brain;
  for (var channel of channels) {
    if (channel.id === context.activity.channelData.channel.id) {
      if (channel.name === undefined) {
        channel.name = "General";
      }
      brain = await getChannelBrains(channel.id, channel.name);
    }
  }
  return brain.id;
};

const getContextChat = async (
  brain_id: string,
  context: TurnContext
): Promise<string> => {
  const convLink: CreateChatConvLink = {
    brain_id: brain_id,
    conversation_id: context.activity.conversation.id,
    name: context.activity.conversation.id,
  };

  const chat = await getChatWithConv(convLink);
  return chat.chat_id;
};
export { getContextBrain, getContextChat };
