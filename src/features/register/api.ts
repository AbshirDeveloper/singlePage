import { newUser } from './types'
import { executePost } from '../../Utils/requestHandler'
import { newUserUrl } from './constants'
import { urlCreator } from '../../Utils/serviceUtils'

export const registerUser = (userInfo: newUser) => {
    // real call to register user
    return executePost(urlCreator(newUserUrl), userInfo)
}