
import { executePost, executeGet } from '../../Utils/requestHandler'
import { getPagesUrl, getActionsUrl, getDataUrl } from './constants'
import { urlCreator } from '../../Utils/serviceUtils'

export const getPages = async () => {
    return executeGet(urlCreator(getPagesUrl))
}

export const getPageActionData = async (page: string) => {
    return executePost(urlCreator(getActionsUrl), page)
}

export const getPageData = async () => {
}

export const getData = async () => {
    return executeGet(urlCreator(getDataUrl))
}

export const editData = async (item: any) => {
}

export const deleteData = async (item: any) => {
}

export const addItem = async (item: any) => {
}

export const getHistoryData = async (item: any) => {
}