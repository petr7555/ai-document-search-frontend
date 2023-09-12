import axios from 'axios';

const getBackendHealth = async (): Promise<string> => {
    try {
        const response = await axios.get<string>('/health');
        return response.data;
    } catch (error) {
        return JSON.stringify(error, null, 2);
    }
};

export default getBackendHealth;
