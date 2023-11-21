import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://bistro-boss-server-with-payment-part-71.vercel.app",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
