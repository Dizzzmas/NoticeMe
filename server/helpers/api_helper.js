const axios = require('axios');


module.exports = {
    async makeApiCall(protocol, host, path, type) {
        try {
            let url = protocol + '://' + host + path;
            console.log(url);
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            return error;
        }
    }
};