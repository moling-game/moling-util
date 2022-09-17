import axios from 'axios'

const jobService = {
    getTree: async function () {
        const res = await axios.get('/api/jobs/tree');
        return res.data;
    }
}
export default jobService
