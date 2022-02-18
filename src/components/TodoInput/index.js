import React from "react"
import {OutlinedInput} from "@mui/material";

const TodoInput = ({sx = {},value,onChange,onKeyDown=null,placeholder="Please enter a task"}) => {
    return <OutlinedInput
        sx={Object.assign({flexGrow:2,height:"4rem"},sx)}
        value={value} onChange={onChange} onKeyDown={onKeyDown} placeholder={placeholder} />

}

export default TodoInput