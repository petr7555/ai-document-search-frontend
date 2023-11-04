import axios from 'axios';
import { ApiResponse } from '../types/apiResponse';

export type Filters = {
  isin: string[];
  issuer_name: string[];
  filename: string[];
  industry: string[];
  risk_type: string[];
  green: string[];
};

export const getFilters = async (): Promise<ApiResponse<Filters>> => {
  try {
    const response = await axios.get<Filters>('/chatbot/filter');
    return {
      ok: true,
      data: response.data
    };
  } catch (error) {
    return {
      ok: false,
      detail: 'Unknown error when retrieving filters'
    };
  }
};
