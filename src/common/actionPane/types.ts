export interface Props {
    actionItems: ActionItems;
    selectedData: any[],
    classes?: any;
    views: {
        mainView: string,
        subView: string
    }
}

export interface ActionItem {
    Name: string,
    Fields: any[],
    IsEntitled: boolean,
    onSubmit: (val: any) => boolean
}

export interface ActionItems {
    Add: ActionItem,
    Edit: ActionItem,
    Delete: ActionItem,
    Search: ActionItem,
    ReadDocument: ActionItem,
    ViewHistory: ActionItem
}

export interface State {
    selectedFields: any,
    selectedAction: any,
    expanded: boolean,
}