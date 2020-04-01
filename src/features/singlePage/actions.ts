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

export const getPageActionData = async (page: string, subView: string) => {
    try {
        const response = await Api.getPageActionData(page, subView)
        return response
    } catch (error) {
        throw error
    }
}

export const getData = async (view: string, subView: string) => {
    try {
        const response = await Api.getData(view, subView)
        return response
    } catch (error) {
        throw error
    }
}

export const getHistoryData = async (view: string, subView: string) => {
    try {
        const response = await Api.getHistoryData(view, subView)
        return response
    } catch (error) {
        throw error
    }
}

export const editData = async (item: any, view: string, subView: string) => {
    try {
        const response = await Api.editData(item, view, subView)
        return response
    } catch (error) {
        throw error
    }
}

export const deleteData = async (item: any, view: string, subView: string) => {
    try {
        const response = await Api.deleteData(item, view, subView)
        return response
    } catch (error) {
        throw error
    }
}

export const addItem = async (item: any, view: string, subView: string) => {
    try {
        const response = await Api.addItem(item, view, subView)
        return response
    } catch (error) {
        throw error
    }
}


export const makeViewDefault = async (view: string) => {
    try {
        const response = await Api.makePageDefault(view)
        return response
    } catch (error) {
        throw error
    }
}