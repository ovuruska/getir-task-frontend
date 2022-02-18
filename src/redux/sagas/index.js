import {all} from "redux-saga/effects"
import tasks from "./tasks"

export default function*(){
    yield all([
        tasks()
    ])
}