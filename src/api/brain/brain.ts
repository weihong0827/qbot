import { AxiosInstance } from "axios";
import { axiosInstance } from "../axios";

import { Brain, ChannelBrainsResponse } from "../types/brain";
import { Document } from "../types/Document";

export const getBrainDocuments = async (
  brainId: string,
  axiosInstance: AxiosInstance
): Promise<Document[]> => {
  const response = await axiosInstance.get<{ documents: Document[] }>(
    `/explore/?brain_id=${brainId}`
  );

  return response.data.documents;
};

export const createBrain = async (
  name: string,
  axiosInstance: AxiosInstance
): Promise<Brain> => {
  const createdBrain = (await axiosInstance.post<Brain>(`/brains/`, { name }))
    .data;

  return createdBrain;
};

export const getBrain = async (
  brainId: string,
  axiosInstance: AxiosInstance
): Promise<Brain | undefined> => {
  const brain = (
    await axiosInstance.get<Brain | undefined>(`/brains/${brainId}/`)
  ).data;

  return brain;
};

export const deleteBrain = async (
  brainId: string,
  axiosInstance: AxiosInstance
): Promise<void> => {
  await axiosInstance.delete(`/brains/${brainId}/`);
};

export const getDefaultBrain = async (
  axiosInstance: AxiosInstance
): Promise<Brain | undefined> => {
  const defaultBrain = (await axiosInstance.get<Brain>(`/brains/default/`))
    .data;

  return { id: defaultBrain.id, name: defaultBrain.name };
};

export const getBrains = async (
  axiosInstance: AxiosInstance
): Promise<Brain[]> => {
  const brains = (await axiosInstance.get<{ brains: Brain[] }>(`/brains/`))
    .data;

  return brains.brains;
};

export const getChannelBrains = async (
  axiosInstance: AxiosInstance, channel_id: string
): Promise<ChannelBrainsResponse> => {
  const brains = (await axiosInstance.get<ChannelBrainsResponse>(`/brains/teams/${channel_id}/`))
    .data;
  return brains;

};

export const createChannelBrain = async (
  axiosInstance: AxiosInstance, channel_id: string, brain_name: string
): Promise<Brain> => {
  const brain = (await axiosInstance.post<Brain>(`/brains/teams/?teams_channel_id=${channel_id}`, { name: brain_name })).data
  return brain
}
