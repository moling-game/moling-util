import axios from 'axios'

const fightWorkService = {
    postStart: async function (body) {
        const res = await axios.post('/api/fight/work/start', body);
        return res.data;
    },
    getView: async function () {
        const res = await axios.get('/api/fight/work/view');
        return res.data;
    },
}
export default fightWorkService
