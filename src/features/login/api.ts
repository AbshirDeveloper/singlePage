import { UserInfo } from './types'
import { executePost } from '../../Utils/requestHandler'
import { loginUrl } from './constants'
import { urlCreator } from '../../Utils/serviceUtils'
export const login = (userInfo: UserInfo) => {
    // make real request to validat user
    return executePost(urlCreator(loginUrl), userInfo)
}