import axios from 'axios';
import { Conversation } from '../types/conversationTypes';

type newConversationResponse =
  | {
      ok: true;
      created_at: string;
    }
  | {
      ok: false;
      detail: string;
    };

export const newConversation = async (): Promise<newConversationResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.post<Conversation>(
        '/conversation',
        {},
        {
          headers: {
            Authorization: 'Bearer ' + JSON.parse(token)
          }
        }
      );
      return {
        ok: true,
        created_at: response.data.created_at
      };
    } else {
      return {
        ok: false,
        detail: 'Authentication error when creating new conversation'
      };
    }
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error when creating new conversation'
    };
  }
};
