import axios from 'axios'

const skillService = {
    getTree: async function () {
        const res = await axios.get('/api/skills/tree');
        return res.data;
    }
}
export default skillService
