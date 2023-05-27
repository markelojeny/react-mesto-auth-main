import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth.js';

const Login = (props) => {
    const navigate = useNavigate();
    //const location = useLocation();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password){
            return;
        }
        auth.authorize(formValue.email, formValue.password)
        .then((data) => {
            const jwt = localStorage.setItem('jwt', data.token);
            console.log(data.token);
            props.handleLogin();
            setFormValue({ email: '', password: '' });
            navigate('/', {replace: true});
        })
        .catch(err => console.log(err));
    }

    return (
        <div className="login">
            <p className="login__welcome">Вход</p>
            <form autoComplete="off" onSubmit={handleSubmit} className="login__form">
                <input autoComplete="off" className="login__input" required id="email" name="email" type="text" value={formValue.email || ""} placeholder="Email" onChange={handleChange} />
                <input autoComplete="off" className="login__input" required id="password" name="password" type="password" value={formValue.password || ""} placeholder="Пароль" onChange={handleChange} />
                <button onSubmit={handleSubmit} type="submit" className="login__button">Войти</button>
            </form>
        </div>
    )
}

export default Login;

//<p className="login__title">Регистрация</p>