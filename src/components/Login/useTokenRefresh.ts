import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; // Correctly import jwt-decode
import { apiPaths } from '../../service/apiPaths';
import ApiService from '../../service/ApiService';

interface DecodedToken {
  exp: number;
}

const useTokenRefresh = () => {
  const [intervalId, setIntervalId] = useState<number | null>(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token found');
        }

        const response = await ApiService({
          method: 'POST',
          endpoint: apiPaths.refreshToken,
          data: {
            refreshToken: refreshToken,
          },
        });

        const newToken: string = response.data.token;
        console.log('Token refreshed:', newToken);

        const decodedToken: DecodedToken = jwtDecode<DecodedToken>(newToken);
        const expirationTime = decodedToken.exp * 1000;
        const currentTime = Date.now();
        const timeUntilExpiration = expirationTime - currentTime - 60 * 1000; // 1 minute before actual expiration

        localStorage.setItem('accessToken', newToken);
        localStorage.setItem('tokenExpireTime', expirationTime.toString());

        if (intervalId) {
          clearInterval(intervalId);
        }

        const newIntervalId = window.setInterval(refreshToken, timeUntilExpiration);
        setIntervalId(newIntervalId);
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    };

    const initialToken = localStorage.getItem('accessToken');
    if (initialToken) {
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(initialToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime - 60 * 1000; // 1 minute before actual expiration

      const initialIntervalId = window.setInterval(refreshToken, timeUntilExpiration);
      setIntervalId(initialIntervalId);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return null;
};

export default useTokenRefresh;
