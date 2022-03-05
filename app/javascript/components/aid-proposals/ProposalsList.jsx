import React from 'react';
import { Map, Marker, TileLayer, ZoomControl, Popup } from 'react-leaflet';

import Proposal from './Proposal';

import markerIcon from '../../markerIcon';

import 'leaflet/dist/leaflet.css'
import './search.css'

const ProposalsList = ({ proposals, loading }) => (
    <div>
        <div className="card mb-3">
            <Map
                center={[51.42169068153824, 18.821976536948544]}
                zoom={4}
                scrollWheelZoom={false}
                style={{ width: '100%', height: '300px' }}
                zoomControl={false}>
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    proposals
                        .filter(proposal => proposal.lat)
                        .map(proposal => (
                            <Marker
                                key={proposal.id}
                                position={proposal}
                                icon={markerIcon}
                            >
                                <Popup>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title"> {proposal.country}, {proposal.city} </h5>
                                            <h6 className="card-subtitle mb-2 text-muted"> {proposal.date} - <b> {proposal.full_name}</b></h6>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        ))
                }
                
            </Map>
        </div>
        {
            loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : proposals.map(proposal => (
                <Proposal
                    proposal={proposal}
                    key={proposal.id}
                />
            ))
        }
    </div>
);

export default ProposalsList;