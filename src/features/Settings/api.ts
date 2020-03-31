import { UserInfo, Employee } from './types'
import { updateEmployeesUrl, updatePasswordUrl, updateUserInfoUrl, getBranchesUrl, getEmployeesUrl } from './constants'
import { executePost, executeGet } from '../../Utils/requestHandler'
import { urlCreator } from '../../Utils/serviceUtils'

export const getEmployees = async () => {
    return executeGet(urlCreator(getEmployeesUrl))
}

export const getBranches = async () => {
    return executeGet(urlCreator(getBranchesUrl))
}

export const updateUserInfo = (userInfo: UserInfo) => {
    return executePost(urlCreator(updateUserInfoUrl), userInfo)
}

export const updatePassword = (newPassword: string) => {
    return executePost(urlCreator(updatePasswordUrl), newPassword)
}

export const updateEmployees = (employees: Array<Employee>) => {
    return executePost(urlCreator(updateEmployeesUrl), employees)
}