import axios from 'axios';
import { ApiResponse } from '../types/apiResponse';

export type Conversation = {
  created_at: string;
  messages: Message[];
};

export type Message =
  | {
      is_from_bot: false;
      text: string;
    }
  | (ChatbotAnswer & {
      is_from_bot: true;
    });

export type ChatbotAnswer = {
  text: string;
  sources: Source[];
};

export type Source = {
  isin: string;
  shortname: string;
  link: string;
  page: number;
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
    return {
      ok: false,
      detail: 'Unknown error when retrieving conversation'
    };
  }
};
