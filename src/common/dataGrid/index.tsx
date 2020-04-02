import React, { Component } from 'react';
import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Props, State } from './types'

class AgGrid extends Component<Props, State> {
    gridApi: any
    gridColumnApi: any
    constructor(props) {
        super(props);

        this.state = {
            defaultColDef: {
                flex: 1,
                sortable: true,
                filter: true,
            },
        };
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.props.returnGridApi && this.props.returnGridApi(params.api)
    };

    render() {
        return (
            <div style={{ width: '100%', height: this.props.height ? this.props.height : '100%' }}>
                <div
                    id="myGrid"
                    style={{
                        height: '100%',
                        width: '100%',
                    }}
                    className="ag-theme-alpine"
                >
                    <AgGridReact
                        columnDefs={this.props.columnDefs}
                        defaultColDef={this.state.defaultColDef}
                        rowData={this.props.rowData}
                        floatingFilter={true}
                        onGridReady={this.onGridReady}
                        rowSelection='multiple'
                        onSelectionChanged={this.props.onSelectionChanged}
                        animateRows={true}
                        {...this.props}
                    />
                </div>
            </div>
        );
    }
}

export default AgGrid