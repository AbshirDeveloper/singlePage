export interface Props {
    classes?: any
}

export interface State {
    currentTab: string,
    employees: Array<Employee>,
    branches: Array<Branch>,
    openSnackbar: boolean,
    error: boolean
}

export interface GeneralProps {
    profile: Values;
    className?: any;
    classes?: any;
    updateInfo: (val: any) => void
}

export interface Values {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    branch: string,
    userType: string
}
export interface GeneralState {
    values: Values,
    openSnackbar: boolean
}

export interface EmployeesProps {
    employees: Array<Employee>
    updateEmployee: (emp: Array<Employee>) => void
    classes?: any;
    className?: any
}

interface Branch {
    Name: string,
    Value: string
}

export interface EmployeesState {
    branches: Array<Branch>,
    employees: any
}

export interface SecurityProps {
    updatePassword: (val: string) => void;
    className?: any;
    classes?: any
}

export interface SecurityState {
    values: {
        password: string,
        confirm: string
    },
    isValid: boolean,
    errorMessage: string
}

export interface SnackBarProps {
    open: boolean;
    onClose: (val: any) => void;
    error?: boolean
}

export interface Employee {
    id: any,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    branch: string,
    active: true
}

export interface UserInfo extends Values { }