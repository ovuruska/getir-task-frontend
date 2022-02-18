import React,{Component} from "react"
import "./style.css"
import {connect} from "react-redux";
import TaskInput from "./TaskInput";
import {SET_TASKS} from "../../redux/actions";
import TaskList from "./TaskList";
import apiServer from "../../constants/apiServer";
import Title from "./Title"

class Main extends Component {

    componentDidMount() {
        const {setTasks} = this.props
        fetch(`${apiServer}/lists/genesis/tasks`,{
            method:"GET",
            cors:"cors",

        })
            .then(r => r.json())
            .then(({success,payload}) => {
                if(success){
                    setTasks(payload)
                }
            })
    }

    render(){

        return <section className={"mainpage"}>
            <Title/>
            <TaskInput/>
            <TaskList/>
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