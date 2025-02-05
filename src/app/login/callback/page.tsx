'use client'

import { FC, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { useUserToken } from '@/lib/api'

const LoginCallbackPage: FC = () => {
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return_url')

  console.log('return_url', returnUrl)

  useEffect(() => {
    useUserToken().then((res) => {
      const { data, error } = res

      if (error) {
        console.error(error)
        return
      }

      if (data) {
        localStorage.setItem('access_token', data.access_token)

        window.location.href = returnUrl || '/'
      }
    })
  }, [])

  return <></>
}

export default LoginCallbackPage
