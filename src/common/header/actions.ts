import { Notifications } from './types'
import { isDevEnv } from '../../Utils/serviceUtils'
import * as dummyApi from './dummyApi'
import * as api from './api'

const Api = isDevEnv() ? dummyApi : api

export const getNotifications = async () => {
    try {
        const response = await Api.getNotifications()
        return response
    } catch (error) {
        throw (error)
    }
}

export const markNotificationAsRead = (notifications: Notifications) => {

}

