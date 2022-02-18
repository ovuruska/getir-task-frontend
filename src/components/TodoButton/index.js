import React from "react"
import {Button, CircularProgress} from "@mui/material";

const TodoButton = ({sx = {}, onClick = null, disabled = false, icon = null, waiting = false}) => {

    if (waiting) {
        return <CircularProgress size={"4rem"}/>
    } else {
        return <Button
            sx={Object.assign({height: "4rem", width: "4rem"}, sx)}
            onClick={onClick}
            disabled={disabled}
            variant="contained"
        >{icon}</Button>
    }

}

export default TodoButton