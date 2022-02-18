import React,{Component} from "react"

export default (WrappedComponent) => {

    return class extends Component{
        constructor(props) {
            super(props)
            this.state={
                width:"100%",
                height:"0",
                display:"inline-flex",
                opacity:0,
                transition: 'all .5s ease',

            }
        }

        componentDidMount(){
            setTimeout(() => this.setState({
                style: {
                    height:"auto",
                    opacity: 1,
                }
            }),500)
        }


        render(){
            const {style} = this.state
            console.log(style)
            return <div style={{style}}>
                <WrappedComponent {...this.props}/>
            </div>
        }
    }
}