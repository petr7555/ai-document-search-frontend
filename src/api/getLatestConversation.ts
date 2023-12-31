import axios from 'axios';
import { ApiResponse } from './utils/apiResponse';
import handleApiError from './utils/handleApiError';

export type Conversation = {
  created_at: string;
  messages: Message[];
};

export type Message =
  | {
      role: 'user';
      text: string;
      sources: null;
    }
  | (ChatbotAnswer & {
      role: 'bot';
    })
  | {
      role: 'pending';
    };

export type ChatbotAnswer = {
  text: string;
  sources: Source[];
};

export type Source = {
  isin: string;
  shortname: string;
  link: string;
  page: number;
  certainty: number;
  distance: number;
};

export const getLatestConversation = async (): Promise<
  ApiResponse<Conversation>
> => {
  try {
    const response = await axios.get<Conversation>('/conversation');
    return {
      ok: true,
      data: response.data
    };
  } catch (error) {
    return handleApiError(error, 'getting the latest conversation');
  }
};
