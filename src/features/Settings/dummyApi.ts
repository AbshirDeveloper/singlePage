import { UserInfo, Employee } from './types'
import dummyData from './dummyData.json'

export const getEmployees = async () => {
    const data: any = dummyData
    const employees = data.successData.Payload.Employees
    return {
        successData: {
            Success: true,
            Payload: {
                Data: employees
            }
        }
    }
}

export const getBranches = async () => {
    const data: any = dummyData
    const branches = data.successData.Payload.Branches
    return {
        successData: {
            Success: true,
            Payload: {
                Data: branches
            }
        }
    }
}

export const updateUserInfo = (userInfo: UserInfo) => {
    return {
        successData: {
            Success: true,
            Payload: {
                Data: []
            }
        }
    }
}

export const updatePassword = (newPassword: string) => {
    return {
        successData: {
            Success: true,
            Payload: {
                Data: []
            }
        }
    }
}

export const updateEmployees = (employees: Array<Employee>) => {
    return {
        successData: {
            Success: true,
            Payload: {
                Data: []
            }
        }
    }
}