export interface Props {
    handleSwitchLogin: (val: boolean) => void
    classes?: any
}

export interface State {
    userInfo: UserInfo
}


export interface LoginFormProps {
    className?: any
    classes?: any
}

interface FormState {
    isValid: boolean,
    values: any,
    touched: any,
    errors: any
}

export interface LoginFormState {
    formState: FormState
}

export interface UserInfo {
    email: string
    password: string
}