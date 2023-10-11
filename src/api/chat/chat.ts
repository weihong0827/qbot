import { AxiosInstance } from "axios";

import { ChatConvLink, ChatEntity, ChatHistory, ChatQuestion, CreateChatConvLink } from "../types/chat";

export const createChat = async (
  name: string,
  axiosInstance: AxiosInstance
): Promise<ChatEntity> => {
  const createdChat = (
    await axiosInstance.post<ChatEntity>("/chat", { name: name })
  ).data;

  return createdChat;
};

export const getChats = async (
  axiosInstance: AxiosInstance
): Promise<ChatEntity[]> => {
  const response = await axiosInstance.get<{
    chats: ChatEntity[];
  }>(`/chat`);

  return response.data.chats;
};

export const deleteChat = async (
  chatId: string,
  axiosInstance: AxiosInstance
): Promise<void> => {
  await axiosInstance.delete(`/chat/${chatId}`);
};

export type AddQuestionParams = {
  chatId: string;
  chatQuestion: ChatQuestion;
  brainId: string;
};

export const addQuestion = async (
  { chatId, chatQuestion, brainId }: AddQuestionParams,
  axiosInstance: AxiosInstance
): Promise<ChatHistory> => {
  const response = await axiosInstance.post<ChatHistory>(
    `/chat/${chatId}/question?brain_id=${brainId}`,
    chatQuestion
  );

  return response.data;
};

export const getHistory = async (
  chatId: string,
  axiosInstance: AxiosInstance
): Promise<ChatHistory[]> =>
  (await axiosInstance.get<ChatHistory[]>(`/chat/${chatId}/history`)).data;

export type ChatUpdatableProperties = {
  chat_name?: string;
};
export const updateChat = async (
  chatId: string,
  chat: ChatUpdatableProperties,
  axiosInstance: AxiosInstance
): Promise<ChatEntity> => {
  return (await axiosInstance.put<ChatEntity>(`/chat/${chatId}/metadata`, chat))
    .data;
};
export const createChatWithConv = async (
  axiosInstance: AxiosInstance,
  conversationData: CreateChatConvLink,
): Promise<ChatConvLink> => {
  return (await axiosInstance.post<ChatConvLink>(`/chat/conversation`, conversationData)).data
}

export const getChatWithConv = async (
  conversationId: string,
  axiosInstance: AxiosInstance
): Promise<ChatConvLink> => {
  try {
    const response = await axiosInstance.get<ChatConvLink>(`/chat/conversation/${conversationId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
