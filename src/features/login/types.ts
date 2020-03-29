export interface Props {
    handleSwitchLogin: (val: boolean) => void
    classes?: any;
    loggedin: (loggedIn: boolean, clientId?: string) => void
}

export interface State {
    userError: string
}


export interface LoginFormProps {
    className?: any;
    onFormSubmit: (val: UserInfo) => void
    classes?: any;
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