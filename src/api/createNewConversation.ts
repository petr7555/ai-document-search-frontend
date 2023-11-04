import axios from 'axios';
import { ApiResponse } from '../types/apiResponse';
import { Conversation } from './getLatestConversation';

export const createNewConversation = async (): Promise<
  ApiResponse<Conversation>
> => {
  try {
    const response = await axios.post<Conversation>('/conversation');
    return {
      ok: true,
      data: response.data
    };
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error when creating new conversation'
    };
  }
};
