import {takeEvery} from "redux-saga/effects";
import {REMOVE_TASK} from "../actions";
import apiServer from "../../constants/apiServer";

function* removeTask({_, payload: {id}}) {
    fetch(`${apiServer}/lists/genesis/tasks/remove`, {
        method: "POST",
        cors: "cors",
        body: JSON.stringify({
            id
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(r => r.json())

}

export default function* rootSaga() {
    yield takeEvery(REMOVE_TASK, removeTask)
}