import axios from 'axios'

const btcPrice = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export default btcPrice


