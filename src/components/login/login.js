import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import './login.scss';
import {sha256} from 'js-sha256';
import axios from 'axios';
const Login = () => {
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BE_URL}/auth/login`, {
            headers: {
                "token": localStorage.getItem("token")
            }
        })
        .then((res) => {
            if(res.data.auth){
                history.push('/admin')  
            }
        })
    });

    const history = useHistory();
    const [loginState, setLoginState] = useState({
        username: '',
        password: '',
        authUser: '',
        auth: false
    });

    const handleChange = (e) => {
        setLoginState({
            ...loginState,
            [e.target.id]: e.target.value
        });
    }

    const handleClick = () => {
        if(loginState.username && loginState.password){
            const hash = sha256(loginState.password);
            const username = loginState.username;
            axios.post(`${process.env.REACT_APP_BE_URL}/auth/login`, {
                username: username,
                password: hash
            }).then((res) => {
                if(res.data.auth){
                    localStorage.setItem("token", res.data.token)
                    history.push('/admin')
                }else{
                    alert('NO')
                }
            }).catch(()=>{
                alert('NOO')
            })
        }
    }

    return (
        <div className="page-container centered">
            <div className="form-card">
                <p className="text-title">LOGIN</p>
                <form>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="text" className="form-control" id="username" placeholder="Username" onChange={handleChange}  />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-12">
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={handleChange} />
                        </div>
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-12">
                            <button type="button" className="btn btn-primary btn-block" onClick={handleClick} disabled={!(loginState.username && loginState.password)}>LOGIN</button>
                        </div>
                    </div>
                </form>
                <p className="text-subtitle clickable" onClick={() => history.push('/')}>Back to homepage</p>
            </div>
        </div>

    )
}

export default Login;
