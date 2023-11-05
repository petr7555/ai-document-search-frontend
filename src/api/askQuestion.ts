import axios from 'axios';
import { ApiResponse } from './utils/apiResponse';
import handleApiError from './utils/handleApiError';
import { ChatbotAnswer } from './getLatestConversation';

export type Filter = {
  property_name:
    | 'isin'
    | 'issuer_name'
    | 'filename'
    | 'industry'
    | 'risk_type'
    | 'green';
  values: string[];
};

export const askQuestion = async (
  question: string,
  filters: Filter[]
): Promise<ApiResponse<ChatbotAnswer>> => {
  try {
    const response = await axios.post<ChatbotAnswer>('/chatbot', {
      question: question,
      filters: filters
    });
    return {
      ok: true,
      data: response.data
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      return {
        ok: false,
        detail: error.response.data.detail
      };
    }
    return handleApiError(error, 'answering question');
  }
};
