import React from 'react';

class CardBack extends React.Component{
    constructor(){
        super()
        this.state={
            options: []
        }
    }

    componentDidMount = () => {

        this.props.questionObj.incorrect_answers.push(this.props.questionObj.correct_answer)

        this.setState({
            options: this.props.questionObj.incorrect_answers
        })
    }


    render(){
        // console.log(props)
        return (
            <div className="card card-font" style={{width: "16rem", height: "16rem", textAlign: "center", margin: "14px", backgroundColor: "#1400BC"}} >
                <div className="card-body">
                    <h5 className="card-title">
                        {this.props.question.replace(/(&quot;|&#039;|&|acute;|amp;|;)/g, '')}
                        <div style={{fontSize: "3vh"}}>
                            <br/>
                            {this.props.questionObj.type === "multiple" ? (
                                this.state.options.map(answer => {
                                    return <p key={answer}>{answer}</p>
                                })
                            ): null }
                        </div>
                    </h5>
                </div>    
            </div>
        )
    }
}

export default CardBack