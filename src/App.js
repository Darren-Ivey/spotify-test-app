import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './pages/Dashboard';
import { login, logout, getAuthorisationStatus } from './modules/auth/auth';
import './App.css';

class App extends Component {



    render() {
        return (
            <article className="App">
                <header className="header">
                    <h1 className="header__title">Spotify Test App</h1>
                    <button className="header__button" onClick={ ()=> { this.props.login() }}>Login</button>
                </header>
                <Dashboard />
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authorisationStatus: getAuthorisationStatus(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => dispatch(login()),
        logout: () => dispatch(logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App)