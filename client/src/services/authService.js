const API_URL = 'http://localhost:8080'
export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if(response.ok){
            return data
        }else {
            throw new Error(data.error);
        }
    } catch (error) {
        return error;
    }
}
export const login = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });
        const data = await response.json();
        if(response.ok){
            return data
        }else {
            throw new Error(data.error);
        }
    } catch (error) {
        return error;
    }
}