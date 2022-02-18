import React,{Component} from "react"
import "./style.css"
import {connect} from "react-redux";
import TaskInput from "./TaskInput";
import {SET_TASKS} from "../../redux/actions";
import TaskList from "./TaskList";
import apiServer from "../../constants/apiServer";
import Title from "./Title"
import {CircularProgress} from "@mui/material";


const MaybeTaskList = ({waiting}) => {
    if(waiting){
        return <div style={{width:"100%",alignItems:"center",display:"flex",marginTop:"4rem",justifyContent:"center"}}>
            <CircularProgress size={"8rem"}/>
        </div>
    }else{
        return <TaskList/>
    }
}

class Main extends Component {

    constructor(props){
        super(props)
        this.state = {
            waiting:false
        }
    }

    componentDidMount() {
        const {setTasks} = this.props
        this.setState({waiting:true})
        fetch(`${apiServer}/lists/genesis/tasks`,{
            method:"GET",
            cors:"cors",

        })
            .then(r => r.json())
            .then(({success,payload}) => {
                if(success){
                    setTasks(payload)
                    this.setState({waiting:false})

                }
            })
    }

    render(){

        const {waiting} = this.state

        return <section className={"mainpage"}>
            <Title/>
            <TaskInput/>
            <MaybeTaskList waiting={waiting}/>
        </section>
    }
}


const mapDispatchToProps = dispatch => {
    return {
        setTasks : tasks => dispatch({
            type:SET_TASKS,
            payload:tasks
        })
    }
}

export default connect(null,mapDispatchToProps)(Main)