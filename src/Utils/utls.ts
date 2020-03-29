export const validateEmail = (email: string) => {
    const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(email);
    return valid
}

export const validatePassword = (password: string) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
}

export const setSession = (type: string, value: any) => {
    sessionStorage[type] = value
}

export const getSession = (type: string) => {
    return sessionStorage.getItem(type)
}

export const getUserToken = () => {
    const sessionInfo: any = getSession('userInfo')
    return JSON.parse(sessionInfo).token
}

export const getClientId = () => {
    const sessionInfo: any = getSession('userInfo')
    return JSON.parse(sessionInfo).clientId
}