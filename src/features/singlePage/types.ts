export interface Props {
    classes?: any
}

export interface State {
    pages: Array<Page>,
    actionData: any[],
    columnDefs: any[];
    rowData: any[];
    actionItems: any;
    showHistoryDialog: boolean;
    currentView: string;
    selectedData: any[];
    default: any;
    defaultActionItems: any;
    currentSubView: string;
    noGrid: boolean
}

export interface NavigationProps {
    classes?: any
    pages: Array<Page>;
    default: any;
    makePageDefault: (val: any) => void;
    handleChangeMainView: (val: any) => void
}

interface Page {
    id: any,
    name: string,
    icon: string
}

export interface NavigationState {
    activeTab: string;
    activeView: any
}
