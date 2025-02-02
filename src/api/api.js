import axios from "axios";


export async function checkEmail(emailData) {
    try {
        const response = await axios.post('http://192.168.1.95:3001/api/check-email', emailData);
        console.log("API ///",emailData);
        
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function checkLink(linkData) {
    try {
        const response = await axios.post('http://192.168.1.95:3001/api/check-link', linkData);
        console.log("API ///",response);
    }catch (error) {
        console.error(error);
        throw error;
    }}


export async function registerUser(userData) {
    try {
        const response = await axios.post(' http://192.168.1.95:3001/api/register', userData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}