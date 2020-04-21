import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class login extends Component {

    state = {
        title:""
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        console.log(this.state.title)
    }
    render() {
        return (
            <div>
                
            </div>
            
        )
    }
}
