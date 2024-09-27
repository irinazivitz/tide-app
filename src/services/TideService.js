import axios from 'axios'


const key = "89fcf1ee-afd9-43f5-bcd3-b09abde61fbb";

export default{

    getTideData(lat, lon) {
        const today = new Date().toISOString().split('T')[0]; //todays' tate in ISO format
        const start = `${today}T00:00`; //midnight of the specific date 
        const length = 24;

        const fullUrl = `https://www.worldtides.info/api/v3?date=${today}&lat=${lat}&lon=${lon}&key=${key}&days=1&extremes=true&localtime`;



        
        console.log("Full URL:", fullUrl);

        return axios.get(fullUrl);
    }
}

