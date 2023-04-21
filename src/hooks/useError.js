import { useState } from 'react';

export default function useError() {
  const [error, setError] = useState(null);

  const handleError = (err) => {
    const { response } = err;
    const { data, status } = response;
    const { error: errorObject } = data;
    const formattedError = { ...errorObject, status };

    setError(formattedError);
  };

  return { handleError, error, setError };
}
