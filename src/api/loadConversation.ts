import axios from 'axios';
import { Conversation } from '../types/conversationTypes';

type ConversationResponse =
  | {
      ok: true;
      conversation: Conversation;
    }
  | {
      ok: false;
      detail: string;
    };

export const loadConversation = async (): Promise<ConversationResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get<Conversation>('/conversation', {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token)
        }
      });
      return {
        ok: true,
        conversation: {
          created_at: response.data.created_at,
          messages: response.data.messages
        }
      };
    } else {
      return {
        ok: false,
        detail: 'Authentication error when retrieving conversation'
      };
    }
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error retrieving conversation'
    };
  }
};
