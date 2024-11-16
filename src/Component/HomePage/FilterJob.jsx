"use client"
import { setRouter } from '@/app/api/serverAction'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function FilterJob({ categoryList }) {


  const [change, setChange] = useState("")

  const [searchData, SetSearchData] = useState([])



  const searchApiCall = async () => {

    let valuesFilter = categoryList && categoryList.length > 0
      ? categoryList.filter(d =>
        d.categoryName.toLowerCase().includes(change.toLowerCase()) ||
        (d.filterData && d.filterData.some(s => s.title.toLowerCase().includes(change.toLowerCase()))))
      : [];
    SetSearchData(valuesFilter)


  }

  useEffect(() => {
    if (change != "") {
      searchApiCall()
    }
  }, [change])

  const handleRoute = (slug) => {
    setRouter(slug)
  }


  
  // const handleKeyDown=(event)=>{
  //   let searchDataArr=searchData && searchData.map((resData)=>resData?.filterData)
    

  //   if (event.key === 'ArrowDown') {

  //    if(focusedIndex >= -1 && focusedIndex < searchDataArr.flat()?.length){
  //     setFocusedIndex(focusedIndex + 1);
  //     outerScrollRef.current.scrollTop = 0;
  //     const element = document.getElementById(focusedIndex +1);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth', block: 'center'});
  //     }
  //   }else{
  //     setFocusedIndex(-1)
  //   }
  //  }else if(event.key ==="ArrowUp"){
  //   if (focusedIndex >= -1 && focusedIndex < searchDataArr.flat()?.length) {
  //   const element = document.getElementById(focusedIndex - 1);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'center'});
  //   }
  //   setFocusedIndex(focusedIndex -1)
  //   if (focusedIndex === -1) {
  //     resultsRef.current.scrollTop = 0;
  //   }
  // }else{
  //   if(focusedIndex <=-1){
  //   setFocusedIndex(searchDataArr.flat()?.length - 1)}
  // }
  // }

  // }
  return (
    <>
      <div className="relative bg-blue-200 min-h-[220px] md:max-h-[440px]">
        <img src="img/banner.png " className="w-full min-h-[220px] md:max-h-[440px]" />
        <div className="m-auto flex flex-col gap-4 md:gap-8 pt-0   items-center  justify-center absolute top-0 left-0 w-full h-full">
          <h3 className="text-black-500 text-xl sm:text-[40px] font-semibold">How can we help?</h3>
          <div className="relative">
            <input type="text" value={change} onChange={(e) => setChange(e.target.value)} className="h-[52px] w-full sm:min-w-[640px] pr-10 rounded-lg shadow-lg px-6 text-base text-black font-medium focus-visible:outline-0 border-none" placeholder="Ask a question..." />
            <img src="img/search.svg" className="absolute top-4 right-4" />
            {change != "" &&
              <div className='absolute top-full mt-1 bg-white rounded-lg  pt-4 max-h-[272px] overflow-auto w-full shadow-drop z-[5]'>
                {searchData && searchData?.length > 0 ?
                  <>
                    {searchData.map((res, index) => (
                      <>
                      
                        <div className='mb-4'>
                          <div className='flex items-center gap-3 pb-3 border-b border-[#EDEDED] px-6 mb-2'>
                            <h4 className='text-[#000000] font-medium text-base'>{res?.categoryName}</h4>
                            <Link href={`/allCategories/${res?.categorySlug}`} className='text-sm text-[#3552F7] font-normal no-underline'>View all</Link>
                          </div>
                          <div className='flex flex-col'  >
                            
                            {res?.filterData && res?.filterData.map((response, ind) => (

                              <>
                                <Link key={ind} id={ind} href={`/categoriesDetails/${response?.slug}`} onClick={() => handleRoute(res?.categorySlug)} className={`px-6 h-[34px] w-full flex items-center hover:text-[#000000] text-[#525252] text-sm font-normal no-underline hover:bg-[#EDEDED]`}>{response?.title}</Link>
                              </>
                            ))}
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                  :
                  <>
                    <div className="p-4 flex items-center justify-center">
                      <p className="text-sm font-medium text-black" >{"No data found"}</p>
                    </div>
                  </>}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}