import React from 'react';
import Swal from 'sweetalert2'


class LoginForm  extends React.Component {

    patient = () => {
    Swal.fire({
        title: "Logging In",
        text: "Please Be Patient. Logging in may take a few seconds.",
        icon: "info",
        button: "Ok"
        });
    }
    
    render(){
        return(
        <div style={{textAlign: "center", backgroundImage: "linear-gradient(to left bottom, #051937, #331a4c, #66004b, #900033, #a40101)", height: "100vh", color: "white"}}>
           <div style={{paddingTop: "15%"}}>
            <h2 className="title-font" style={{color: "#FBCA76"}}>Ready to Play Jeopardy?</h2>
            <form onSubmit={this.props.login}>
                <div className="row d-flex justify-content-center" >
                    <input className="form-control col-sm-5" type='text' placeholder='Enter Username' value={this.props.username} name='username' onChange={this.props.collect}/>
                    <input className="form-control col-sm-5" type='password' placeholder='Enter Password'value={this.props.password} name='password'onChange={this.props.collect}/>
                    <input className="btn btn-warning col-sm-3" type='submit' value='Login' onClick={this.patient}/>
                </div>
            </form>
           </div>
        </div>

        )
    }
}
export default LoginForm