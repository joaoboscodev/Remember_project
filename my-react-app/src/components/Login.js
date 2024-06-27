import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState({
    minLength: true,
    hasUpperCase: true,
    hasEspecialChar: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailValid || !passwordValid) {
      return;
    }
    // Aqui você pode adicionar a lógica de autenticação
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    setEmailValid(validateEmail(emailValue));
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const isValid = validatePassword(passwordValue);
    setPasswordValid(isValid.minLength && isValid.hasUpperCase && isValid.hasEspecialChar);
    setPasswordErrors(isValid);
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasEspecialChar = /[@!#$%^&*()/\\]/.test(password);
    return { minLength: hasMinLength, hasUpperCase: hasUpperCase, hasEspecialChar: hasEspecialChar };
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {!emailValid && <p className="error">Por favor, insira um email válido.</p>}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {!passwordErrors.minLength && <p className="error">A senha deve ter pelo menos 8 caracteres.</p>}
            {!passwordErrors.hasUpperCase && <p className="error">A senha deve conter pelo menos uma letra maiúscula.</p>}
            {!passwordErrors.hasEspecialChar && <p className="error">A senha deve conter pelo menos um caracter especial.</p>}
          </div>
          <button type="submit" disabled={!emailValid || !passwordValid}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
