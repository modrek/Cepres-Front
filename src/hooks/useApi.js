import {useState, useEffect, useCallback} from "react";

const useApi = (apiCall, initialValue = {}) => {
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const fetchData = useCallback(async function () {
    try {
      setHasError(false);
      setLoading(true);
      const result = await apiCall();
      if (result) {
        setData(result);
      }
    } catch (error) {
      setHasError(true);
      throw error;
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchData();
  }, [apiCall, fetchData]);
  return {loading, data, retry: fetchData, hasError};
};

export default useApi;
