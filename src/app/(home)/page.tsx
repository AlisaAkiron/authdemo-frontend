'use client'

import { FC, useState } from 'react'

import { WebAuthnRegisterButton } from '@/components/ui/buttons'
import { LoginModal, UserInfoModal } from '@/components/ui/dialogs'

const Home: FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showUserInfoModal, setShowUserInfoModal] = useState(false)

  const handleOpenLoginModal = () => setShowLoginModal(true)
  const handleOpenUserInfo = () => setShowUserInfoModal(true)

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Authentication Demo</h1>
          <div className="grid grid-cols-3 gap-4 py-6">
            <button className="btn btn-primary" onClick={handleOpenLoginModal}>
              Login
            </button>
            <WebAuthnRegisterButton className="btn btn-primary">
              Register Passkey
            </WebAuthnRegisterButton>
            <button className="btn btn-primary" onClick={handleOpenUserInfo}>
              User Info
            </button>
          </div>
          {showLoginModal && (
            <LoginModal onClose={() => setShowLoginModal(false)} />
          )}
          {showUserInfoModal && (
            <UserInfoModal onClose={() => setShowUserInfoModal(false)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
