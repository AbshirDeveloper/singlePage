import dummyData from './dummyData.json'
import { UserInfo } from './types'

export const login = (userInfo: UserInfo) => {
    console.log('user login info =>', userInfo)
    const data: any = dummyData
    const isValid: any = data.successData.Payload.Users.filter((item: any) => item.email === userInfo.email && item.password === userInfo.password)
    let dataToReturn = {
        successData: {
            Success: false,
            Payload: {
                Data: []
            },
            Error: {
                error: true,
                errorMessage: 'User is not valid'
            }
        }
    };
    if (!!isValid.length) {
        dataToReturn = {
            successData: {
                Success: true,
                Payload: {
                    Data: isValid
                },
                Error: {
                    error: false,
                    errorMessage: ''
                }
            }
        }
    }
    return {
        data: dataToReturn
    }
}

export const validatClient = (clientId: string) => {
    console.log('validate client =>', clientId)
    const data: any = dummyData
    const isValid: any = data.successData.Payload.Clients.filter((item: any) => item.clientId === clientId);
    let dataToReturn = {
        successData: {
            Success: false,
            Payload: {
                Data: []
            },
            Error: {
                error: true,
                errorMessage: "Client doesn't exist"
            }
        }
    };
    if (!!isValid.length) {
        dataToReturn = {
            successData: {
                Success: true,
                Payload: {
                    Data: isValid
                },
                Error: {
                    error: false,
                    errorMessage: ''
                }
            }
        }
    }
    return {
        data: dataToReturn
    }
}