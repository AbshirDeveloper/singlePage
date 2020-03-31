import { isDevEnv } from '../../Utils/serviceUtils'
import * as dummyApi from './dummyApi'
import * as api from './api'

const Api = isDevEnv() ? dummyApi : api

export const getPages = async () => {
    try {
        const response = await Api.getPages()
        return response
    } catch (error) {
        throw error
    }
}

export const getPageActionData = async (page: string) => {
    try {
        const response = await Api.getPageActionData(page)
        return response
    } catch (error) {
        throw error
    }
}

export const getData = async () => {
    try {
        const response = await Api.getData()
        return response
    } catch (error) {
        throw error
    }
}

export const getHistoryData = async (view: string) => {
    try {
        const response = await Api.getHistoryData(view)
        return response
    } catch (error) {
        throw error
    }
}

export const getPageData = async () => {
    try {
        const response = await Api.getPageData()
        return response
    } catch (error) {
        throw error
    }
}

export const editData = async (item: any) => {
    try {
        const response = await Api.editData(item)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteData = async (item: any) => {
    try {
        const response = await Api.deleteData(item)
        return response
    } catch (error) {
        throw error
    }
}

export const addItem = async (item: any) => {
    try {
        const response = await Api.addItem(item)
        return response
    } catch (error) {
        throw error
    }
}