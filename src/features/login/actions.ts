import { UserInfo } from './types'
import { isDevEnv } from '../../Utils/serviceUtils'
import * as dummyApi from './dummyApi'
import * as api from './api'

const Api = isDevEnv() ? dummyApi : api

export const login = async (userInfo: UserInfo) => {
    try {
        const response = await Api.login(userInfo)
        return response
    } catch (error) {
        throw error
    }
}

export const validatClient = async (clientId: string) => {
    try {
        const response = await Api.validatClient(clientId)
        return response
    } catch (error) {
        throw error
    }
}