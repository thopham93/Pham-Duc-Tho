import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const showLoader = () => setIsLoading(true);

  const dismissLoader = () => setIsLoading(false);

  return { isLoading, showLoader, dismissLoader };
};

export default useLoading;
