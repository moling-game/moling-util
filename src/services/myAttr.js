import axios from 'axios'

const myAttrService = {
    getMyAttr: async function () {
        const res = await axios.get('/api/my/attr');
        return res.data;
    },
    addMyAttr: async function (str, agi, vit, int, dex, luk) {
        const res = await axios.post('/api/my/attr/add', {
            str, agi, vit, int, dex, luk
        });
        return res.data;
    }
}
export default myAttrService
