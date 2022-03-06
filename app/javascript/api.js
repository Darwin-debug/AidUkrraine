export const getCityByCoordinates = async ({ lat, lng }) => {
    const { address: { city, country, state } = {}} = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=12`
    ).then(res => res.json());
    return { city: city || state || '', country: country || '' };
}

export const getCitiesByName = async (cityName) => {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${cityName}&zoom=12`
    ).then(res => res.json());
    return (res || []).map(({ address: { city, country, state }, lat, lon: lng, display_name }) => {
        return { city: city || state || '', country: country || '', lat, lng, display_name }
    });
};
