import React from 'react'
import ReactDOM from 'react-dom'
import { Map, Marker, TileLayer, ZoomControl, Popup } from 'react-leaflet';

import markerIcon from '../markerIcon';

import 'leaflet/dist/leaflet.css'
import '../css/search.css'

class Proposal extends React.Component {
    constructor(props) {
        super(props);
        this.proposal = props.proposal;
        this.showEditButton = props.showEditButton;
    }
    render() {
        return <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title"> {this.proposal.country}, {this.proposal.city} </h5>
                        <div className="mb-2"> {this.proposal.full_name} </div>
                    </div>
                    <div className="col text-center position-relative">
                        <span className="position-absolute top-50 start-50 translate-middle">{this.proposal.date}</span>
                    </div>
                    <div className="col position-relative">
                        <a className="position-absolute top-50 start-50 translate-middle text-dark" href={`aid_proposals/${this.proposal.id}`} >View details / Переглянути</a>
                    </div>
                </div>
            </div>
        </div>
    }
}

class ProposalsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = { proposals: JSON.parse(props.proposals) };
    }

    render() {
        return (
            <div>
                {this.state.proposals.map(proposal => <Proposal proposal={proposal} key={proposal.id} showEditButton={this.props.userEmail == proposal.user_email} />)}
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
                            this.state.proposals
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
            </div>
        );
    }
}

class SearchField extends React.Component {
    render() {
        return (
            <>
                <input id={this.props.field} className=" search-input" placeholder="Search / Пошук" onChange={this.input.bind(this)} type="text" />
                <i class="absolute fa fa-search text-gray-400 top-5 left-4"></i>
            </>
        );
    }

    input(event) {
        const url = `${this.props.action}?${this.props.field}=${encodeURIComponent(event.target.value)}`;
        fetch(url).then((response) => response.json()).then(result => this.updateProposals(result));
    }

    updateProposals(proposals) {
        this.props.proposalList.setState({ proposals: proposals });
    }
}


export function InitAidProposalsSearch() {
    const proposalsEl = document.body.querySelector(".proposals-container");
    if (proposalsEl === null)
        return;

    const proposalList = ReactDOM.render(
        <ProposalsList proposals={proposalsEl.dataset.proposals} userEmail={proposalsEl.dataset.userEmail} />,
        proposalsEl,
    )

    const searchEl = document.body.querySelector(".search-field-container");
    ReactDOM.render(
        <SearchField proposalList={proposalList} action={searchEl.dataset.action} field={searchEl.dataset.field} />,
        searchEl
    );
}

InitAidProposalsSearch();

