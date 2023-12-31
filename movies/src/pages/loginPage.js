import React, { useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router-dom";

const LoginPage = props => {
    const context = useContext(AuthContext);
    const {errorMessage} = useContext(AuthContext);
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [Message, setMessage] = useState("");


    const login = () => {
        context.authenticate(userName, password);
        
       if(errorMessage !== ""){
        setMessage(errorMessage);
       }
    };

    let location = useLocation();

    
    const { from } = location.state ? { from: location.state.from.pathname } : { from: "/" };

    if (context.isAuthenticated === true) {
        return <Navigate to={from} />;
    }
    return Message === "" ? (
        <>
            <h2>Login page</h2>
            <p>You must log in to view the protected pages </p>
            <input id="username" placeholder="user name" onChange={e => {
                setUserName(e.target.value);
            }}></input><br />
            <input id="password" type="password" placeholder="password" onChange={e => {
                setPassword(e.target.value);
            }}></input><br />
            {/* Login web form  */}
            <button onClick={login}>Log in</button>
            <p>Not Registered?
                <Link to="/signup">Sign Up!</Link></p>
        </>
    ):(
        <>
        <h2>Login page</h2>
        <p>{Message}</p>
        <input id="username" placeholder="user name" onChange={e => {
            setUserName(e.target.value);
        }}></input><br />
        <input id="password" type="password" placeholder="password" onChange={e => {
            setPassword(e.target.value);
        }}></input><br />
        {/* Login web form  */}
        <button onClick={login}>Log in</button>
        <p>Not Registered?
            <Link to="/signup">Sign Up!</Link></p>
    </>

    );
}; 

export default LoginPage;