exports.stateWise = async () => {
    const url = 'https://api.covid19india.org/data.json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
exports.district = async () => {
    const url = "https://api.covid19india.org/state_district_wise.json";
    const response = await fetch(url);
    const data = await response.json();
    return data;
}