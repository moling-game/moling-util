import axios from 'axios'

const monsterService = {
    getAll: async function () {
        const res = await axios.get('/api/monsters');
        return res.data;
    }
}
export default monsterService
