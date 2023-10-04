import axios from 'axios';

type AnswerFromChatbot = {
  answer: { text: string };
};

export type ChatbotResponse =
  | {
      ok: true;
      answer: string;
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
        answer: response.data.answer.text
      };
    } else {
      return {
        ok: false,
        detail: 'Unknown error'
      };
    }
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error'
    };
  }
};
