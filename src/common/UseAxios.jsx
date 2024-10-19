import axios from "axios";
import { useState } from "react";
import { baseUrl } from "./BaseUrl";

const useAxios = (initialValue = {}) => {
  const [response, setResponse] = useState({
    loading: false,
    error: null,
    data: initialValue,
  });
  const [serverError, setServerError] = useState("");
  const { loading, error, data } = response;
  const handleReset = () =>
    setResponse({
      loading: false,
      error: null,
      data: initialValue,
    });

  const fetcher = async ({ options, callback }) => {
    setResponse((prev) => ({
      ...prev,
      loading: true,
      error: null,
      data: initialValue,
    }));

    axios({
      ...options,
      url: baseUrl + options.url,
    })
      .then(({ data }) => {
        if (data) {
          setResponse((prev) => ({
            ...prev,
            loading: false,
            error: null,
            data: data,
          }));
          if (typeof callback === "function") {
            return callback(data);
          }
        }
      })
      .catch((error) => {
        setServerError(error?.message);
        setResponse((prev) => ({
          ...prev,
          loading: false,
          error: error?.response?.data?.message,
          data: initialValue,
        }));
      });
  };

  return { fetcher, loading, error, data, handleReset, serverError };
};

export default useAxios;
