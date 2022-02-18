import {ListItem, ListItemText} from "@mui/material";
import React from "react";

const TodoItem = ({sx={},value=""}) => {
    return <ListItem>
        <ListItemText
            sx={Object.assign({display:"flex",alignItems:"center",flexGrow:1,height:"4rem",fontSize:"1.5rem"},sx)}
           primary={value}
        />
    </ListItem>
}

export default TodoItem
