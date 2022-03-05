import React, { useState, useEffect } from 'react';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";

import markerIcon from '../../markerIcon';

import { getCity } from '../../api';

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-search/css'

const defaultLng = 18.821976536948544;
const defaultLat = 51.42169068153824;

const MapInput = ({ aidProposal, setAidProposal, id, intl }) => {
    const [zoom, setZoom] = useState(id ? 11 : 4);
    
    const position = {
        lat: aidProposal.lat || defaultLat,
        lng: aidProposal.lng || defaultLng,
    };
    const ondragend = (e) => {
        setAidProposal({
            ...aidProposal,
            ...(e.target.getLatLng()),
        });
    };

    useEffect(() => {
        if (!aidProposal.lat) return
        (async () => {
            const address = await getCity(aidProposal);
            setAidProposal({
                ...aidProposal,
                ...address,
            });
        })()
    }, [aidProposal.lat, aidProposal.lng])
    return (
        <div className="mb-3">
            <label className="form-label required">
                {intl.formatMessage({
                    id: 'aid_proposals.edit.form.type_city_name'
                })}
            </label>
            <Map
                onZoomEnd={(e) => { setZoom(e.target.getZoom()) }}
                center={position}
                zoom={zoom}
                style={{ width: '100%', height: '300px' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />
                
                <ReactLeafletSearch
                    inputPlaceholder={intl.formatMessage({
                        id: 'aid_proposals.edit.form.type_city_name'
                    })}
                    openSearchOnLoad
                    position="topleft"
                    showMarker={false}
                    showPopup={false}
                    onChange={({ latLng }) => {
                        setZoom(11)
                        setAidProposal({
                            ...aidProposal,
                            ...latLng,
                        });
                    }}
                />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    draggable
                    ondragend={ondragend}
                    position={position}
                    icon={markerIcon}
                >
                </Marker>
            </Map>
        </div>
    )
};

export default MapInput;