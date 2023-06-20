import axios from 'axios';

const getNewsForCoin = async (coinName) => {
    try {
        const yesterdayDate = getYesterday()
        const response = await axios.get(`https://gnews.io/api/v4/top-headlines?q=${coinName} crypto&from=${yesterdayDate}&lang=en&category=technology&max=1&apikey=5d61992ced3b9b34a78c3d58c5436029`);
        console.log(response.data.articles)
        return response.data.articles;
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

function getYesterday() {
    const date = new Date(); // get the current date
    date.setDate(date.getDate() - 31); // subtract one day

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




