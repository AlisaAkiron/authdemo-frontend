import { ErrorResponse } from '../api'

export const getApiURL = (path: string) => {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL
  return `${URL}/api${path}`
}

const getResponse = async <TResult, TError = ErrorResponse>(
  response: Response,
) => {
  if (response.status >= 400) {
    return {
      data: undefined,
      error: (await response.json()) as TError,
    }
  }

  return {
    data: (await response.json()) as TResult,
    error: undefined,
  }
}

export type ApiOptions = {
  include_cookie?: boolean
}

export const sendGET = async <TResult>(
  path: string,
  options: ApiOptions | undefined = undefined,
) => {
  const resp = await fetch(getApiURL(path), getSendOptions('GET', options))
  return await getResponse<TResult>(resp)
}

export const sendPOST = async <TResult>(
  path: string,
  body: string,
  options: ApiOptions | undefined = undefined,
) => {
  const resp = await fetch(getApiURL(path), {
    ...getSendOptions('POST', options),
    body: body,
  })
  return await getResponse<TResult>(resp)
}

const getSendOptions = (method: string, options: ApiOptions | undefined) => {
  const headers: Record<string, string> = {
    Accept: 'application/json',
  }

  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  if (method === 'POST') {
    headers['Content-Type'] = 'application/json'
  }

  const reqInit: RequestInit = {
    method: method,
    headers: headers,
    credentials: options?.include_cookie ? 'include' : 'omit',
  }

  return reqInit
}
