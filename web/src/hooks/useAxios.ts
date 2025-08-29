import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
// import { useTranslation } from 'next-i18next';

// Centralized axios hook for Next.js + React
const useAxios = () => {
  // No i18n, use plain strings or pass custom messages

  const showSuccessMsg = (msg: string) => toast.success(msg);
  const showErrorMsg = (msg: string) => toast.error(msg);

  const showValidationErrors = (error: any, errorMsg: string, isErrorMsg?: boolean) => {
    if (error?.response?.data?.errors) {
      const errors = error.response.data.errors;
      Object.entries(errors).forEach(([field, fieldErrors]) => {
        if (Array.isArray(fieldErrors)) {
          fieldErrors.forEach((message) => message && toast.error(message));
        }
      });
    }
    if (isErrorMsg) {
      toast.error(errorMsg);
      console.log(error);
    }
  };


  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

  const buildUrl = (route: string) => {
    if (route.startsWith('http')) return route;
    return `${API_BASE.replace(/\/$/, '')}/${route.replace(/^\//, '')}`;
  };

  const axiosGet = async (
    route: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
    customErrorSuccess = ''
  ) => {
    try {
      const url = buildUrl(route);
      const response = await axios.get(url, { params, ...config });
      return response;
    } catch (error: any) {
      const errorMsg = customErrorSuccess || 'Error loading data';
      showErrorMsg(errorMsg);
      console.log(error);
      throw error;
    }
  };


  const axiosPost = async (
    route: string,
    params: any,
    customMsgSuccess = '',
    isErrorMsg = false,
    showToast = true
  ) => {
    try {
      const url = buildUrl(route);
      const response = await axios.post(url, params);
      if (showToast) {
        const successMsg = customMsgSuccess || 'Created successfully';
        showSuccessMsg(successMsg);
      }
      return response;
    } catch (error: any) {
      if (showToast) {
        const errorMsg = 'Unprocessable entity';
        showValidationErrors(error, errorMsg, isErrorMsg);
      }
      console.log(error);
      throw error;
    }
  };


  const axiosPut = async (
    route: string,
    params: any,
    customMsgSuccess = '',
    isErrorMsg = false
  ) => {
    try {
      const url = buildUrl(route);
      const response = await axios.put(url, params);
      const successMsg = customMsgSuccess || 'Updated successfully';
      showSuccessMsg(successMsg);
      return response;
    } catch (error: any) {
      const errorMsg = 'Error updating data';
      showValidationErrors(error, errorMsg, isErrorMsg);
      console.log(error);
      throw error;
    }
  };


  const axiosDelete = async (
    route: string,
    params?: any,
    customMsgSuccess = ''
  ) => {
    try {
      const url = buildUrl(route);
      const response = await axios.delete(url, { data: params });
      const successMsg = customMsgSuccess || 'Deleted successfully';
      showSuccessMsg(successMsg);
      return response;
    } catch (error: any) {
      toast.error('Error deleting data');
      console.log(error);
      throw error;
    }
  };

  return {
    axiosGet,
    axiosPost,
    axiosPut,
    axiosDelete,
  };
};

export default useAxios;
