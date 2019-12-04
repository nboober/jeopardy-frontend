import React from 'react';

let LoginForm = (props) => {
    
    return (
        <div style={{textAlign: "center", backgroundImage: "linear-gradient(to left bottom, #051937, #331a4c, #66004b, #900033, #a40101)", height: "100vh", color: "white"}}>
           <div style={{paddingTop: "15%"}}>
            <h2 className="title-font" style={{color: "#FBCA76"}}>Ready to Play Jeopardy?</h2>
            <form onSubmit={props.login}>
                <div className="row d-flex justify-content-center" >
                    <input className="form-control col-sm-5" type='text' placeholder='Enter Username' value={props.username} name='username' onChange={props.collect}/>
                    <input className="form-control col-sm-5" type='password' placeholder='Enter Password'value={props.password} name='password'onChange={props.collect}/>
                    <input className="btn btn-warning col-sm-3" type='submit' value='Login'/>
                </div>
            </form>
           </div>
        </div>
    )
}

export default LoginForm