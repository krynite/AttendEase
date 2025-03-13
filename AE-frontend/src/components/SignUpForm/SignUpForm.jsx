import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Stack,
} from '@mui/material';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConf: '',
    });

    const { username, password, passwordConf } = formData;

    const handleChange = (event) => {
        // setMessage('');
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const newUser = await signUp(formData);
            setUser(newUser);
            navigate('/');
        } catch (err) {
            setMessage(err.message);
        }
    };

    const isFormInvalid = () => {
        return !(username && password && password === passwordConf);
    };

    // const capitalizeFirstLetter = (string) => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // };

    return (


        <Container maxWidth="sm">
            {/* <p>{message}</p> */}
            <h1>Sign Up Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label> <br />
                    <input type="text" id="name" name="username" value={username} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label> <br />
                    <input type="password" id="password" name="password" value={password} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="confirm">Confirm Password:</label> <br />
                    <input type="password" id="confirm" name="passwordConf" value={passwordConf} onChange={handleChange} required />
                </div>

                <button type="submit" disabled={isFormInvalid()}>Submit</button>
            </form>

        </Container>
    );
};

export default SignUpForm;
