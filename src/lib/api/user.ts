import { sendGET } from '../utils'
import { UserClaimDto, UserInfoDto } from './models'

export const useUserClaims = async () => {
  return sendGET<UserClaimDto[]>('/user/claims')
}

export const useUserInfo = async () => {
  return sendGET<UserInfoDto>('/user/info')
}
