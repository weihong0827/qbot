import { UUID } from "crypto";

import { Document } from "./Document";

export type Brain = {
  id: UUID;
  name: string;
  documents?: Document[];
  status?: string;
  model?: string;
  max_tokens?: string;
  temperature?: string;
};
export type ChannelBrain = {
  channel_id: string
  brains: Brain
}
export type ChannelBrainsResponse = {
  brains: ChannelBrain[]
}
