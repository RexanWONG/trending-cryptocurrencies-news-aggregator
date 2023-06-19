import axios from 'axios'

const trendingCoins = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/search/trending');
        return response.data;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

export default trendingCoins

