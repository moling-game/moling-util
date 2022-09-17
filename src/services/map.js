import axios from 'axios'

const mapService = {
    getMaps: async function () {
        const res = await axios.get('/api/maps');
        return res.data;
    },
    getMap: async function (id) {
        const res = await axios.get(`/api/maps/${id}`);
        return res.data;
    }
}
export default mapService
