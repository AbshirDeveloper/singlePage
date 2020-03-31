import React from 'react';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
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

class ActionPane extends React.Component<any, any>{
    constructor(props) {
        super(props)
        this.state = {
            selectedAction: {},
            expanded: false,
            selectedFields: {}
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
            return <Fields selectedFields={this.state.selectedFields} handleOnSwitchChange={this.handleOnSwitchChange} handleOnChange={this.handleOnChange} fields={action.Fields} />
        } else {
            return ''
        }
    }

    setSelectedAction = (action: string) => {
        this.setState({
            selectedAction: this.props.actionItems[action],
            expanded: true
        })
    }

    closeExpansionPanel = (e: any) => {
        this.setState({
            expanded: false
        })
    }

    renderActionIcons = () => {
        let icons = [<Tooltip key={'close'} placement="bottom" title="Close">
            <IconButton style={{ float: 'right' }} onClick={this.closeExpansionPanel} color="inherit">
                <CloseIcon />
            </IconButton>
        </Tooltip>];
        Object.values(this.props.actionItems).forEach((item: any) => {
            let icon: any = ''
            switch (item.Name) {
                case 'Add':
                    icon = <Tooltip key={item.Name} placement="bottom" title="Add">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('Add')} color="inherit">
                                <AddIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'Edit':
                    icon = <Tooltip key={item.Name} placement="bottom" title="Edit">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('Edit')} color="inherit">
                                <EditIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'Delete':
                    icon = <Tooltip key={item.Name} placement="bottom" title="Delete">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('Delete')} color="inherit">
                                <DeleteForeverIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'ReadDocument':
                    icon = <Tooltip key={item.Name} placement="bottom" title="File Upload">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={() => this.setSelectedAction('ReadDocument')} color="inherit">
                                <AttachFileIcon />
                            </IconButton>
                        </span>
                    </Tooltip>
                    break;
                case 'ViewHistory':
                    icon = <Tooltip key={item.Name} placement="bottom" title="View History">
                        <span>
                            <IconButton disabled={!item.IsEntitled} onClick={item.onSubmit} color="inherit">
                                <HistoryIcon />
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
        this.state.selectedAction.onSubmit(this.state.selectedFields)
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