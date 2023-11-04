import axios from 'axios';
import { ApiResponse } from '../types/apiResponse';
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
    // TODO handle unauthorized
    return {
      ok: false,
      detail: 'Unknown error when asking question'
    };
  }
};
