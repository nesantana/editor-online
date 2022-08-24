/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosStatic, AxiosInstance, AxiosResponse } from 'axios'

export interface ApiResponse<T = any> extends AxiosResponse<T> {
}
class Api {
  public request: AxiosInstance

  constructor(protected axiosStatic: AxiosStatic = axios) {
    this.request = axiosStatic.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    })
  }

  public async get<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request.get<T>(url, { params })
  }

  public async post<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.post<T>(url, body)
  }

  public async put<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.put<T>(url, body)
  }

  public async patch<T>(url: string, body?: any): Promise<ApiResponse<T>> {
    return this.request.patch<T>(url, body)
  }

  public async delete<T>(url: string, params?: any): Promise<ApiResponse<T>> {
    return this.request.delete<T>(url, { params })
  }
}

const api = new Api()

const urls = {
  getAll: 'filetree/',
  general: 'file/',
}

export {
  api, urls,
}
