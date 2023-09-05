import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getCoinId } from "../service/coin-service"
import { useDispatch, useSelector } from "react-redux"
import { fetchCoinDetail } from "../reducer/slice/coinSlice"
import Layouts from "../components/layouts"
import "../index.css"

function CoinDetailPage () {
  const {id} = useParams()
  // const [detail, setDetail] = useState({})
  const {data: detailCoin, loading: loadCoin } = useSelector((state) => state.detail)
  const dispatch = useDispatch()
  console.log(detailCoin);

  useEffect(()=>{
    dispatch(fetchCoinDetail(id))
  },[])

  return(
    <>
    <Layouts>
      <div className="card" style={{color: "#444F5C"}}>
        <div className="card-body">
          <div className="row mb-3">
           <p className="fw-bold">Coin List</p>
          </div>
          <div className="m-3 text-detail">
            <div class="row mb-3">
              <label for="title" class="title col-sm-1">ID </label>
                <div class="fw-bold col-sm-10">
                {detailCoin.id}
                </div>
            </div>
            <div class="row mb-3">
              <label for="title" class="title col-sm-1"> Name </label>
                <div class="fw-bold col-sm-10">
                {detailCoin.name}
                </div>
            </div>
            <div class="row mb-3">
              <label for="title" class="title col-sm-1">Symbol </label>
                <div class="fw-bold col-sm-10">
                {detailCoin.symbol}
                </div>
            </div>
            <div class="row mb-3">
              <label for="title" class="title col-sm-1">Type </label>
                <div class="fw-bold col-sm-10">
                {detailCoin.type}
                </div>
            </div>
            <div class="row mb-3">
              <label for="title" class="title col-sm-1">Active </label>
                <div class="fw-bold col-sm-10">
                {detailCoin?.is_active?.toString()}
                </div>
            </div>
            <div class="row mb-3">
              <label for="title" class="title col-sm-1">is New ?</label>
                <div class="fw-bold col-sm-10">
                {detailCoin?.is_new?.toString()}
                </div>
            </div>
          </div>
        </div>
        </div>

    </Layouts>
    
    </>
  )
}

export default CoinDetailPage