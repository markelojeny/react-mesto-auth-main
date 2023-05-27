import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import * as auth from '../utils/auth.js';
import registerOk from '../images/ok.svg'
import registerNotOk from '../images/not_ok.svg'

const Register = (props) => {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    auth.register(formValue.email, formValue.password)
    .then(() => {
      console.log(formValue.email)
      console.log(formValue.password)
      props.setPopupImage(registerOk);
      props.setPopupText("Вы успешно зарегистрировались!");
      navigate('/signin', {replace: true});
    })
    .catch(() => {
      props.setPopupImage(registerNotOk);
      props.setPopupText("Что-то пошло не так! Попробуйте ещё раз.");
    })
    .finally(props.goodClick);
  }

  return (
    <div className="login">
        <p className="login__welcome">Регистрация</p>
        <form autoComplete="off" onSubmit={handleSubmit} className="login__form">
            <input autoComplete="off" className="login__input" required id="email" name="email" type="text" value={formValue.email} placeholder="Email" onChange={handleChange} />
            <input autoComplete="off" className="login__input" required id="password" name="password" type="password" value={formValue.password} placeholder="Пароль" onChange={handleChange} />
            <button onSubmit={handleSubmit} type="submit" className="login__button">Зарегистрироваться</button>
        </form>
        <div className="login__signin">
            <p className="login__text">Уже зарегистрированы? <Link to="../signin" className="login__link">Войти</Link></p>
        </div>
    </div>
)
}

export default Register;