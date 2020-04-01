
import { executePost, executeGet } from '../../Utils/requestHandler'
import { getPagesUrl, getActionsUrl, getDataUrl, addUrl, deleteUrl, editUrl, getHistoryUrl, makePageDefaultUrl } from './constants'
import { urlCreator } from '../../Utils/serviceUtils'

export const getPages = async () => {
    return executeGet(urlCreator(getPagesUrl))
}

export const getPageActionData = async (view: string, subView: string) => {
    return executePost(urlCreator(getActionsUrl), { view, subView })
}

export const getData = async (view: string, subView: string) => {
    return executePost(urlCreator(getDataUrl), { view, subView })
}

export const editData = async (item: any, view: string, subView: string) => {
    return executePost(urlCreator(editUrl), { item, view, subView })

}

export const deleteData = async (item: any, view: string, subView: string) => {
    return executePost(urlCreator(deleteUrl), { item, view, subView })

}

export const addItem = async (item: any, view: string, subView: string) => {
    return executePost(urlCreator(addUrl), { item, view, subView })

}

export const getHistoryData = async (view: string, subView: string) => {
    return executePost(urlCreator(getHistoryUrl), { view, subView })

}

export const makePageDefault = async (item: any) => {
    return executePost(urlCreator(makePageDefaultUrl), item)

}