"use client"
import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
import { setRouter } from '@/app/api/serverAction'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { CategoryEntriesApi, CategoryListApi } from './server'

export default function Header() {
  const pathname = usePathname()

  const [categoryList, setCategoryList] = useState([])
  const [change, setChange] = useState("")
  const [searchData, SetSearchData] = useState([])


  const IntialData = async () => {
    
    const CategoryList = await CategoryListApi();
    const CategoryEntries = await CategoryEntriesApi();
    
    let FindData = CategoryList?.CategoryList?.categorylist && CategoryList?.CategoryList?.categorylist.map((data) => {
      let Arr = []
      CategoryEntries?.ChannelEntriesList?.channelEntriesList.map((res) => {
        let dd =res?.categoriesId.split(",")
        if (dd.includes(data?.id.toString())) {
          Arr.push(res)
        }
      })
      data.filterData = Arr

      return data
    })

    if (FindData) {
      setCategoryList(FindData)
    }
    else {
      setCategoryList(CategoryList?.CategoryList?.categorylist)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    IntialData()
  }, [])


  const searchApiCall = () => {
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


  const handleClick = () => {
    setChange("")
  }

  const handleRoute = (slug) => {
    setRouter(slug)
  }

 
  return (
    <>
      <header className="bg-white shadow-lg top-0 sticky z-10">
        <div className="max-w-screen-2xl m-auto lg:px-20 sm:px-10 p-4 sm:py-6 h-[72px] bg-white   flex justify-between gap-4 items-center">
          <Link href="/" onClick={handleClick} className="text-black-300 text-base font-medium flex items-center gap-4 whitespace-nowrap">
            <img src="/img/logo.svg" />
            Help Center
          </Link>
          {pathname.includes("/allCategories") &&
            <div className="relative sm:block hidden">
              <input type="text" value={change} onChange={(e) => setChange(e.target.value)} className="h-[52px] w-full border border-gray-100 sm:max-w-[640px] lg:min-w-[640px] pr-10 rounded-lg px-6 text-base text-black font-medium focus-visible:outline-0" placeholder="Ask a question..." />
              <img src="/img/search.svg" className="absolute top-4 right-4" />
              {/* search design */}
              {change != "" &&
                <div className='absolute top-full mt-1 bg-white rounded-lg  pt-4 max-h-[272px] overflow-auto w-full shadow-drop z-[5]'>
                  {searchData && searchData.length > 0 ?
                    <>
                      {searchData.map((res, index) => (
                        <>
                          <div className='mb-4'>
                            <div className='flex items-center gap-3 pb-3 border-b border-[#EDEDED] px-6 mb-2'>
                              <h4 className='text-[#000000] font-medium text-base'>{res?.categoryName}</h4>
                              <Link href={`/allCategories/${res?.categorySlug}`} onClick={()=>setChange("")} className='text-sm text-[#3552F7] font-normal no-underline'>View all</Link>
                            </div>
                            <div className='flex flex-col'>
                              {res?.filterData && res?.filterData.map((response, ind) => (
                                <>
                                  <Link href={`/categoriesDetails/${response?.slug}`} onClick={() => handleRoute(res?.categorySlug)} className='px-6 h-[34px] w-full flex items-center hover:text-[#000000] text-[#525252] text-sm font-normal no-underline hover:bg-[#EDEDED]'>{response?.title}</Link>
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
              {/*  */}
            </div>}
        </div>
      </header>
    </>
  )
}

