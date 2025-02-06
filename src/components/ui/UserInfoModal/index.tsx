import { FC, useEffect, useRef, useState } from 'react'

import { UserInfoDto, useUserInfo } from '@/lib/api'

export const UserInfoModal: FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [userInfo, setUserInfo] = useState<UserInfoDto | null>(null)

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await useUserInfo()
      if (data) {
        setUserInfo(data)
        dialogRef.current?.showModal()
      }
    }
    fetchUserInfo()
  }, [])

  const handleClose = () => {
    dialogRef.current?.close()
    onClose()
  }

  if (!userInfo) return null

  return (
    <dialog
      id="userinfo-modal"
      className="modal"
      ref={dialogRef}
      onClose={handleClose}
    >
      <div className="modal-box max-w-6xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
            ✕
          </button>
        </form>
        <h3 className="py-6 text-lg font-bold">User Info</h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">User ID:</span>
            <span className="col-span-2">{userInfo.user_id}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">Email:</span>
            <span className="col-span-2">{userInfo.email}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">Display Name:</span>
            <span className="col-span-2">{userInfo.display_name}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">Social Logins:</span>
            <div className="col-span-2">
              {Object.entries(userInfo.social_logins).map(([provider, id]) => (
                <div key={provider}>{`${provider}: ${id}`}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">WebAuthn Devices:</span>
            <div className="col-span-2">
              {userInfo.webauthn_devices.map((device, index) => (
                <div key={index}>{device}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <span className="font-semibold">Crypto Wallets:</span>
            <div className="col-span-2">
              {userInfo.crypto_wallets.map((wallet, index) => (
                <div key={index}>{wallet}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </dialog>
  )
}
