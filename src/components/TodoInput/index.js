import React from "react"
import {OutlinedInput} from "@mui/material";

const TodoInput = ({sx = {},value,onChange,placeholder="Please enter task"}) => {
    return <OutlinedInput
        sx={Object.assign({flexGrow:2,height:"4rem",fontSize:"1.5rem"},sx)}
        value={value} onChange={onChange} placeholder={placeholder} />

}

export default TodoInput