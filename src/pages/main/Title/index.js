import React,{Component} from "react"
import {connect} from "react-redux"
import {Helmet} from "react-helmet"


const Title = ({tasks}) => {
        const unfinishedTasks = tasks.filter(({finished}) => !finished)

        if(unfinishedTasks.length === 0){
            return <Helmet>
                <title>{"No tasks 2 do 👏"}</title>
            </Helmet>
        }
        else{
            return <Helmet>
                <title>  {`📝 ${unfinishedTasks.length} tasks 2 do` } </title>
            </Helmet>
        }


}

const mapStateToProps = ({tasks}) => ({tasks})
export default connect(mapStateToProps)(Title)

