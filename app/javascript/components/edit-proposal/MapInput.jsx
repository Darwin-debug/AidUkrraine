import React, { useEffect, useRef, useMemo } from 'react';
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import CityAutocomplete from './CityAutocomplete'

import markerIcon from '../../markerIcon';

import { getCityByCoordinates } from '../../api';

import 'leaflet/dist/leaflet.css';

const defaultLng = 18.821976536948544;
const defaultLat = 51.42169068153824;

const Map = ({ position }) => {
    const map = useMap()
    useEffect(() => {
        map.flyTo(position);
    })
    return null
}

const MapInput = ({ aidProposal, setAidProposal, id, intl }) => {
    
    const position = {
        lat: aidProposal.lat || defaultLat,
        lng: aidProposal.lng || defaultLng,
    };

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            async dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    const latLng = marker.getLatLng();
                    const address = await getCityByCoordinates(latLng);
                    setAidProposal({
                        ...aidProposal,
                        ...address,
                        ...latLng,
                    });
                }
            },
        }),
        [],
    )

    const setCityData = (cityData) => {
        setAidProposal({
            ...aidProposal,
            ...cityData,
        });
    }
    return (
        <div className="mb-3">
            <label className="form-label required">
                {intl.formatMessage({
                    id: 'aid_proposals.edit.form.type_city_name'
                })}
            </label>
            <CityAutocomplete setCityData={setCityData} />
            <MapContainer
                center={position}
                zoom={id ? 11 : 4}
                style={{ width: '100%', height: '300px' }}
                zoomControl={false}
            >
                <Map position={position} />
                <ZoomControl position="bottomright" />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker
                    ref={markerRef}
                    draggable
                    eventHandlers={eventHandlers}
                    position={position}
                    icon={markerIcon}
                >
                </Marker>
            </MapContainer>
        </div>
    )
};

export default MapInput;