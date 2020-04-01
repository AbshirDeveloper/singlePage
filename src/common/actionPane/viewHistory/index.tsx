import React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Datagrid from '../../dataGrid'
import StyledDialog from '../../StyledDialog'
import './index.css'

const styles = createStyles({
    paperWidthSm: {
        maxWidth: '100%',
    },
    contentRoot: {
        padding: '0px 24px 0px',
    },
    actionRoot: {
        justifyContent: 'center',
    },
    dataGrid: {
        height: '470px'
    },
    dataGridAndError: {
        height: '250px'
    },
    titleRoot: {
        padding: '14px 14px 10px 24px',
        textAlign: 'center',
    }
});

type ViewHistoryProps = {
    show: boolean;
    title: string;
    onDialogClose: () => void;
    fetchData: () => any;
    sizeColumnsToFit?: boolean;
    enhanceColumns?: (columnsInfo: any) => any;
    rowStyles?: any;
    otherGridOptions?: any;
} & WithStyles<typeof styles>;


type ViewHistoryState = {
    rowData: Array<any>;
    columnDefs: any[];
    isDataLoading: boolean;
    primaryKey: Array<string>;
    showError: boolean;
    errorMsg: string;
};

const defaultState = {
    rowData: [],
    columnDefs: [],
    isDataLoading: true,
    primaryKey: [],
    showError: false,
    errorMsg: '',
};
class ViewHistory extends React.Component<ViewHistoryProps, ViewHistoryState> {
    state = defaultState

    async componentDidMount() {
        const response = await this.props.fetchData()
        if (response.data.successData.Success) {
            this.setState({
                rowData: response.data.successData.Payload.Data,
                columnDefs: response.data.successData.Payload.ColumnDefs
            })
        }
    }
    renderError = () => {
        return (<div className="error-display" key="errorMsg" title={this.state.errorMsg}>
            <span className="error-string">{this.state.errorMsg}</span>
        </div>);
    }
    handleOnClose = () => {
        this.props.onDialogClose();
    }

    renderContent = () => {
        const { classes } = this.props;
        return (
            <div>
                <div className={classNames(classes.dataGrid, {
                    [classes.dataGridAndError]: this.state.showError
                })}>
                    <div
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                        className="ag-theme-balham">
                        <Datagrid
                            rowData={this.state.rowData}
                            columnDefs={this.state.columnDefs}
                            isDataLoading={this.state.isDataLoading}
                            primaryKey={this.state.primaryKey}
                            height={450}
                            gridOptions={{
                                floatingFilter: false,
                                rowGroupPanelShow: 'never',
                                onFirstDataRendered: (params: any) => {
                                    if (this.props.sizeColumnsToFit && params && params.api) {
                                        params.api.sizeColumnsToFit();
                                    }
                                },
                                rowClassRules: this.props.rowStyles,
                                ...this.props.otherGridOptions
                            }}
                            hideActionPane={true}
                        />
                    </div>
                </div>
            </div>)
    }

    render() {
        return (
            <StyledDialog title={this.props.title}
                maxWidth={"lg"}
                onDialogClose={this.props.onDialogClose}
                content={this.renderContent()}
                inProgress={this.state.isDataLoading}
            />
        );
    }
}

export default withStyles(styles)(ViewHistory);