import axios from 'axios';

type Source = {
  isin: string;
  link: string;
  page: number;
};

type AnswerFromChatbot = {
  answer: {
    text: string;
    sources: Source[];
  };
};

export type ChatbotResponse =
  | {
      ok: true;
      answer: string;
      link: string;
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
        answer: response.data.answer.text,
        link: response.data.answer.sources[0].link
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
