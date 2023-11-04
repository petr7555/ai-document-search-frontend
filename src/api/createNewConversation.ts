import axios from 'axios';
import { ApiResponse } from './utils/apiResponse';
import handleApiError from './utils/handleApiError';
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
    return handleApiError(error, 'creating new conversation');
  }
};
