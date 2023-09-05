import React, { useEffect, useState } from 'react';
// import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteValue, fetchCoins, filterhValue, selectValue } from '../reducer/slice/coinSlice';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from 'react-router-dom';
import Layouts from '../components/layouts';


function CoinPage() {
  const dispatch = useDispatch();
  const { value, loading } = useSelector((state) => state.coin);
  const data = {nodes : value}
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    dispatch(fetchCoins());
  }, []);

  const handleSearch = (e) => {
    dispatch(filterhValue(inputText));
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    dispatch(selectValue(e.target.value));
  };

  const handleDelete = (id) => {
    dispatch(deleteValue(id))
  }


  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
    },
  ]);

  const COLUMNS = [
    { label: "ID", renderCell: (item) => (
      <Link to={`/${item.id}`} style={{ textDecorationLine: "none"}}>
        {item.id}
      </Link>
      )},
    { label: "Name",renderCell: (item) => item.name},
    { label: "Symbol",renderCell: (item) => item.symbol},
    { label: "Rank", renderCell: (item) => item.rank },
    { label: "Type", renderCell: (item) => item.type },
    { label: "Active", renderCell: (item) => item.is_active.toString() },
    { label: "Action", renderCell: (item) => {
      return(
        <>
        <button type="button" className="btn btn-danger" onClick={() =>handleDelete(item.id)} >Delete</button>
        </>
      )
    } },
  ];

  const pagination = usePagination(data, {
    state: {
      page: 0,
      size: 5,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    console.log(action, state);
  }

  
  return (
    <>
    
    <Layouts>
      <div className='card p-3'>
        <h3 className='fw-2'>Coin Data</h3>

        <div className="my-3 d-flex gap-3" style={{ width: '30rem' }}>
              <select
                className="form-select"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="select type">Select Type</option>
                <option value="Coin">Coin</option>
                <option value="Token">Token</option>
              </select>

              <input
                type="search"
                className="form-control"
                placeholder="Search by name"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />

              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>

            {loading ? (<>Loading...</>): (<CompactTable columns={COLUMNS} data={data} theme={theme}  pagination={pagination}></CompactTable>)}

        

        


        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Total Pages: {pagination.state.getTotalPages(data.nodes)}</span>

          <span>
          
            {pagination.state.getPages(data.nodes).map((_, index) => (
              <button
                key={index}
                type="button"
                style={{
                  fontWeight: pagination.state.page === index ? "bold" : "normal",
                }}
                onClick={() => pagination.fns.onSetPage(index)}
                className='mx-1 btn btn-outline-info'
              >
                {index + 1}
              </button>
            ))}
          </span>
        </div>
      </div>

    </Layouts>
   
    
    </>
  );
}

export default CoinPage;

