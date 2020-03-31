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
    currentView: string
}

export interface NavigationProps {
    classes?: any
    pages: Array<Page>
}

interface Page {
    id: any,
    name: string,
    icon: string
}

export interface NavigationState {
    activeTab: string
}