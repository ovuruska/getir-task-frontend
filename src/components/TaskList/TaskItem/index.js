import React,{Component} from "react"
import {connect} from "react-redux"
import {RENAME_TASK} from "../../../redux/actions";
import {Button, ListItem, ListItemText, OutlinedInput} from "@mui/material";
import {Edit as EditIcon,Done as TickIcon} from "@mui/icons-material";

import "../style.css"
import apiServer from "../../../constants/apiServer"
import TaskCheckbox from "./TaskCheckbox";





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

        if(readOnly){
            return <div className={"task-item"}>
                <TaskCheckbox taskId={taskId} finished={finished}/>
                <ListItem>
                    <ListItemText primary={value}/>
                </ListItem>
                <Button
                    className={"task-input__loading"}
                    onClick={this.handleEdit}
                    variant="contained"
                    startIcon={<EditIcon />}
                />
            </div>
        }else{
            return <div className={"task-item"}>
                <TaskCheckbox taskId={taskId} finished={finished}/>
                <OutlinedInput value={value} onChange={this.updateValue} placeholder="Please enter text" />
                <Button
                    disabled={waiting}
                    className={"task-input__loading"}
                    onClick={this.handleRename}
                    variant="contained"
                    startIcon={<TickIcon />}
                />
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
