import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions as loadingActions } from "../store/slices/searchSlice";

export const useDebounce = (filter: string) => {
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadingActions.loading(true));
    const timeout = setTimeout(() => {
      setDebouncedValue(filter);
      dispatch(loadingActions.loading(false));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [filter]);

  return debouncedValue;
};
