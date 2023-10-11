import { axiosInstance } from "../axios";
import { ChatConvLink, CreateChatConvLink } from "../types/chat";
import {
  addQuestion,
  AddQuestionParams,
  ChatUpdatableProperties,
  createChat,
  deleteChat,
  getChats,
  getHistory,
  updateChat,
  getChatWithConv,
  createChatWithConv
} from "./chat";

// TODO: split './chat.ts' into multiple files, per function for example
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useChatApi = () => {

  return {
    createChat: async (chatName: string) => createChat(chatName, axiosInstance),
    getChats: async () => getChats(axiosInstance),
    deleteChat: async (chatId: string) => deleteChat(chatId, axiosInstance),
    addQuestion: async (props: AddQuestionParams) =>
      addQuestion(props, axiosInstance),
    getHistory: async (chatId: string) => getHistory(chatId, axiosInstance),
    updateChat: async (chatId: string, props: ChatUpdatableProperties) =>
      updateChat(chatId, props, axiosInstance),
    getChatWithConv: async (conversationData: CreateChatConvLink) => {
      var chatConvLink: ChatConvLink
      try {
        chatConvLink = await getChatWithConv(conversationData.conversation_id, axiosInstance)
      } catch (error) {
        if (error.response.status === 404) {
          if (error.response.data.detail !== "No chat found for this conversation") {
            throw error
          }
          chatConvLink = await createChatWithConv(axiosInstance, conversationData)
        }
        else {
          throw error
        }
      }
      return chatConvLink
    }
  };
};
