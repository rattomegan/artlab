import * as metAPI from '../../utilities/met-api';
import './MainPage.css';
import { useState, useEffect } from 'react';
import Board from '../../components/Board/Board';
import SearchBar from '../../components/SearchBar/SearchBar';
import Pagination from '../../components/Pagination/Pagination';

function MainPage({ searchTerm, setSearchTerm, searchParameters, setSearchParameters, currentPage, setCurrentPage }) {
  const [allItems, setAllItems] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const ITEMS_PER_PAGE = 30;


  useEffect(() => {
    handleFetchAllItems(searchTerm)
  }, [currentPage])


  async function handleFetchAllItems(searchTerm) {
    setAllItems(null)
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE
    const parameter = await searchParameters.find(p => {
      return p.selected === true
    })
    let allItems
    if (parameter) {
      allItems = await metAPI.fetchAllItems(searchTerm, indexOfFirstItem, parameter.name)
      console.log('advanced search main results', allItems)
    } else {
      allItems = await metAPI.fetchAllItems(searchTerm, indexOfFirstItem)
      console.log('simple search main results', allItems)
    }
    setTotalItems(allItems.total)
    setAllItems(allItems.items)
  }

  function updatePageInfo(page) {
    setAllItems(null)
    setCurrentPage(page)
  }

  function handleSearchClick(searchTerm) {
    setCurrentPage(1)
    setAllItems(null)
    setTotalItems(0)
    handleFetchAllItems(searchTerm)
  }


  return (
    <main>
      <SearchBar 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        searchParameters={searchParameters}
        setSearchParameters={setSearchParameters}
        handleSearchClick={handleSearchClick}
      />
      {allItems ?
      <>
        <Board allItems={allItems} totalItems={totalItems}/>
        <Pagination totalItems={totalItems} currentPage={currentPage} setCurrentPage={setCurrentPage} updatePageInfo={updatePageInfo} />
      </>

      :
        <h2 className='loading-text'>Loading...</h2>
      }


    </main>
  )
};

export default MainPage;