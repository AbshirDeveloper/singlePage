import dummyData from './dummyData.json'
export const getPages = async () => {
    const data: any = dummyData
    return {
        successData: {
            Success: true,
            Payload: {
                Data: data.successData.Payload.Pages
            }
        }
    }
}

export const getPageActionData = async (page: string) => {
    const data: any = dummyData
    return {
        successData: {
            Success: true,
            Payload: {
                Data: data.successData.Payload.Actions
            }
        }
    }
}

export const getData = async () => {
    const data: any = dummyData

    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: data.successData.Payload.GridData,
                    ColumnDefs: data.successData.Payload.ColumnsInfo
                },
                Error: false
            }
        }
    }
}

export const getHistoryData = async (view: string) => {
    const data: any = dummyData

    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: data.successData.Payload.GridData,
                    ColumnDefs: data.successData.Payload.ColumnsInfo
                },
                Error: false
            }
        }
    }
}

export const getPageData = async () => {
}

export const editData = async (item: any) => {
}

export const deleteData = async (item: any) => {
}

export const addItem = async (item: any) => {
}