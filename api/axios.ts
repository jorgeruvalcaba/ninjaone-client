import axios from 'axios'

import { BASE_URL } from '../constants'

export const api = axios.create({ baseURL: BASE_URL })

export const getGenres = async (): Promise<any> => {
  try {
    const response = await api.get<any>(`/devices`)
    return response.data
  } catch (e: unknown) {
    return console.log(e)
  }
}
