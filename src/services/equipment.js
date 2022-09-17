import axios from 'axios'

const equipmentService = {
    getAll: async function () {
        const res = await axios.get('/api/equipments');
        return res.data;
    }
}
export default equipmentService
