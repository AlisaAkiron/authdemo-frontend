'use client'

import { FC, useCallback, useRef } from 'react'

import LoginModal from '@/components/ui/LoginModal'
import { useUserInfo } from '@/lib/api'
import { passkeyRegister } from '@/lib/utils'

const Home: FC = () => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleOpenLoginModal = useCallback(() => {
    modalRef.current?.showModal()
  }, [])

  const handleGetUserInfo = useCallback(async () => {
    const { data, error } = await useUserInfo()

    if (error) {
      console.error(error)
    }

    if (data) {
      console.log(data)
    }
  }, [])

  const handlePasskeyRegister = useCallback(async () => {
    await passkeyRegister()
  }, [])

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Authentication Demo</h1>
          <div className="grid grid-cols-2 gap-4 py-6">
            <button className="btn btn-primary" onClick={handleOpenLoginModal}>
              Login
            </button>
            <button className="btn btn-primary" onClick={handlePasskeyRegister}>
              Register Passkey
            </button>
            <button className="btn btn-primary">Protected Page</button>
            <button className="btn btn-primary" onClick={handleGetUserInfo}>
              User Info (Bearer)
            </button>
          </div>
          <LoginModal ref={modalRef} />
        </div>
      </div>
    </div>
  )
}

export default Home
