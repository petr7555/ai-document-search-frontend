import axios from 'axios';
import { AnswerFromChatbot, Source } from '../types/conversationTypes';

type ChatbotResponse =
  | {
      ok: true;
      text: string;
      sources: Source[];
    }
  | {
      ok: false;
      detail: string;
    };

export const messageChatbot = async (
  message: string
): Promise<ChatbotResponse> => {
  const data = { question: message };
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.post<AnswerFromChatbot>('/chatbot/', data, {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token)
        }
      });
      return {
        ok: true,
        text: response.data.text,
        sources: response.data.sources
      };
    } else {
      return {
        ok: false,
        detail: 'Authentication error when connecting to chatbot'
      };
    }
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error when connecting to chatbot'
    };
  }
};
