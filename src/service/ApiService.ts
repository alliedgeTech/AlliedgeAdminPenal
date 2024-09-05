import axios,{ AxiosRequestConfig } from "axios";
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
  const axiosConfig: AxiosRequestConfig = {
    method,
    url: `${API_BASE_URL}/${endpoint}`,
    headers: {
      "Content-Type": "application/json",
      // "Authorization": `Basic ${btoa("ai-bluestone-user:d923099d212708de3e002bae5faaaf94c8bd34ca56931a050a721c63a4970a74")}`,
      ...headers,
    },
    data,
  };
  console.log("data",axiosConfig,JSON.stringify(axiosConfig.data))
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
      console.log("response",response)
      return response;
    },
    (error) => {
      console.error("API Response Error:", error);
      throw error;
    }
  );

  try {
    // Making the API request
    const response = await api(axiosConfig);
    return response.data;
  } catch (error : any) {
    // Throwing any encountered errors
    throw error;
  }
};

export default ApiService;


// /**
//  * Add Base URL
//  */
// const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "https://trydolphy.com";

// /**
//  * Interface for defining the properties required for making an API service request
//  * @interface ApiServiceProps
//  */
// interface ApiServiceProps {
//   method: string;
//   endpoint: string;
//   headers?: Record<string, string>;
//   data?: any;
// }

// /**
//  * Function to make API requests using Fetch
//  * @param method The HTTP method (GET, POST, PUT, DELETE, etc.)
//  * @param endpoint The API endpoint
//  * @param headers Additional headers for the request
//  * @param data Data to be sent with the request (for POST and PUT requests)
//  * @returns A Promise that resolves with the API response data
//  */
// const ApiService = async ({ method, endpoint, headers = {}, data }: ApiServiceProps): Promise<any> => {
//   // Construct URL
//   const url = `${API_BASE_URL}/${endpoint}`;

//   // Construct headers
//   const defaultHeaders = {
//     "Content-Type": "application/json",
//     "Authorization": `Basic ${btoa("ai-bluestone-user:d923099d212708de3e002bae5faaaf94c8bd34ca56931a050a721c63a4970a74")}`,
//     ...headers,
//   };

//   // Configure fetch options
//   const fetchOptions: RequestInit = {
//     method,
//     headers: new Headers(defaultHeaders),
//     body: data ? JSON.stringify(data) : undefined,
//   };

//   try {
//     // Making the API request using fetch
//     const response = await fetch(url, fetchOptions);

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // Parse JSON response asynchronously
//     const responseData = await response.json();
//     console.log("API Response Data:", responseData); // Log the response data

//     return responseData; // Return the parsed data
//   } catch (error) {
//     // Handle fetch errors
//     console.error("API Fetch Error:", error);
//     throw error;
//   }
// };

// export default ApiService;

