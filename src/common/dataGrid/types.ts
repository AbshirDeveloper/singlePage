export interface Props {
    columnDefs: any[]
    rowData: any[]
    onSelectionChanged?: (val: any) => void
    isDataLoading?: any;
    primaryKey?: any;
    height?: number;
    gridOptions?: any;
    hideActionPane?: any;
    returnGridApi?: (val: any) => void
}

export interface State {
    defaultColDef: any
}