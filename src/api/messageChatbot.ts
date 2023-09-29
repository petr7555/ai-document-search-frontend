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
  const params = { question: message };
  try {
    const response = await axios.post<AnswerFromChatbot>('/chatbot/', params);
    return {
      ok: true,
      answer: response.data.answer.text
    };
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error'
    };
  }
};
