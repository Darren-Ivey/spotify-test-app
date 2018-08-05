import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getNewReleasesSelector, getNewReleases, getSpotifyError } from '../modules/spotify/spotify';
import SongList from '../components/SongList';
import './Dashboard.css';

class Dashboard extends Component {

    constructor(props) {
        super(props);
    }

    renderError () {
        return this.props.getSpotifyError !== 'undefined' && <p>An error has occurred</p>;
    }

    render() {
        const { newReleases } = this.props;
        return (
            <div className="dashboard">
                <button className="dashboard__button" onClick={ () => { this.props.getNewReleases() } }>View new releases</button>
                { this.renderError() }
                <SongList
                    error={ getSpotifyError }
                    newReleases={ newReleases } />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        getSpotifyError: getSpotifyError(state),
        newReleases: getNewReleasesSelector(state)
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getNewReleases: () => dispatch(getNewReleases())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);