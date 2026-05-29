import {AxiosRequestConfig} from 'axios';
import axiosInstance from './axiosInstance';
import {prettyPrint} from '@common';
import {ApiResponseType} from '@types';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';

const request = async <T>(
  method: Method,
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
): Promise<ApiResponseType<T>> => {
  try {
    const response = await axiosInstance[method]<T>(
      url,
      body ?? config,
      body ? config : undefined,
    );
    prettyPrint({
      [`API_${method.toUpperCase()}_SUCCESS`]: {url, status: response.status},
    });
    return {
      success: true,
      data: response.data,
      message: 'Success',
      status: response.status,
    };
  } catch (error: any) {
    prettyPrint({[`API_${method.toUpperCase()}_ERROR`]: {url, error}});
    return {
      success: false,
      data: null,
      message:
        error?.response?.data?.message ??
        error?.message ??
        'Something went wrong',
      status: error?.response?.status ?? 0,
    };
  }
};

export const apiGet = <T = any>(url: string, config?: AxiosRequestConfig) =>
  request<T>('get', url, undefined, config);

export const apiPost = <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => request<T>('post', url, body, config);

export const apiPut = <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => request<T>('put', url, body, config);

export const apiPatch = <T = any>(
  url: string,
  body?: any,
  config?: AxiosRequestConfig,
) => request<T>('patch', url, body, config);

export const apiDelete = <T = any>(url: string, config?: AxiosRequestConfig) =>
  request<T>('delete', url, undefined, config);
