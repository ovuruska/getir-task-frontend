import React,{Component} from "react"
import {connect} from "react-redux"
import {RENAME_TASK} from "../../../redux/actions";
import {Button, CircularProgress, ListItem, ListItemText, OutlinedInput} from "@mui/material";
import {Edit as EditIcon,Done as TickIcon} from "@mui/icons-material";

import "./style.css"
import apiServer from "../../../constants/apiServer"
import TaskCheckbox from "./TaskCheckbox";
import TodoButton from "../../TodoButton";
import TodoInput from "../../TodoInput";
import TodoItem from "../../TodoItem";





class Index extends Component {

    constructor(props){
        super(props)
        const {name} = this.props
        this.state = {
            readOnly:true,
            value:name,
            waiting:false
        }
    }

    handleEdit = () => {
        this.setState({
            readOnly:false
        })
    }

    handleRename = () => {
        const {taskId,renameTask} = this.props
        const {value} = this.state

        this.setState({
            waiting:true
        })
        fetch(`${apiServer}/lists/genesis/tasks/toggle`,{
            method:"POST",
            cors:"cors",
            body:JSON.stringify({
                id:taskId,
                name:value
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
            .then(r => r.json())
            .then(({success,payload}) => {
                if(success){
                    renameTask(payload)
                }
            })
            .finally(() => {
                this.setState({
                    waiting:false,
                    readOnly:true
                })

            })
    }

    updateValue = ({target:{value}}) => {
        this.setState({value})
    }

    render(){
        const {readOnly,value,waiting} = this.state
        const {taskId,finished} = this.props

        const className = "task-item " + ((finished) ? "task-item--finished" : "")

        if(readOnly){
            return <div className={className}>
                <TaskCheckbox taskId={taskId} finished={finished}/>
                <TodoItem value={value}/>
                <TodoButton disabled={value===""} icon={<EditIcon/>} onClick={this.handleEdit} waiting={waiting}/>

            </div>
        }else{
            return <div className={className}>
                <TaskCheckbox taskId={taskId} finished={finished}/>
                <TodoInput value={value} onChange={this.updateValue}/>
                <TodoButton disabled={value===""} icon={<TickIcon/>} onClick={this.handleRename} waiting={waiting}/>
            </div>
        }
    }

}



const mapDispatchToProps = (dispatch,{id}) => ({
    renameTask:(name) => dispatch({
        type:RENAME_TASK,
        payload:{
            id,
            name
        }
    }),

})

export default connect(null,mapDispatchToProps)(Index)
