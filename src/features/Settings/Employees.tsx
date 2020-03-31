import React from 'react';
import clsx from 'clsx';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { EmployeesState, EmployeesProps } from './types'
const useStyles = createStyles((theme: Theme) => ({
  root: {},
  action: {
    marginRight: 0,
    marginTop: 0
  },
  overview: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
      alignItems: 'flex-start'
    }
  },
  product: {
    display: 'flex',
    alignItems: 'center'
  },
  productImage: {
    marginRight: theme.spacing(1),
    height: 48,
    width: 48
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  notice: {
    marginTop: theme.spacing(2)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

class Employees extends React.Component<EmployeesProps, EmployeesState> {
  constructor(props) {
    super(props)
    this.state = {
      branches: [
        {
          Name: 'Bosaso',
          Value: 'Bosaso'
        },
        {
          Name: 'Hargeisa',
          Value: 'Hargeisa'
        }
      ],
      employees: {

      }
    }
  }

  componentDidMount() {
    let employees = {}
    this.props.employees.forEach(emp => {
      employees[emp.id] = emp
    })
    this.setState({
      employees: employees
    })
  }

  handleChange = (e: any) => {
    this.setState({
      employees: {
        ...this.state.employees,
        [e.target.name]: {
          ...this.state.employees[e.target.name],
          active: e.target.checked
        }
      }
    })
  }

  hanldeChangeBranch = (e: any) => {
    this.setState({
      employees: {
        ...this.state.employees,
        [e.target.name]: {
          ...this.state.employees[e.target.name],
          branch: e.target.value
        }
      }
    })
  }

  submitEmployeeUpdate = (e: any) => {
    this.props.updateEmployee(Object.values(this.state.employees))
  }
  render() {
    const { className, employees, classes, ...rest } = this.props
    const activateUpdateButton = JSON.stringify(this.props.employees) === JSON.stringify(Object.values(this.state.employees));
    return (
      <Card
        className={clsx(classes.root, className)}
      >
        <CardHeader
          action={(
            <Button
              size="small"
              variant="contained"
              color="primary"
              disabled={activateUpdateButton}
              onClick={this.submitEmployeeUpdate}
            >
              Update employees
            </Button>
          )}
          classes={{ action: classes.action }}
          title="Employees list"
        />
        <Divider />
        <CardContent>
          {Object.keys(this.state.employees).length ?
            employees.map((employee, index) => {
              return <Card key={index}>
                <CardContent className={classes.overview}>
                  <div style={{ width: '100%' }}>
                    <Typography
                      display="inline"
                      variant="h4"
                    >
                      {`${employee.firstName} ${employee.lastName}`}
                    </Typography>
                    <div style={{ display: 'inline-block', float: 'right' }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel id="demo-simple-select-label">Branch</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name={`${employee.id}`}
                          value={this.state.employees[employee.id].branch}
                          onChange={this.hanldeChangeBranch}
                        >
                          {
                            this.state.branches.map((branch, index) => {
                              return <MenuItem key={index} value={branch.Value}>{branch.Name}</MenuItem>
                            })
                          }
                        </Select>
                      </FormControl>
                      <Tooltip placement="bottom" title={this.state.employees[employee.id].active ? 'Active' : 'Not Active'}>
                        <IconButton color="inherit">
                          <Switch
                            checked={this.state.employees[employee.id].active}
                            onChange={this.handleChange}
                            color="primary"
                            name={`${employee.id}`}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </CardContent>
                <CardContent className={classes.details}>
                  <div>
                    <Typography variant="body1">
                      {`Phone: ${employee.phone}`}
                    </Typography>
                    <Typography variant="body1">
                      {`Email: ${employee.email}`}
                    </Typography>
                  </div>
                </CardContent>
                <Divider />
              </Card>
            }) : ''
          }
        </CardContent>
      </Card>
    );

  }
}

export default withStyles(useStyles)(Employees);
