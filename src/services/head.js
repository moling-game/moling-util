import axios from 'axios'

const headService = {
    getAll: async function () {
        const res = await axios.get('/api/heads');
        return res.data;
    }
}
export default headService
