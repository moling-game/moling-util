import axios from 'axios'
import qs from 'qs'

const myService = {
    getMyEquipments: async function () {
        const res = await axios.get('/api/my/equipments');
        return res.data;
    },
    getMyItems: async function (catalogId) {
        const query = qs.stringify({ catalogId: catalogId });
        const res = await axios.get(`/api/my/items?${query}`);
        return res.data;
    }
}
export default myService
