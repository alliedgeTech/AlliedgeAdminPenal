import React, { useEffect, useState } from 'react'
import ApiService from './ApiService';
import { apiPaths } from './apiPaths';

/**
 * Custom hook to fetch data from an API endpoint
 * @returns An object containing the fetched data
 */
export default function useGetApi() {
    const [appliance , setAppliance] = useState<any[]>([])
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
          const result = await ApiService({
            method: 'GET',
            endpoint: apiPaths.getAllAppliance,
            
          });
          setAppliance(result);
        } catch (error : any) {
          alert(error)
      console.log(error)
          console.error('Error fetching data:', error);
        }
      };
  return {
    appliance
  }
}
