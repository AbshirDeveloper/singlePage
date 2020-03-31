import React from 'react';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import Page from '../../common/Page';
import Header from './Header';
import General from './General';
import Employees from './Employees';
import Security from './Security';
import { updateEmployees, updatePassword, updateUserInfo, getEmployees, getBranches } from './actions'
import { UserInfo, Employee } from './types'
import { getSession } from '../../Utils/utls'
import SuccessSnackbar from '../../root/SuccessSnackbar';
import { Props, State } from './types'
const useStyles = createStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

const employeeTabs = [
  { value: 'general', label: 'General' },
  { value: 'security', label: 'Security' }
];

const adminTabs = [
  { value: 'general', label: 'General' },
  { value: 'employees', label: 'Employees' },
  { value: 'security', label: 'Security' }
];

class Settings extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      currentTab: 'general',
      employees: [],
      branches: [],
      openSnackbar: false,
      error: false
    }
  }

  async componentDidMount() {
    const employees: any = await getEmployees();
    const branches: any = await getBranches();
    this.setState({
      employees: employees.successData.Payload.Data,
      branches: branches.successData.Payload.Data
    })
  }

  handleTabsChange = (event: any, value: any) => {
    this.setState({
      currentTab: value
    })
  };

  updateEmployee = async (employees: Array<Employee>) => {
    const response: any = await updateEmployees(employees)
    if (response.successData.Success) {
      this.setState({
        openSnackbar: true,
        error: false
      })
    } else {
      this.setState({
        openSnackbar: true,
        error: true
      })
    }
  }

  updateInfo = async (info: UserInfo) => {
    const response: any = await updateUserInfo(info)

    if (response.successData.Success) {
      this.setState({
        openSnackbar: true,
        error: false
      })
    } else {
      this.setState({
        openSnackbar: true,
        error: true
      })
    }
  }

  updatePassword = async (newPassword: string) => {
    const response: any = await updatePassword(newPassword)
    if (response.successData.Success) {
      this.setState({
        openSnackbar: true,
        error: false
      })
    } else {
      this.setState({
        openSnackbar: true,
        error: true
      })
    }
  }

  handleSnackbarClose = () => {
    this.setState({
      openSnackbar: false
    })
  };
  render() {
    const { classes } = this.props
    const profile: any = getSession('userInfo');
    const tabs = !profile.userType ? adminTabs : employeeTabs
    return (
      <Page
        className={classes.root}
        title="Settings"
      >
        <Container maxWidth="lg">
          <Header />
          <Tabs
            className={classes.tabs}
            onChange={this.handleTabsChange}
            scrollButtons="auto"
            value={this.state.currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {this.state.currentTab === 'general' && <General updateInfo={this.updateInfo} profile={profile} />}
            {this.state.currentTab === 'employees' && <Employees employees={this.state.employees} updateEmployee={this.updateEmployee} />}
            {this.state.currentTab === 'security' && <Security updatePassword={this.updatePassword} />}
          </div>
        </Container>
        <SuccessSnackbar
          onClose={this.handleSnackbarClose}
          open={this.state.openSnackbar}
          error={this.state.error}
        />
      </Page>
    );

  }
}

export default withStyles(useStyles)(Settings);
