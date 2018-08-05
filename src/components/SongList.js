import React, { Component } from 'react';
import './SongList.css';

const SongList = ({newReleases}) => {

    const RenderNewReleases = () =>
        <ul className="new-release-list">
            { newReleases.map((item, index) => {
                return <li className="new-release-list__item" key={`new-release-${index}`}>{item.name}</li>
            })}
        </ul>

    return (
        <div>
            { newReleases && <RenderNewReleases /> }
        </div>
    )
};

export default SongList;