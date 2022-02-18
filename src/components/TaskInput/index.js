import React,{Component} from "react"
import {connect} from "react-redux"
import {Button, OutlinedInput, TextField} from "@mui/material";
import {Add as AddIcon} from '@mui/icons-material';
import "./style.css"
import {ADD_TASK} from "../../redux/actions";
import TodoInput from "../TodoInput";
import TodoButton from "../TodoButton";


class TaskInput extends Component {

    constructor(props) {
        super(props)
        this.state = {
            value : "",
            waiting:false
        }
    }

    handleChange = ({target:{value}}) => {
        this.setState({
            value
        })
    }

    handleClick = () => {

        const {value} = this.state
        const {addTask} = this.props

        this.setState({
            waiting:true,
            value:""
        })
        fetch("http://localhost:8080/lists/genesis/tasks/create",{
            method:"POST",
            cors:"cors",
            body:JSON.stringify({
                name:value
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(r => r.json())
            .then(({success,payload}) => {
                if(success){
                    addTask(payload)
                }
            })
            .finally(() => {
                this.setState({
                    waiting:false
                })
            })
    }

    render(){
        const {value,waiting} = this.state
        return <div className={"task-input"}>
            <TodoInput onChange={this.handleChange} value={value}/>
            <TodoButton waiting={false} icon={<AddIcon/>} onClick={this.handleClick} disabled={value === "" || waiting}/>
        </div>
    }
}

const mapDispatchToProps = (dispatch) => ({
    addTask:(task) => dispatch({
        type:ADD_TASK,
        payload:task
    })

})

export default connect(null,mapDispatchToProps)(TaskInput)