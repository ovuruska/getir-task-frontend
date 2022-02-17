import React from "react"
import {connect} from "react-redux"
import {List} from "@mui/material";
import TaskItem from "./TaskItem";




const TaskList = ({tasks}) => {

    return <List>
        {
            tasks.map(({name,_id,finished}) => {
                return <TaskItem name={name} finished={finished} taskId={_id} key={_id} />
            })
        }
        </List>
}

const mapStateToProps = ({tasks}) => ({tasks})
export default connect(mapStateToProps)(TaskList)

