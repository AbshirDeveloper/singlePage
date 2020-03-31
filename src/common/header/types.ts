export interface Props {
    loggedin: (val: boolean) => void;
    classes?: any;
    onUserInfoIconClick: (val: string) => void
}

export interface HeaderProps {
    classes: any;
    logout: any;
    onUserInfoIconClick: (val: string) => void
}
export interface HeaderState {
    anchorEl: any,
    mobileMoreAnchorEl: any,
    openNotification: boolean,
    notifications: any,
}

export interface Notifications {
    id: number,
    type: string,
    title: string,
    createdAt: string
}