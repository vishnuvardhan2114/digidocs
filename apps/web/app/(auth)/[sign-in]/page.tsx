import AuthForm from "../../components/AuthForm"
import { signIn } from "../../../lib/auth/actions"

const SignInPage = () => {
    return <AuthForm mode='sign-in' onSubmit={signIn} />
}

export default SignInPage