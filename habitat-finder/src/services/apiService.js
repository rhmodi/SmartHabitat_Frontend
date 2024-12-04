import axios from "axios";
class ApiService{
    constructor(){
        this.baseURL = process.env.REACT_APP_BACKEND_BASE_URL;
    }

    async requestHabitat(payload){
        try{
            const response = await axios.post(`${this.baseURL}/api/smart-Habitat/CalculateOverallIndex`,payload,{
                headers:{
                    "Content-Type":"application/json",
                },
            });
            return response.data;
        }catch(error){
            throw error;
        }
        
    }

    async getCommunityDetails(payload) {
        try {
            const response = await axios.post(`${this.baseURL}/api/smart-Habitat/getCommunityDetails`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    
}

const apiService = new ApiService()
export default apiService

