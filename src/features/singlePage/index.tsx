import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from './components/Navigations'
import Typography from '@material-ui/core/Typography';
import { Props, State } from './types'
import { getPages, getPageActionData, getData, getHistoryData } from './actions'
import AgGrid from '../../common/dataGrid'
import ActionPane from '../../common/actionPane'
import History from '../../common/actionPane/viewHistory'
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
            currentView: 'FirstView',
            showHistoryDialog: false
        }
    }


    onViewHistoryClicked = () => {
        this.setState({
            showHistoryDialog: true
        })
    }

    renderActions = (actions: any) => {
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
                        Fields: []
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

    onAddSubmit = (data: any) => {
        console.log('add=>', data)
    }

    onEditSumbit = (data: any) => {
        console.log('edit=>', data)

    }

    onDeleteSubmit = (data: any) => {
        console.log('delete=>', data)
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

    async componentDidMount() {
        const pages: any = await getPages();
        const defaultPage = pages.successData.Payload.Data.filter(page => page.default)[0]
        const actionData: any = await getPageActionData(defaultPage.name)
        const gridData: any = await getData();
        this.renderActions(actionData.successData.Payload.Data)
        this.setState({
            pages: pages.successData.Payload.Data,
            actionData: actionData.successData.Payload.Data,
            rowData: gridData.data.successData.Payload.Data,
            columnDefs: this.enhanceColumns(true, gridData.data.successData.Payload.ColumnDefs),

        })
    }

    fetchHistoryData = async () => {
        const response = await getHistoryData(this.state.currentView)
        return response
    }

    handleOnDialogClose = () => {
        this.setState({
            showHistoryDialog: false
        })
    }

    onSelectionChanged = (selectedData: any) => {
        // console.log(selectedData)
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <CssBaseline />
                <Navigation pages={this.state.pages} />
                <main className={classes.content}>
                    <ActionPane actionItems={this.state.actionItems} />
                    <AgGrid onSelectionChanged={this.onSelectionChanged} rowData={this.state.rowData} columnDefs={this.state.columnDefs} />
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