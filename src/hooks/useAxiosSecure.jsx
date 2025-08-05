import axios from "axios"
import { useEffect } from "react"
import useAuth from "./useAuth"
import { useNavigate } from "react-router-dom"


const axiosSecure = axios.create({
    baseURL: "https://serene-stays-server-ten.vercel.app",
    withCredentials: true
})
const useAxiosSecure = () => {

    const {logOutUser} = useAuth();
    const navigate  = useNavigate()

    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('error tracked interceptors',error.response);
            if(error.response.status === 401 || error.response.status === 403 ){
                console.log('log out the user');
                logOutUser()
                .then(()=>{
                    navigate('/logIn')
                })
                .catch(error => {
                    console.log(error);
                })
            }
        })
    }, [])

    return axiosSecure
}

export default useAxiosSecure