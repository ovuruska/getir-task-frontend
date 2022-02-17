import {createStore, applyMiddleware} from "redux"
import createSagaMiddleware from "redux-saga"
import {createLogger} from "redux-logger"
import reducers from "./redux/reducers"
import sagas from "./redux/sagas"


const sagaMiddleware = createSagaMiddleware()
const logger = createLogger()

const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger),
)

sagaMiddleware.run(sagas)

export default store