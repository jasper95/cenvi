import { useState } from 'react';
import axios from 'shared/utils/axios';

function useQuery(config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  async function onQuery(additionalConfig = {}) {
    setIsLoading(true);
    const result = await axios({ ...config, ...additionalConfig })
      .then((response) => {
        setData(response);
        return response;
      })
      .catch((err) => {
        setError(err);
        return { error: err };
      });
    setIsLoading(false);
    return result;
  }
  return [{ data, loading: isLoading, error }, onQuery];
}

export default useQuery;
