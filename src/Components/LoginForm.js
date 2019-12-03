import React from 'react';

let LoginForm = (props) => {
    return (
        <div style={{textAlign: "center"}}>
            <h2>Ready to Play Jeopardy?</h2>
            <form onSubmit={props.login}>
                <input type='text' placeholder='Enter Username'/>
                <input type='password' placeholder='Enter Password'/>
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}

export default LoginForm