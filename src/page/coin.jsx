import React, { useEffect, useState } from 'react';
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteValue, fetchCoins, filterhValue, selectValue } from '../reducer/slice/coinSlice';
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { usePagination } from "@table-library/react-table-library/pagination";
import { Link } from 'react-router-dom';
import Layouts from '../components/layouts';
import ReactPaginate from 'react-paginate';


function CoinPage() {
  let didInit = false
  const dispatch = useDispatch();
  const { value, loading, filter, searchText } = useSelector((state) => state.coin);
  const data = {nodes :  filter || value}
  
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  

  useEffect(() => {
    if(!didInit){
      didInit = true;
      dispatch(fetchCoins());
    }
  }, [dispatch]);

 

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
        <button type="button" className="btn btn-danger" onClick={() => handleDelete(item.id)} >Delete</button>
        </>
      )
    } },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(data.nodes.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.nodes.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const pagination = usePagination(paginatedData, {
    state: {
      page: currentPage,
      size: itemsPerPage,
    },
    onChange: onPaginationChange,
  });

  function onPaginationChange(action, state) {
    pagination.fns.onSetPage(pagination.state.page)
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
                <option value="coin">Coin</option>
                <option value="token">Token</option>
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

            {loading ? (
            <>Loading...</>)
            : (
              <>
              <CompactTable columns={COLUMNS} data={data} theme={theme}  pagination={pagination}></CompactTable>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <span>
                  <ReactPaginate
                  nextLabel=">"
                  previousLabel="<"
                  previousClassName={'pagination__btn'}
                  breakClassName={'pagination__break'}
                  nextClassName={'pagination__btn'}
                  containerClassName={"pagination"}
                  pageClassName={"pagination__btn"}
                  pageLinkClassName={"pagination__btn_link"}
                  
                  previousLinkClassName={"pagination__link"}
                  nextLinkClassName={"pagination__link"}
                  disabledClassName={"pagination__link--disabled"}
                  activeClassName={"pagination__link--active"}
                  onPageChange={handlePageChange}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  />
                </span>
              </div>
              </>
            )}
      </div>
    </Layouts>
   
    
    </>
  );
}

export default CoinPage;

