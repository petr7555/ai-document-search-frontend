

// take in a username and password, send a request to the server to authenticate the user

const API_URL_PROD = 'https://api.example.com';

export const authenticateUser = async (
    username: string,
    password: string
    ): Promise<string> => {
    const response = await fetch(`${API_URL_PROD}/authenticate`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    
    if (data.error) {
        return data.error;
    }
    
    return data.token;
    };
