import axios from 'axios';

const fetcher = async (url: string) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propaga o erro para que o SWR possa lidar com ele
    }
};

export default fetcher;