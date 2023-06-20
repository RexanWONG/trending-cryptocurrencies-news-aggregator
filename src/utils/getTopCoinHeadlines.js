import axios from 'axios';

const getNewsForCoin = async (coinName) => {
    try {
        const yesterdayDate = getYesterday()
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?q=${coinName} crypto&from=${yesterdayDate}&lang=en&category=technology&max=1&apikey=${import.meta.env.VITE_GNEWS_API_KEY}`);
        return response.data.articles;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function getYesterday() {
    const date = new Date(); 
    date.setDate(date.getDate() - 31); 

    // format the date and time
    let year = date.getUTCFullYear();
    let month = (1 + date.getUTCMonth()).toString().padStart(2, '0');
    let day = date.getUTCDate().toString().padStart(2, '0');
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}


export default getNewsForCoin




