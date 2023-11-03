import axios from 'axios';
import { Filters } from '../types/filterTypes';

type FilterResponse =
  | {
      ok: true;
      filters: Filters;
    }
  | {
      ok: false;
      detail: string;
    };

export const getFilters = async (): Promise<FilterResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get<Filters>('/chatbot/filter', {
        headers: {
          Authorization: 'Bearer ' + JSON.parse(token)
        }
      });
      return {
        ok: true,
        filters: response.data
      };
    } else {
      return {
        ok: false,
        detail: 'Authentication error when retrieving filters'
      };
    }
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error retrieving filters'
    };
  }
};
