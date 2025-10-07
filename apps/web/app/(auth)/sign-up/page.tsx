import React from 'react'
import AuthForm from '../../components/AuthForm'
import { signUp } from '../../../lib/auth/actions'

const SignUpPage = () => {
  
    return <AuthForm mode='sign-up' onSubmit={signUp} />
}

export default SignUpPage