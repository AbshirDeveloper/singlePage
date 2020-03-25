import React from 'react';
import clsx from 'clsx';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
} from '@material-ui/core';

const useStyles = createStyles((theme: Theme) => ({
    root: {},
    fields: {
        margin: theme.spacing(-1),
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            flexGrow: 1,
            margin: theme.spacing(1)
        }
    },
    policy: {
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    submitButton: {
        marginTop: theme.spacing(2),
        width: '100%'
    }
}));

class RegisterForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            formState: {
                isValid: false,
                values: {},
                touched: {},
                errors: {}
            }
        }
    }

    validate = (type: string, value: string) => {
        switch (type) {
            case 'email':
                const format = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/";
                return !!value.match(format)
            case 'confirm-password':
                return value === this.state.formState.values.password
            default:
                return true
        }
    }

    handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        const errors = this.state.formState.errors
        if (name === 'email' || name === 'confirmPassword') {
            const valid = this.validate(event.target.name, event.target.value);
            debugger
            if (valid) {
                errors[name] = name === 'email' ? 'Email is not in correct format' : "Passwords don't match"
            } else {
                errors[name] = ''
            }
        }
        console.log(errors)
        this.setState({
            formState: {
                ...this.state.formState,
                values: {
                    ...this.state.formState.values,
                    [name]: value,
                    error: errors
                }
            }
        })
        event.persist();
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
    };

    hasError = (field: any) => !!(this.state.formState.touched[field] && this.state.formState.errors[field]);

    render() {
        const { className, classes, ...rest } = this.props

        return (
            <form
                {...rest}
                className={clsx(classes.root, className)}
                onSubmit={this.handleSubmit}
            >
                <div className={classes.fields}>
                    <TextField
                        error={this.hasError('ID')}
                        helperText={
                            this.hasError('id') ? this.state.formState.errors.id : null
                        }
                        label="ID"
                        name="id"
                        type="number"
                        onChange={this.handleChange}
                        value={this.state.formState.values.id || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('firstName')}
                        helperText={
                            this.hasError('firstName') ? this.state.formState.errors.firstName : null
                        }
                        label="First name"
                        name="firstName"
                        onChange={this.handleChange}
                        value={this.state.formState.values.firstName || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('lastName')}
                        helperText={
                            this.hasError('lastName') ? this.state.formState.errors.lastName : null
                        }
                        label="Last name"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.formState.values.lastName || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('email')}
                        helperText={this.hasError('email') ? this.state.formState.errors.email : null}
                        label="Email address"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.formState.values.email || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('password')}
                        helperText={
                            this.hasError('password') ? this.state.formState.errors.password : null
                        }
                        label="Password"
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        value={this.state.formState.values.password || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('password')}
                        helperText={
                            this.hasError('confirm password') ? this.state.formState.errors.password : null
                        }
                        label="Confirm Password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        type="password"
                        value={this.state.formState.values.password || ''}
                        variant="outlined"
                    />
                </div>
                <Button
                    className={classes.submitButton}
                    color="secondary"
                    disabled={!this.state.formState.isValid}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Create account
            </Button>
            </form>
        );
    }
}

export default withStyles(useStyles)(RegisterForm);
