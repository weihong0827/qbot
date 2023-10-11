import { axiosInstance } from "../axios";
import { Brain } from "../types/brain";
import {
  createBrain,
  deleteBrain,
  getBrain,
  getBrainDocuments,
  getBrains,
  getDefaultBrain,
  getChannelBrains,
  createChannelBrain
} from "./brain";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainApi = () => {

  return {
    getBrainDocuments: async (brainId: string) =>
      getBrainDocuments(brainId, axiosInstance),
    createBrain: async (name: string) => createBrain(name, axiosInstance),
    deleteBrain: async (id: string) => deleteBrain(id, axiosInstance),
    getDefaultBrain: async () => getDefaultBrain(axiosInstance),
    getBrains: async () => getBrains(axiosInstance),
    getBrain: async (id: string) => getBrain(id, axiosInstance),
    getChannelBrains: async (channelId: string, brain_name: string): Promise<Brain> => {
      var brains = await getChannelBrains(axiosInstance, channelId);
      if (brains.brains.length === 0) {
        await createChannelBrain(axiosInstance, channelId, brain_name);
        brains = await getChannelBrains(axiosInstance, channelId);
      }
      return brains.brains[0].brains

    }
  };
};
