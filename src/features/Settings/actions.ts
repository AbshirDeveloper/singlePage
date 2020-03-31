import { UserInfo, Employee } from './types'
import * as dummyApi from './dummyApi'
import * as api from './api'
import { isDevEnv } from '../../Utils/serviceUtils'

const Api = isDevEnv() ? dummyApi : api
export const getEmployees = async () => {
    try {
        const response = await Api.getEmployees()
        return response
    } catch (error) {
        throw error
    }
}

export const getBranches = async () => {
    try {
        const response = await Api.getBranches()
        return response
    } catch (error) {
        throw error
    }
}

export const updateUserInfo = async (userInfo: UserInfo) => {
    try {
        const response = await Api.updateUserInfo(userInfo)
        return response
    } catch (error) {
        throw error
    }
}

export const updatePassword = async (newPassword: string) => {
    try {
        const response = await Api.updatePassword(newPassword)
        return response
    } catch (error) {
        throw error
    }
}

export const updateEmployees = async (employees: Array<Employee>) => {
    try {
        const response = await Api.updateEmployees(employees)
        return response
    } catch (error) {
        throw error
    }
}