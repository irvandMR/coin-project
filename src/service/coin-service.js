import axios from "axios";

export const getCoins = async() => {
   return await axios.get("https://api.coinpaprika.com/v1/coins/")
};

export const getCoinId = async(id) => {
  return await axios.get(`https://api.coinpaprika.com/v1/coins/${id}`)
}

export const deleteCoin = async(id) => {
   return await axios.delete(`https://api.coinpaprika.com/v1/coins/${id}`)
}