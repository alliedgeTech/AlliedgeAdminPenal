import axios, { AxiosRequestConfig } from "axios";
/**
 * Add Base URL
 */
const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "https://alliedgebackend-contect.onrender.com";

/**
 * Interface for defining the properties required for making an API service request
 * @interface ApiServiceProps
 */
interface ApiServiceProps {
  method: string;
  endpoint: string;
  headers?: Record<string, string>;
  data?: any;
}
/**
 * Function to make API requests using Axios
 * @param method The HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param endpoint The API endpoint
 * @param headers Additional headers for the request
 * @param data Data to be sent with the request (for POST and PUT requests)
 * @returns A Promise that resolves with the API response data
 */
const ApiService = async ({ method, endpoint, headers = {}, data }: ApiServiceProps): Promise<any> => {
  /**
   *  Configuration for Axios request
   */
  const token = localStorage.getItem('accessToken')

  const axiosConfig: AxiosRequestConfig = {
    method,
    url: `${API_BASE_URL}/${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
      ...headers,
    },
    data,
  };
  console.log(JSON.stringify(axiosConfig.data));
  console.log(axiosConfig);
/**
 * Creating an instance of Axios
 */
  const api = axios.create();

  api.interceptors.request.use((config) => {
    return config;
  });
 /**
 * Intercepting response before it is resolved
 */
  api.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      console.error("API Response Error:", error);
      throw error;
    }
  );

  try {
    // Making the API request
    const response = await api(axiosConfig);
    return response;
  } catch (error) {
    // Throwing any encountered errors
    throw error;
  }
};

export default ApiService;
