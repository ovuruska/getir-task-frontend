import {
    RENAME_TASK,
    ADD_TASK,
    TOGGLE_TASK,
    SET_TASKS, REMOVE_TASK
} from "../actions"

export default (
    state=[],
    {type,payload}
) => {
    const {id,name} = payload || {}

    switch(type){
        case ADD_TASK:
            return [...state,payload]
        case RENAME_TASK:
            return state.map((task) => {
                if(task._id === id){
                    const newTask = Object.assign({},task)
                    newTask["name"] = name
                    return newTask
                }else return task
            })
        case TOGGLE_TASK:

            return state.map((task) => {
                if(task._id === id){
                    const newTask = Object.assign({},task)
                    newTask["finished"] = !newTask["finished"]
                    return newTask
                }else return task
            })
        case SET_TASKS:
            return payload
        case REMOVE_TASK:
            return state.filter(({_id}) => id !== _id)

        default:
            return state
    }
}