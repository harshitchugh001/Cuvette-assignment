import axios from "axios";

export const callApi = async (url, method = "GET", data = {}, headers = {}) => {
  try {
    const options = {
      url,
      method,
      headers,
    };

    if (method.toUpperCase() === "GET") {
      options.params = data;
    } else if (method.toUpperCase() === "POST") {
      options.data = data;
    }

    const response = await axios(options);
    return response.data;
  } catch (error) {
    console.error("Error calling API:", error);
    throw error;
  }
};
