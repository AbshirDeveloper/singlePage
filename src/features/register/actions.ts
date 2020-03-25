import { newUser } from './types'
import { isDevEnv } from '../../Utils/serviceUtils'
import * as dummyApi from './dummyApi'
import * as api from './api'

const Api = isDevEnv() ? dummyApi : api

export const registerUser = async (newUser: newUser) => {
    try {
        const response: any = await Api.registerUser(newUser)
        return response.data
    } catch (error) {
        throw (error)
    }
}