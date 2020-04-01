import dummyData from './dummyData.json'
export const getPages = async () => {
    const data: any = dummyData
    return {
        successData: {
            Success: true,
            Payload: {
                Data: data.successData.Pages.map(item => {
                    return {
                        ...item,
                        subViews: Object.keys(item.data).map(page => {
                            return {
                                name: page
                            }
                        })
                    }
                })
            }
        }
    }
}

export const getPageActionData = async (page: string, subView: string) => {
    const data: any = dummyData
    let actionData = [];
    data.successData.Pages.forEach(item => {
        if (item.name === page) {
            actionData = item.data[subView].Actions
        }
    })
    return {
        successData: {
            Success: true,
            Payload: {
                Data: actionData
            }
        }
    }
}

export const getData = async (view: string, subView: string) => {
    const data: any = dummyData
    let columnDefs = [];
    let gridData = [];
    data.successData.Pages.forEach(item => {
        if (item.name === view) {
            columnDefs = item.data[subView].ColumnDefs,
                gridData = item.data[subView].Data
        }
    })
    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: gridData,
                    ColumnDefs: columnDefs
                },
                Error: false
            }
        }
    }
}

export const getHistoryData = async (view: string, subView: string) => {
    const data: any = dummyData
    let columnDefs = [];
    let gridData = [];
    data.successData.Pages.forEach(item => {
        if (item.name === view) {
            columnDefs = item.data[subView].HistoryData.ColumnDefs,
                gridData = item.data[subView].HistoryData.Data
        }
    })
    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: gridData,
                    ColumnDefs: columnDefs
                },
                Error: false
            }
        }
    }
}

export const editData = async (item: any, view: string, subView: string) => {
    let gridData = [];
    const data: any = dummyData;
    data.successData.Pages.forEach(item => {
        if (item.name === view) {
            gridData = item.data[subView].HistoryData.Data.map(element => {
                if (element.id === item.id) {
                    element = {
                        ...element,
                        ...item
                    };
                }
                return element
            })
        }
    })
    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: gridData
                }
            }
        }
    }
}

export const deleteData = async (item: any[], view: string, subView: string) => {
    const deletedIds = item.map(delItem => delItem.id);
    let gridData = [];
    const data: any = dummyData;
    data.successData.Pages.forEach(item => {
        if (item.name === view) {
            gridData = item.data[subView].HistoryData.Data.filter((element: any) => !deletedIds.includes(element.id))
        }
    })
    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: gridData
                }
            }
        }
    }
}

export const addItem = async (item: any, view: string, subView: string) => {
    let gridData = [];
    const data: any = dummyData;
    data.successData.Pages.forEach(item => {
        if (item.name === view) {
            gridData = [item.data[subView].HistoryData.Data, { ...item }]
        }
    })
    return {
        data: {
            successData: {
                Success: true,
                Payload: {
                    Data: gridData
                }
            }
        }
    }
}

export const makePageDefault = async (item: any) => {
    return {
        data: {
            successData: {
                Success: true
            }
        }
    }
}