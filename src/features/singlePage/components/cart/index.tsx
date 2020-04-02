import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Table from './table'
import SummaryTable from './summaryTable'
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const IOSSwitch = withStyles((theme: Theme) => createStyles({
    root: {
        width: 42,
        height: 26,
        padding: 0,
        margin: theme.spacing(1),
    },
    switchBase: {
        padding: 1,
        '&$checked': {
            transform: 'translateX(16px)',
            color: theme.palette.common.white,
            '& + $track': {
                backgroundColor: '#52d869',
                opacity: 1,
                border: 'none',
            },
        },
        '&$focusVisible $thumb': {
            color: '#52d869',
            border: '6px solid #fff',
        },
    },
    thumb: {
        width: 24,
        height: 24,
    },
    track: {
        borderRadius: 26 / 2,
        border: `1px solid ${theme.palette.grey[400]}`,
        backgroundColor: theme.palette.grey[50],
        opacity: 1,
        transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
    focusVisible: {},
}),
)(({ classes, ...props }: any) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});


const myProducts = {}

class MyCart extends React.Component<any, any> {
    timeSlots: any
    constructor(props) {
        super(props)
        this.state = {
            checkedC: false
        }
        this.timeSlots = Array.from(new Array(24 * 2)).map(
            (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
        );
    }
    submit() {
    }
    addItem(key) {
    }

    renderSearchWithSuggestions = () => {
        return (
            <Autocomplete
                id="disabled-options-demo"
                options={this.timeSlots}
                getOptionDisabled={(option) => option === this.timeSlots[0] || option === this.timeSlots[2]}
                style={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField {...params} label="Disabled options" variant="outlined" />
                )}
            />
        )
    }

    handleChange = (e: any) => {
        this.setState({
            checkedC: e.target.checked
        })
    }
    render() {
        const products = myProducts
        return (
            <React.Fragment>
                <CssBaseline />
                <Container maxWidth="sm" style={{ marginLeft: 'unset', maxWidth: 715, display: 'inline-block', float: 'left', margin: 10 }}>
                    <Typography component="div" style={{ height: '200px' }}>
                        {this.renderSearchWithSuggestions()}
                        <Table />
                    </Typography>
                </Container>
                <Container maxWidth="sm" style={{ marginRight: 'unset', display: 'inline-block', margin: 10 }}>
                    <Typography component="div" style={{
                        height: '200px'
                    }} >
                        <Typography style={{
                            fontSize: '-webkit-xxx-large',
                            color: 'green'
                        }}>

                            $5687
                        </Typography>
                        <FormGroup>
                            <Typography component="div">
                                <Grid style={{ fontSize: 25 }} component="label" container alignItems="center" spacing={1}>
                                    <Grid item>Cash</Grid>
                                    <Grid item>
                                        <IOSSwitch checked={this.state.checkedC} onChange={this.handleChange} name="checkedC" />
                                    </Grid>
                                    <Grid item>Receivable</Grid>
                                </Grid>
                            </Typography>
                        </FormGroup>
                        {this.state.checkedC ? <SummaryTable /> : ''}
                        {!this.state.checkedC ?
                            <Button style={{ width: '50%' }} variant="contained" color="primary" disableElevation>
                                $Pay
                        </Button> :
                            <Button style={{ width: '50%' }} variant="contained" color="primary" disableElevation>
                                Submit
                        </Button>}
                    </Typography>
                </Container>
            </React.Fragment>
        )
    }
}

export default MyCart