import React from 'react';
import clsx from 'clsx';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import {
    Button,
    TextField,
} from '@material-ui/core';
import { FormProps } from './types'

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

class RegisterForm extends React.Component<FormProps, any> {
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

    handleChange = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        const errors = this.state.formState.errors
        if (name === 'email') {
            const valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
            errors['email'] = !valid ? {
                error: !valid,
                errorMessage: 'Email format is not right'
            } : false
        }

        if (name === 'confirmPassword') {
            const err = value === this.state.formState.values.password
            errors['confirmPassword'] = !err ? {
                error: err,
                errorMessage: "Passwords don't match"
            } : false
        }

        if (name === 'password') {
            const valid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value);
            errors['password'] = !valid ? {
                error: !valid,
                errorMessage: "Password must be atlease 8 characters long and contain upper and lower case characters"
            } : false
        }
        this.setState({
            formState: {
                ...this.state.formState,
                values: {
                    ...this.state.formState.values,
                    [name]: value,
                },
                touched: {
                    ...this.state.touched,
                    [name]: true
                }
            }
        })
        event.persist();
    };

    handleSubmit = (event: any) => {
        event.preventDefault();
        this.props.onFormSubmit && this.props.onFormSubmit(this.state.formState.values)
    };


    hasError = (field: any) => !!(this.state.formState.touched[field] && this.state.formState.errors[field]);

    render() {
        const { className, classes, ...rest } = this.props
        const allAreFilled = Object.values(this.state.formState.values).length === 6;
        const nonIsEmpty = Object.values(this.state.formState.values).some((val: any) => val.length === 0);
        const error = Object.values(this.state.formState.errors).some((val: any) => val !== false)
        return (
            <form
                className={clsx(classes.root, className)}
                onSubmit={this.handleSubmit}
            >
                <div className={classes.fields}>
                    <TextField
                        error={this.hasError('ID')}
                        helperText={
                            this.hasError('id') ? this.state.formState.errors.id.errorMessage : null
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
                            this.hasError('firstName') ? this.state.formState.errors.firstName.errorMessage : null
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
                            this.hasError('lastName') ? this.state.formState.errors.lastName.errorMessage : null
                        }
                        label="Last name"
                        name="lastName"
                        onChange={this.handleChange}
                        value={this.state.formState.values.lastName || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('email')}
                        helperText={this.hasError('email') ? this.state.formState.errors.email.errorMessage : null}
                        label="Email address"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.formState.values.email || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('password')}
                        helperText={
                            this.hasError('password') ? this.state.formState.errors.password.errorMessage : null
                        }
                        label="Password"
                        name="password"
                        onChange={this.handleChange}
                        type="password"
                        value={this.state.formState.values.password || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('confirmPassword')}
                        helperText={
                            this.hasError('confirmPassword') ? this.state.formState.errors.confirmPassword.errorMessage : null
                        }
                        label="Confirm Password"
                        name="confirmPassword"
                        onChange={this.handleChange}
                        type="password"
                        value={this.state.formState.values.confirmPassword || ''}
                        variant="outlined"
                    />
                </div>
                <Button
                    className={classes.submitButton}
                    color="secondary"
                    disabled={!(allAreFilled && !nonIsEmpty && !error)}
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
