import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class navegacion extends Component {
    render() {
        return (
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                         OP.WP
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Buscar</Link>
                            </li>
                            <li className="nav-item active">
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            
        )
    }
}
