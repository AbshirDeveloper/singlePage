import React, { Component } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { createStyles, withStyles } from '@material-ui/core/styles';


const styles = createStyles({
    actionButton: {
        margin: '10px'
    },
    textFiled: {
        marginLeft: '20px',
        marginTop: '5px',
        minWidth: '160px'
    },
    timeFiled: {
        marginLeft: '20px',
        marginTop: '5px',
        minWidth: '90px'
    },
    switchField: {
        marginLeft: '1px',
        marginRight: '0px',
        paddingTop: '25px',
        minWidth: '160px',
        height: 53
    },
    dropDownField: {
        minWidth: '160px',
        marginLeft: '20px',
        marginTop: '5px'
    },
    dateFiled: {
        minWidth: '160px',
        marginLeft: '20px',
        marginTop: '5px'
    },
    dateLabelField: {
        transform: 'translate(0, 1.5px) scale(0.75)',
        transformOrigin: 'top left'
    }
});

class Add extends Component<any, any> {
    constructor(props) {
        super(props)
    }

    getTextField = (key: number, editFieldInfo: any) => {
        const { classes } = this.props;
        const value = this.props.selectedFields[editFieldInfo.Name] || ''

        const showMultiline = this.props.editParams && this.props.editParams.params.showTextFieldsInMultiline;
        return (
            <TextField
                className={classes.textFiled}
                key={key}
                label={editFieldInfo.DisplayName}
                name={editFieldInfo.Name}
                onChange={this.props.handleOnChange}
                value={value}
                required={editFieldInfo.Required}
                multiline={showMultiline}
                rowsMax={showMultiline ? '6' : '1'}
                title={this.props.selectedFields[editFieldInfo.Name]}
            />
        );
    };
    getSwitchField = (key: number, editFieldInfo: any) => {
        const { classes } = this.props;
        return (
            <FormControlLabel
                key={key}
                className={classes.switchField}
                control={
                    <Switch
                        checked={!!this.props.selectedFields[editFieldInfo.Name]}
                        name={editFieldInfo.Name}
                        onChange={this.props.handleOnSwitchChange}
                        value={editFieldInfo.Name}
                    />
                }
                label={editFieldInfo.DisplayName}
            />
        );
    };
    getSelectField = (key: number, editFieldInfo: any) => {
        const value = this.props.selectedFields[editFieldInfo.Name] || ''
        return (
            <FormControl key={key} className={this.props.classes.dropDownField}>
                <InputLabel id="demo-simple-select-label">{editFieldInfo.Name}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name={editFieldInfo.Name}
                    value={value}
                    required
                    onChange={this.props.handleOnChange}
                >
                    {editFieldInfo.DataSource.map((item: any, index: any) => {
                        return <MenuItem key={index} value={item.Value}>{item.Name}</MenuItem>
                    })}
                </Select>
            </FormControl>
        );
    };

    getDateField = (key: number, editFieldInfo: any) => {
        const { classes } = this.props;
        return (
            <TextField
                key={key}
                id="date"
                label="Birthday"
                type="date"
                name={editFieldInfo.Name}
                onChange={this.props.handleOnChange}
                className={classes.dateFiled}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        );
    };

    renderField = (field: any) => {

    }

    renderForm = () => {
        return this.props.fields.map((item: any, index: any) => {
            switch (item.FieldType) {
                case 'simple':
                    return this.getTextField(item.Name, item)
                case 'switch':
                    return this.getSwitchField(item.Name, item)
                case 'dropDown':
                    return this.getSelectField(item.Name, item)
                case 'date':
                    return this.getDateField(item.Name, item);
            }
        })
    }

    render() {
        return (
            <form>
                {this.renderForm()}
            </form>
        );
    }
}

export default withStyles(styles)(Add);