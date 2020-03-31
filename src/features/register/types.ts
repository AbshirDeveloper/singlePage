export interface Props {
    handleSwitchLogin: (val: boolean) => void
    classes?: any
}

export interface State {
    openSnackbar: boolean;
    error: boolean
}
export interface newUser {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}
export interface FormProps {
    onFormSubmit: (userInfo: newUser) => void;
    className: any;
    classes: any
}


