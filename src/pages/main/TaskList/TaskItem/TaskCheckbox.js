import React,{useState} from "react"
import {connect} from "react-redux";
import {Checkbox, CircularProgress} from "@mui/material";
import apiServer from "../../../../constants/apiServer";
import {TOGGLE_TASK} from "../../../../redux/actions";

const Container = ({children}) => {
    return <div style={{height:"4rem",width:"4rem",display: "flex",justifyContent:"center",alignItems:"center"}}>
        {children}
    </div>
}

const TaskCheckbox = ({finished,taskId,toggleTask}) => {

    const [waiting,setWaiting] = useState(false)

    const handleToggle = () => {

        setWaiting(true)

        fetch(`${apiServer}/lists/genesis/tasks/toggle`,{
            method:"POST",
            cors:"cors",
            body:JSON.stringify({
                id:taskId
            }),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then(r => r.json())
        .then(({success,payload}) => {
            if(success){
                toggleTask(payload)
            }
        })
        .finally(() => {
            setWaiting(false)

        })
    }
    if (waiting){
        return <Container >
            <CircularProgress/>
        </Container>
    }
    else{
        return <Container >
            <Checkbox onChange={handleToggle} checked={finished}/>
        </Container>
    }


}

const mapDispatchToProps = (dispatch,{taskId}) => {
    return {
        toggleTask: () => dispatch({
            type: TOGGLE_TASK,
            payload: {
                id:taskId
            }
        })
    }
}

export default connect(null,mapDispatchToProps)(TaskCheckbox)