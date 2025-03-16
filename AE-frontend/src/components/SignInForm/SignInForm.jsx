import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signIn } from "../../services/authService"
import { UserContext } from "../../contexts/UserContext"

const SignInForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext)
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;

    const handleChange = (event) => {
        // console.log("handleChange")
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const isFormInvalid = () => {
        return !(username && password);
    };

    const handleSubmit = async (event) => {
        // console.log("handleSubmit")
        event.preventDefault();
        try {
            const signedInUser = await signIn(formData);
            setUser(signedInUser)
            // console.log(signedInUser)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }

    }

    const signUpButton = () => {
        navigate('/sign-up')
    }

    return (
        <>
            <h1>Sign In Form</h1>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label> <br />
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label> <br />
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>

                <button type='submit' disabled={isFormInvalid()}>Login</button>
                <button onClick={signUpButton}> Create New User</button>
                {/* <Link to={`/sign-up`}>Click here to Sign Up</Link> */}
            </form >
        </>
    )
}


export default SignInForm;