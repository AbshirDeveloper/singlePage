import React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fields from './fields'
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import { Tooltip, ClickAwayListener } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CloseIcon from '@material-ui/icons/Close';
import HistoryIcon from '@material-ui/icons/History';
import SearchIcon from '@material-ui/icons/Search';
import { Props, State } from './types'

const useStyles = createStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > div > div > div': {
            display: 'unset'
        }
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}),
);

class ActionPane extends React.Component<Props, State>{
    constructor(props) {
        super(props)
        this.state = {
            selectedAction: {},
            expanded: false,
            selectedFields: {}
        }
    }

    componentDidUpdate(prevProps: any) {
        if (prevProps.actionItems !== this.props.actionItems) {
            this.setState({
                selectedAction: {},
                expanded: false,
                selectedFields: {}
            })
        }
        if (prevProps.selectedData !== this.props.selectedData) {
            if (this.props.selectedData.length < 1 && this.state.selectedAction.Name === 'Edit') {
                this.setState({
                    selectedAction: {},
                    expanded: false,
                    selectedFields: {}
                })
            }
        }
    }

    handleOnChange = (event: any) => {
        const name = event.target.name
        const value = event.target.value

        this.setState({
            selectedFields: {
                ...this.state.selectedFields,
                [name]: value
            }
        })
    }

    handleOnSwitchChange = (event: any) => {
        const name = event.target.name
        const value = event.target.checked

        this.setState({
            selectedFields: {
                ...this.state.selectedFields,
                [name]: value
            }
        })
    }
    renderContents = () => {
        const action = this.state.selectedAction
        if (action.Fields && action.Fields.length) {
            return <Fields currentSubView={this.props.views.subView} selectedFields={this.state.selectedFields} handleOnSwitchChange={this.handleOnSwitchChange} handleOnChange={this.handleOnChange} fields={action.Fields} />
        } else {
            return ''
        }
    }

    setSelectedAction = (action: string) => {
        let selectedFields: any = {}
        if (this.props.actionItems[action].Name === 'Edit') {
            Object.keys(this.props.selectedData[0]).forEach(item => {
                selectedFields[item.replace(/^\w/, c => c.toUpperCase())] = this.props.selectedData[0][item]
            })
        }
        this.setState({
            selectedAction: this.props.actionItems[action],
            selectedFields: selectedFields,
            expanded: true
        })
    }

    closeExpansionPanel = (e: any) => {
        this.setState({
            expanded: false
        })
    }

    renderActionIcons = () => {
        let icons = [];
        Object.values(this.props.actionItems).forEach((item: any) => {
            let icon: any = ''
            switch (item.Name) {
                case 'Add':
                    icon = <Tooltip key={item.Name} placement="bottom" title="Add">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('Add')} color="inherit">
                                <AddIcon color={!item.IsEntitled ? "disabled" : "primary"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'Edit':
                    const disableEdit = !(item.IsEntitled && this.props.selectedData.length === 1)
                    icon = <Tooltip key={item.Name} placement="bottom" title="Edit">
                        <span>
                            <IconButton disabled={disableEdit} onClick={() => this.setSelectedAction('Edit')} color="inherit">
                                <EditIcon color={disableEdit ? "disabled" : "primary"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'Delete':
                    const disableDelete = !(item.IsEntitled && this.props.selectedData.length)
                    icon = <Tooltip key={item.Name} placement="bottom" title="Delete">
                        <span>
                            <IconButton disabled={disableDelete} onClick={item.onSubmit} color="inherit">
                                <DeleteForeverIcon color={disableDelete ? "disabled" : "error"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'Search':
                    icon = <Tooltip key={item.Name} placement="bottom" title="Search">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('Search')} color="inherit">
                                <SearchIcon color={!item.IsEntitled ? "disabled" : "primary"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'ReadDocument':
                    icon = <Tooltip key={item.Name} placement="bottom" title="File Upload">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('ReadDocument')} color="inherit">
                                <AttachFileIcon color={!item.IsEntitled ? "disabled" : "primary"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'ViewHistory':
                    icon = <Tooltip key={item.Name} placement="bottom" title="View History">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={item.onSubmit} color="inherit">
                                <HistoryIcon color={!item.IsEntitled ? "disabled" : "primary"} />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
            }
            icons.push(icon)
        })

        return icons
    }

    handleExpansionPanelOnChange = (event: any, expanded: boolean) => {
    }

    hanldeSubmitForm = () => {
        const response = this.state.selectedAction.onSubmit(this.state.selectedFields)
        if (response) {
            console.log('success')
            this.setState({
                selectedAction: {},
                expanded: false,
                selectedFields: {}
            })
        } else {
            console.log('error')
        }
    }

    hanldeClearForm = () => {
        this.setState({
            selectedFields: {},
            selectedAction: {},
            expanded: false
        })
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={this.state.expanded} onChange={this.handleExpansionPanelOnChange}>
                    <ExpansionPanelSummary
                        // expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        {this.renderActionIcons()}
                        {`${this.props.views.mainView} -> ${this.props.views.subView}`}
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                        {this.renderContents()}
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
                        <Button size="small" onClick={this.hanldeClearForm}>Cancel</Button>
                        <Button size="small" color="primary" onClick={this.hanldeSubmitForm}>
                            Save
                    </Button>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(useStyles)(ActionPane)