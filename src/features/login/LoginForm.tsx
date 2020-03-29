import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Button, TextField } from '@material-ui/core';
import { Theme, createStyles, withStyles } from '@material-ui/core/styles';
import { LoginFormProps, LoginFormState } from './types'
import { validateEmail } from '../../Utils/utls'

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
    submitButton: {
        marginTop: theme.spacing(2),
        width: '100%'
    }
}));

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {
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
        let isValid = true;
        if (name === 'email') {
            const valid = validateEmail(value)
            errors['email'] = !valid ? {
                error: !valid,
                errorMessage: 'Email is not right'
            } : false;
            isValid = valid
        }

        this.setState({
            formState: {
                ...this.state.formState,
                values: {
                    ...this.state.formState.values,
                    [name]: value,
                },
                touched: {
                    ...this.state.formState.touched,
                    [name]: true
                },
                isValid: isValid
            }
        })
        event.persist();
    };

    handleSubmit = async (event: any) => {
        event.preventDefault();
        this.props.onFormSubmit && this.props.onFormSubmit(this.state.formState.values)
    };

    hasError = (field: any) => (!!(this.state.formState.touched[field] && this.state.formState.errors[field]));

    render() {
        const { className, classes, ...rest } = this.props
        const allAreFilled = Object.values(this.state.formState.values).length === 2 && !Object.values(this.state.formState.values).some((val: any) => val.length === 0);
        return (
            <form
                className={clsx(classes.root, className)}
                onSubmit={this.handleSubmit}
            >
                <div className={classes.fields}>
                    <TextField
                        error={this.hasError('email')}
                        fullWidth
                        helperText={this.hasError('email') ? this.state.formState.errors.email.errorMessage : null}
                        label="Email address"
                        name="email"
                        onChange={this.handleChange}
                        value={this.state.formState.values.email || ''}
                        variant="outlined"
                    />
                    <TextField
                        error={this.hasError('password')}
                        fullWidth
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
                </div>
                <Button
                    className={classes.submitButton}
                    color="secondary"
                    disabled={!(this.state.formState.isValid && allAreFilled)}
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Sign in
                </Button>
            </form>
        );
    }
}

export default withStyles(useStyles)(LoginForm);
