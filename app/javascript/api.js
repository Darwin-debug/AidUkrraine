export const getCityByCoordinates = async ({ lat, lng }) => {
    const { address: { city, country, state, town } = {}} = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`
    ).then(res => res.json());
    return { city: town || city || state || '', country: country || '' };
}

export const getCitiesByName = async (cityName) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${cityName}&zoom=12`,
        {
            headers: {
                'Accept-Language': 'none'
            }
        }
    ).then(res => res.json());
    return (res || []).map(({ place_id, address: { town, city, country, state }, lat, lon: lng, display_name }) => {
        return { place_id, city: town || city || state || '', country: country || '', lat, lng, display_name }
    });
};
