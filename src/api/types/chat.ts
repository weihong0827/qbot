import { UUID } from "crypto";

export type ChatQuestion = {
  model: string;
  question?: string;
  temperature: number;
  max_tokens: number;
};
export type ChatHistory = {
  item_type: string;
  body: ChatHistoryData;
};
export type ChatHistoryData = {
  chat_id: string;
  message_id: string;
  user_message: string;
  assistant: string;
  message_time: string;
};

export type ChatEntity = {
  chat_id: UUID;
  user_id: string;
  creation_time: string;
  chat_name: string;
};
export type ChatConvLink = {
  chat_id: string; // chat id
  conversation_id: string; // conversation id
  brain_id: string; // brain id
  creation_time: string;
};
export type CreateChatConvLink = {
  name: string;
  conversation_id: string; // conversation id
  brain_id: string; // brain id
};
