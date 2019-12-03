import React from 'react';

let LoginForm = (props) => {
    console.log(props)
    return (
        <div>
            <h2>Ready to Play Jeopardy?</h2>
            <form>
                <input type='text' placeholder='Enter Username'/>
                <input type='password' placeholder='Enter Password'/>
                <input type='submit' value='Login' onClick={props.login}/>
            </form>
        </div>
    )
}

export default LoginForm