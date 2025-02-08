import axios from "axios";

// checkEmail function to check if the email is already registered
export async function checkEmail(emailData) {
  try {
    const response = await axios.post(
      "http://192.168.1.95:3001/api/check-email",
      emailData
    );
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function checkLink(linkData) {
  try {
    const response = await axios.post(
      "http://192.168.1.95:3001/api/check-link",
      linkData
    );

    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function registerUser(userData) {
  try {
    const response = await axios.post(
      "http://192.168.1.95:3001/api/register",
      userData
    );
    return response.data.status;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}

export async function getThemes() {
  try {
    const response = await axios.get("http://192.168.1.95:3001/api/register");
    return response.data;
  } catch (error) {
    //console.error(error);
    throw error;
  }
}
