import { newUser } from './types'


export const registerUser = (userInfo: newUser) => {
    console.log("register user", userInfo)
    return {
        data: {
            successData: {
                Success: true
            }
        }
    }
}