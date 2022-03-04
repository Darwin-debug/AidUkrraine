export const getCity = async ({ lat, lng }) => {
    const { address: { city, country, state } = {}} = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
    ).then(res => res.json());
    return { city: city || state || '', country: country || '' };
}