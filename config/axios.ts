import axios, {
  type InternalAxiosRequestConfig,
  type AxiosInstance,
} from 'axios';

const handleAxiosError = (error: Error): Promise<string> => {
  return Promise.reject(error);
};

export const axiosInstance = (): AxiosInstance => {
  const instance = axios.create({ withCredentials: true });

  instance.interceptors.request.use(
    async function axiosRequestInterceptor(
      config: InternalAxiosRequestConfig<any>,
    ): Promise<InternalAxiosRequestConfig<any>> {
      config.baseURL = process.env.BASE_URL_API;

      return config;
    },
    function axiosError(error: Error): Promise<string> {
      return handleAxiosError(error);
    },
  );

  return instance;
};
