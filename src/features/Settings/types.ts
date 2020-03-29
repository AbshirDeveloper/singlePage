export interface GeneralProps {
    profile: Values;
    className?: any;
    classes?: any
}

export interface Values {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    state: string,
    country: string,
    isPublic: string,
    canHire: string
}

export interface GeneralState {
    values: Values,
    openSnackbar: boolean
}

export interface EmployeesProps {

}

export interface EmployeesState {

}

export interface SecurityProps {

}

export interface SecurityState {

}

export interface SnackBarProps {
    open: boolean;
    onClose: (val: any) => void
}