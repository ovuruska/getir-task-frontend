import React, {Component} from "react"
import Draggable from 'react-draggable';

export default (WrappedComponent) => {

    return class extends Component {
        constructor(props) {
            super(props)

            this.state = {
                dragStart: null,
                opacity: 1
            }
        }

        getDragPercentage = (event) => {

            const clientX = this.getClientX(event)
            const {dragStart} = this.state
            const {innerWidth} = window
            if (clientX > dragStart) {
                return Math.min(1, (innerWidth - clientX) / (innerWidth - dragStart + 0.001))
            } else {
                return Math.min(1, (clientX) / (dragStart + 0.001))
            }
        }

        onStart = (event) => {
            const {dragStart} = this.state

            if(dragStart === null){
                this.setState({
                    dragStart: this.getClientX(event)
                })

            }else{

            }

        }

        getClientX = (event) => {

            if( !!event.clientX && typeof event.clientX === "number"){
                return event.clientX
            }else if(event.changedTouches.length >= 1){

                return event.changedTouches[0].clientX
            }else {
                return event.touches[0].clientX
            }
        }

        onStop = (event) => {
            const {dragStart} = this.state
            if(dragStart === null){
                return
            }
            const dragPercentage = this.getDragPercentage(event)
            const {onRemove,threshold = .25} = this.props

            if(dragPercentage < threshold){
                onRemove(this.props)
            }else{
                this.setState({
                    dragStart: null,
                    opacity: 1
                })
            }

        }
        onDrag = (event) => {

            const {dragStart} = this.state
            if(dragStart === null){
                return
            }

            const dragPercentage = this.getDragPercentage(event)

            this.setState({
                opacity: dragPercentage
            })

        }


        render() {
            const dragHandlers = {onStart: this.onStart, onStop: this.onStop, onDrag: this.onDrag};
            const {opacity} = this.state

            return <Draggable cancel={"input , button"} position={{x:0,y:0}} axis={"x"} {...dragHandlers}>
                <div style={{opacity}}>
                    <WrappedComponent {...this.props}/>
                </div>
            </Draggable>

        }
    }
}