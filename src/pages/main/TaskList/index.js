import React from "react"
import {connect} from "react-redux"
import {List} from "@mui/material";
import TaskItem from "./TaskItem";
import dragAndRemove from "../../../hoc/dragAndRemove";
import {REMOVE_TASK} from "../../../redux/actions"

const RemovableTaskItem = dragAndRemove(TaskItem)

const TaskList = ({removeTask,tasks}) => {

    return <List sx={{margin:0,padding:0}}>
        {
            tasks.map(({name,_id,finished}) => {
                return <RemovableTaskItem onRemove={() => removeTask(_id)} name={name} finished={finished} taskId={_id} key={_id} />
            })
        }
        </List>
}

const mapDispatchToProps = (dispatch) => ({
    removeTask : (id) => dispatch({
        payload:{id},
        type:REMOVE_TASK
    })
})

const mapStateToProps = ({tasks}) => ({tasks})
export default connect(mapStateToProps,mapDispatchToProps)(TaskList)

