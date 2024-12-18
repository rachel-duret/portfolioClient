import React, {useContext, useRef} from 'react'
import PropTypes from 'prop-types'
import {loginCall} from "../apiCalls";

const LoginPage = props => {
    const username = useRef();
    const password = useRef();
    //const {isFetching, dispatch} = useContext()
    const handleLogin =event => {
        event.preventDefault()
        loginCall(
            {
                username: username.current.value,
                password: password.current.value
            }
        );

    }

    return (
        <div>
            <form action="" onSubmit={handleLogin}>
                <input name="username" className="text-center" ref={username} type="email" placeholder="Email" required/>
                <input name="password" className="" ref={password} type="password" placeholder="Password" required/>
                <button type="submit" >Login</button>

            </form>
        </div>
    )
}
LoginPage.propTypes = {}
export default LoginPage
