import { useState, useEffect } from 'react';
import axiosLib from 'axios';
import axios from 'shared/utils/axios';

function useQuery(config, options) {
  const { initialData, isBase = false } = options;
  const { url } = config;
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [refetchCount, setRefetchCount] = useState(0);
  useEffect(() => {
    const source = axiosLib.CancelToken.source();
    const fetchData = () => {
      setIsLoading(true);
      axios({
        ...config,
        url: [isBase && 'base', url].filter(Boolean).join(''),
        cancelToken: source.token,
      })
        .then((response) => {
          setData(response);
          setIsLoading(false);
        })
        .catch((err) => {
          if (!axiosLib.isCancel(err)) {
            setError(err);
          }
          setIsLoading(false);
        });
    };
    if (url) {
      fetchData();
    }
    return () => {
      source.cancel();
    };
  }, [url, isBase, refetchCount]);
  const queryState = { data, loading: isLoading, error };
  return [queryState, { refetch }];

  function refetch() {
    setRefetchCount(prev => prev + 1);
  }
}

export default useQuery;
