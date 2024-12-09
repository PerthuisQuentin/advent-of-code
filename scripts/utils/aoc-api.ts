import Axios, { AxiosResponse } from 'axios'
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config()

const client = Axios.create({
  baseURL: 'https://adventofcode.com',
  headers: {
    cookie: `session=${process.env.AOC_SESSION_COOKIE}`,
  },
  transformResponse: (data) => data,
})

export const getDayInput = async (year: string, day: string): Promise<string> => {
  const response = await client.get(`/${year}/day/${day}/input`)
  return response.data.trim()
}

export const submitAnswer = async (
  year: string,
  day: string,
  part: string,
  answer: string,
): Promise<AxiosResponse> => {
  const data = {
    level: part,
    answer,
  }

  const response = await client.post(`/${year}/day/${day}/answer`, data)
  return response
}
