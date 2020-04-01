import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './components/Navigations'
import Typography from '@material-ui/core/Typography';
import { Props, State } from './types'
import { getPages, getPageActionData, getData, getHistoryData, editData, addItem, makeViewDefault, deleteData } from './actions'
import AgGrid from '../../common/dataGrid'
import ActionPane from '../../common/actionPane'
import History from '../../common/actionPane/viewHistory'
import MyCart from './components/Cart'
const useStyles = createStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    content: {
        // flexGrow: 1,
        width: '100%'
        // padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}),
);

class SinglePage extends React.Component<Props, State> {
    griApi: any
    constructor(props: any) {
        super(props)
        this.state = {
            pages: [],
            actionData: [],
            rowData: [],
            columnDefs: [],
            actionItems: {
                Add: {
                    Name: 'Add',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onAddSubmit
                },
                Edit: {
                    Name: 'Edit',
                    Fields: [

                    ],
                    IsEntitled: false,

                    onSubmit: this.onEditSumbit
                },
                Delete: {
                    Name: 'Delete',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onDeleteSubmit
                },
                Search: {
                    Name: 'Search',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onSearchSubmit
                },
                ReadDocument: {
                    Name: 'DocumentUpload',
                    Fields: [

                    ],
                    IsEntitled: false,

                    onSubmit: this.onFileUpload
                },
                ViewHistory: {
                    Name: 'ViewHistory',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onViewHistoryClicked
                }
            },
            defaultActionItems: {
                Add: {
                    Name: 'Add',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onAddSubmit
                },
                Edit: {
                    Name: 'Edit',
                    Fields: [

                    ],
                    IsEntitled: false,

                    onSubmit: this.onEditSumbit
                },
                Delete: {
                    Name: 'Delete',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onDeleteSubmit
                },
                Search: {
                    Name: 'Search',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onSearchSubmit
                },
                ReadDocument: {
                    Name: 'DocumentUpload',
                    Fields: [

                    ],
                    IsEntitled: false,

                    onSubmit: this.onFileUpload
                },
                ViewHistory: {
                    Name: 'ViewHistory',
                    Fields: [

                    ],
                    IsEntitled: false,
                    onSubmit: this.onViewHistoryClicked
                }
            },
            currentView: '',
            showHistoryDialog: false,
            selectedData: [],
            default: {},
            currentSubView: '',
            noGrid: false
        }
    }

    onSearchSubmit = (data: any) => {
        this.setState({
            currentSubView: data.Views
        })
        if (data.Views === 'Cart' || (data.Views === undefined && this.state.currentSubView === 'Cart')) {
            this.setState({
                noGrid: true
            })
        } else {
            this.setState({
                noGrid: false
            })
        }
        this.callsHandler(this.state.currentView, data.Views)
        return true
    }

    onAddSubmit = async (data: any) => {
        let formattedData: any = {}
        Object.keys(data).forEach(item => {
            formattedData[item.toLowerCase()] = data[item]
        })
        const response: any = await addItem(formattedData, this.state.currentSubView, this.state.currentSubView);
        console.log('add=>', data)
        if (response.data.successData.Success) {
            this.setState({
                rowData: response.data.successData.Payload.Data
            })
            return true
        } else {
            return false
        }
    }

    onEditSumbit = async (data: any) => {
        let formattedData: any = {}
        Object.keys(data).forEach(item => {
            formattedData[item.toLowerCase()] = data[item]
        })
        const response: any = await editData(formattedData, this.state.currentSubView, this.state.currentSubView);
        console.log('edit=>', data)
        if (response.data.successData.Success) {
            this.setState({
                rowData: response.data.successData.Payload.Data,
                selectedData: []
            })
            this.griApi && this.griApi.deselectAll()

            return true
        } else {
            return false
        }
    }

    handleChangeMainView = (mainView: string) => {
        const subView: any = this.state.pages.filter((page: any) => page.name === mainView)[0]
        if (subView.subViews[0].name === 'Cart') {
            this.setState({
                noGrid: true
            })
        } else {
            this.setState({
                noGrid: false
            })
        }
        this.callsHandler(mainView, subView.subViews)
    }

    onViewHistoryClicked = () => {
        this.setState({
            showHistoryDialog: true
        })
    }

    renderActions = (actions: any) => {
        this.setState({
            actionItems: {
                ...this.state.defaultActionItems,
                Search: this.state.actionItems.Search
            }
        })
        const addAction = actions.filter(element => element.Name === 'Add')
        const editAction = actions.filter(element => element.Name === 'Edit')
        const deleteAction = actions.filter(element => element.Name === 'Delete')
        const fileUploadAction = actions.filter(element => element.Name === 'ReadDocument')
        const viewHistory = actions.filter(element => element.Name === 'ViewHistory')

        if (addAction.length) {
            this.setState({
                actionItems: {
                    ...this.state.actionItems,
                    Add: {
                        ...this.state.actionItems.Add,
                        IsEntitled: true,
                        Fields: addAction[0].Fields
                    }
                }
            })
        }

        if (editAction.length) {
            this.setState({
                actionItems: {
                    ...this.state.actionItems,
                    Edit: {
                        ...this.state.actionItems.Edit,
                        IsEntitled: true,
                        Fields: addAction[0].Fields
                    }
                }
            })
        }

        if (deleteAction.length) {
            this.setState({
                actionItems: {
                    ...this.state.actionItems,
                    Delete: {
                        ...this.state.actionItems.Delete,
                        IsEntitled: true,
                        Fields: []
                    }
                }
            })
        }

        if (fileUploadAction.length) {
            this.setState({
                actionItems: {
                    ...this.state.actionItems,
                    ReadDocument: {
                        ...this.state.actionItems.ReadDocument,
                        IsEntitled: true,
                        Fields: []
                    }
                }
            })
        }

        if (viewHistory.length) {
            this.setState({
                actionItems: {
                    ...this.state.actionItems,
                    ViewHistory: {
                        ...this.state.actionItems.ViewHistory,
                        IsEntitled: true,
                        Fields: []
                    }
                }
            })
        }

    }

    onDeleteSubmit = async () => {
        const response: any = await deleteData(this.state.selectedData, this.state.currentSubView, this.state.currentSubView)
        console.log('delete=>', this.state.selectedData)
        if (response.data.successData.Success) {
            this.setState({
                rowData: response.data.successData.Payload.Data,
                selectedData: []
            })
            return true
        } else {
            return false
        }
    }

    onFileUpload = (data: any) => {
        console.log('fileUpload=>', data)
    }

    enhanceColumns = (selection: boolean, columnDefs) => {
        if (selection) {
            return [{
                headerName: 'Select',
                field: 'Select',
                minWidth: 33,
                maxWidth: 50,
                checkboxSelection: true,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                suppressMenu: true,
                filter: false,
                pinned: 'left',
                sortable: false,
                suppressSizeToFit: true,
            }, ...columnDefs]
        } else {
            return columnDefs
        }
    }

    callsHandler = async (view: string, subView: string | any[] | undefined) => {
        let subV = typeof subView === 'string' ? subView : subView === undefined ? this.state.currentSubView : subView[0].name
        const actionData: any = await getPageActionData(view, subV)
        const gridData: any = await getData(view, subV);
        this.renderActions(actionData.successData.Payload.Data)
        this.setState({
            actionData: actionData.successData.Payload.Data,
            rowData: gridData.data.successData.Payload.Data,
            columnDefs: !!gridData.data.successData.Payload.ColumnDefs.length ? this.enhanceColumns(true, gridData.data.successData.Payload.ColumnDefs) : [],
            currentSubView: subV,
            currentView: view
        })
        typeof subView !== 'string' && subView !== undefined && setTimeout(() => {
            this.handleSetSearchParams(subView)
        }, 0)
    }

    handleSetSearchParams = (subView: any) => {
        this.setState({
            actionItems: {
                ...this.state.actionItems,
                Search: {
                    ...this.state.actionItems.Search,
                    IsEntitled: !!subView.length,
                    Fields: [
                        {
                            Name: "Views",
                            DisplayName: "Views",
                            Type: "string",
                            Required: false,
                            FieldType: "dropDown",
                            DataSource: subView.map(view => {
                                return {
                                    Name: view.name,
                                    Value: view.name
                                }
                            })
                        }
                    ]
                }
            }
        })
    }

    async componentDidMount() {
        const pages: any = await getPages();
        let defaultPage: any = {};
        pages.successData.Payload.Data.forEach(page => {
            if (page.default) {
                defaultPage = page
            }
        })
        !Object.keys(defaultPage).length && (defaultPage = pages.successData.Payload.Data[0])
        this.setState({
            default: {
                [defaultPage.name]: true,
            },
            pages: pages.successData.Payload.Data,
            currentView: defaultPage.name
        })

        if (defaultPage.subViews[0].name === 'Cart') {
            this.setState({
                noGrid: true
            })
        } else {
            this.setState({
                noGrid: false
            })
        }
        this.callsHandler(defaultPage.name, defaultPage.subViews)
    }

    fetchHistoryData = async () => {
        const response = await getHistoryData(this.state.currentView, this.state.currentSubView)
        return response
    }

    handleOnDialogClose = () => {
        this.setState({
            showHistoryDialog: false
        })
    }

    onSelectionChanged = (selectedData: any) => {
        this.setState({
            selectedData: selectedData.api.getSelectedRows()
        })
        // console.log(selectedData)
    }

    makePageDefault = async (view: any) => {
        const response: any = await makeViewDefault(view);
        if (response.data.successData.Success) {
            this.setState({
                default: {
                    [view]: true
                }
            })
        }
    }

    returnGridApi = (gridApi: any) => {
        this.griApi = gridApi
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Navigation handleChangeMainView={this.handleChangeMainView} makePageDefault={this.makePageDefault} default={this.state.default} pages={this.state.pages} />
                <main className={classes.content}>
                    <ActionPane views={{
                        mainView: this.state.currentView,
                        subView: this.state.currentSubView
                    }} selectedData={this.state.selectedData} actionItems={this.state.actionItems} />

                    {!this.state.noGrid ? <AgGrid
                        height={812}
                        returnGridApi={this.returnGridApi}
                        onSelectionChanged={this.onSelectionChanged} rowData={this.state.rowData} columnDefs={this.state.columnDefs} /> : <MyCart />}
                </main>
                {this.state.showHistoryDialog && (
                    <History
                        show={this.state.showHistoryDialog}
                        title={this.state.currentView}
                        onDialogClose={this.handleOnDialogClose}
                        fetchData={this.fetchHistoryData}
                        sizeColumnsToFit={true}
                    />
                )}
            </div>
        );
    }
}

export default withStyles(useStyles)(SinglePage)