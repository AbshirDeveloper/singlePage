import { Notifications } from './types'
import { executeGet, executePost } from '../../Utils/requestHandler'
import { getNotificationsUrls } from './constants'
import { urlCreator } from '../../Utils/serviceUtils'


export const getNotifications = () => {
    return executeGet(urlCreator(getNotificationsUrls))
}

export const markNotificationAsRead = (notifications: Notifications) => {
    return executePost(urlCreator(getNotificationsUrls), notifications)
}