import React, { useEffect, useState } from 'react';
import { Map, Marker, TileLayer, ZoomControl } from 'react-leaflet';
import ReactLeafletSearch from "react-leaflet-search";
import Errors from './Errors';
import markerIcon from '../markerIcon';

import useEditAidProposal from '../hooks/useEditAidProposal';

import { getCity } from '../api';

import 'leaflet/dist/leaflet.css'
import 'react-leaflet-search/css'

const defaultLng = 18.821976536948544;
const defaultLat = 51.42169068153824;

const EditProposal = ({ action, method, id }) => {
    const { aidProposal, errors, loading, updateLoading, setAidProposal, saveAidProposal } = useEditAidProposal({ id, action, method });
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

    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const onChange = (e) => {
        setAidProposal({
            ...aidProposal,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <>
            <form id="editAidProposal" action={action} method="post" onSubmit={saveAidProposal} hidden >
                <input name="aid_proposal[lat]" value={aidProposal.lat} hidden />
                <input name="aid_proposal[lng]" value={aidProposal.lng} hidden />
            </form>
            <div className="container container-sm">
                <Errors errors={errors.common} />
                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label required">
                        Full name / Ваше ім'я
                    </label>
                    <input
                        form="editAidProposal"
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[full_name]"
                        id="full_name"
                        type="text"
                        value={aidProposal.full_name || ''}
                    />
                    <Errors errors={errors.full_name} />
                </div>
                <div className="mb-3">
                    <label className="form-label required">
                        Type city name / Введіть назву міста
                    </label>
                    <Map
                        onZoomEnd={(e) => { setZoom(e.target.getZoom()) }}
                        center={position}
                        zoom={zoom}
                        style={{ width: '80%', height: '300px' }}
                        zoomControl={false}
                    >
                        <ZoomControl position="topright" />
                        
                        <ReactLeafletSearch
                            inputPlaceholder="City name / Назву міста"
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
                <div className="mb-3">
                    <label htmlFor="country" className="form-label required">
                        Country / Країна
                    </label>
                    <input
                        form="editAidProposal"
                        readOnly
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[country]"
                        id="country"
                        type="text"
                        value={aidProposal.country || ''}
                    />
                    <Errors errors={errors.country} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label required">
                        City / Місто
                    </label>
                    <input
                        form="editAidProposal"
                        readOnly
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[city]"
                        id="city" type="text"
                        value={aidProposal.city || ''}
                    />
                    <Errors errors={errors.city} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">
                        Description of the items needed / Опис необхідних предметів
                    </label>
                    <textarea form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[description]" id="description" value={aidProposal.description || ''} />
                    <Errors errors={errors.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label required">
                        Additional URL / Додаткове посилання
                    </label>
                    <input form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[url]" id="url" type="url" value={aidProposal.url || ''} />
                    <Errors errors={errors.url} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label required">
                        Departure date / Дата від'їзду
                    </label>
                    <input form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[date]" id="date" type="date" value={aidProposal.date || ''} />
                    <Errors errors={errors.date} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label required">
                        Contact information / Контактна інформація
                    </label>
                    <textarea form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[contact]" id="contact" value={aidProposal.contact || ''} />
                    <Errors errors={errors.contact} />
                </div>
                <div className="mb-3">
                    <button form="editAidProposal" type="submit" className="btn btn-primary">
                        {
                            updateLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Saving...</span>
                                </>
                            ) : (
                                id ? "Update / Оновити": "Register / Зареєструвати"
                            )
                        }
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditProposal;