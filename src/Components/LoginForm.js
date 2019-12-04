import React from 'react';

let LoginForm = (props) => {
    
    return (
        <div style={{textAlign: "center", backgroundImage: "linear-gradient(to left bottom, #051937, #331a4c, #66004b, #900033, #a40101)", height: "100vh", color: "white"}}>
            <h2 className="title-font">Ready to Play Jeopardy?</h2>
            <form onSubmit={props.login}>
                <input type='text' placeholder='Enter Username' value={props.username} name='username' onChange={props.collect}/>
                <input type='password' placeholder='Enter Password'value={props.password} name='password'onChange={props.collect}/>
                <input type='submit' value='Login'/>
            </form>
        </div>
    )
}

export default LoginForm