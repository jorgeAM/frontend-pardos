import React, { useState } from "react";
import styled from "styled-components";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  padding: 15px;
  height: 100vh;
  max-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: hidden;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: 700;
`;

const Input = styled.input`
  padding: 8px;
  width: 300px;
`;

const Submit = styled.input`
  padding: 13px;
  border-radius: 5px;
  border: none;
  color: white;
  background: black;
  background-color: #337ab7;
  border-color: #2e6da4;
`;

const URL = `${process.env.REACT_APP_URL_API_BASE}/login`;

const Login = props => {
  const [state, setState] = useState({
    email: "",
    password: ""
  });

  const onSubmit = async ev => {
    ev.preventDefault();

    const { email, password } = state;

    const payload = {
      email,
      password
    };

    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    const res = await fetch(URL, {
      method: "POST",
      headers,
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("auth-token", `Bearer ${data.token}`);
    }
  };

  const onChange = ev => {
    setState({
      ...state,
      [ev.target.name]: ev.target.value
    });
  };

  const renderRedirect = () => {
    const token = localStorage.getItem("auth-token");

    if (token) {
      return <Redirect to="/reservations" />;
    }
  };

  return (
    <Container>
      {renderRedirect()}
      <form onSubmit={onSubmit}>
        <InnerContainer>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="correo electrónico"
            name="email"
            value={state.email}
            onChange={onChange}
          />
        </InnerContainer>
        <InnerContainer>
          <Label>Password</Label>
          <Input
            type="password"
            placeholder="contraseña"
            name="password"
            value={state.password}
            onChange={onChange}
          />
        </InnerContainer>
        <Submit type="submit" value="Ingresar" />
      </form>
    </Container>
  );
};

export default Login;
