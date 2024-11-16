"use client"
import { setRouter } from '@/app/api/serverAction';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import NodataImg from '../NodataImg';

export default function AllCategories({CategoryList,CategoryEntries,params}) {



  const [categoryList,setCategoryList]=useState()
  const [categoryEntries,setCategoryEntries]=useState(CategoryEntries)


  useEffect(()=>{

  //   let filterValueData=categoryList?.categoriesList?.categories.filter(d=>d?.categorySlug==params)
  //    filterValueData&&filterValueData.filter(d=>d?.categorySlug==params).map((data)=>{
  //   let Arr=[]
  //   categoryEntries?.channelEntriesList?.channelEntriesList.map((res)=>{
  //     res?.categories.map((val)=>{
  //       val.map((s)=>{
  //         if(data?.categorySlug==s?.categorySlug){
  //           Arr.push(res)
  //         }
  //       })
  //     }) 
  
  //   })
  //   data.filterData=Arr
  // })
  window.scrollTo(0, 0);


  const filteredData =CategoryList?.CategoryList?.categorylist && CategoryList?.CategoryList?.categorylist
  .filter(d => d?.categorySlug === params).map(data => {
    const matchingEntries = categoryEntries?.ChannelEntriesList?.channelEntriesList
      .filter(res => res?.categories?.some(val => val?.some(s => s?.categorySlug === data?.categorySlug)));
    return { ...data, filterData: matchingEntries };
  });

  if(filteredData){
    setCategoryList(filteredData)
  }
  else(
    setCategoryList(CategoryList?.CategoryList?.categorylist)
  )
  },[])


  


  // Serch filter data
  // let datsss=categoryList&&categoryList?.[0].filterData.filter((d=>d.id==65))

  // categoryList&&categoryList.map((d)=>{
  //   d.filterData=datsss
  // })

  const handleRoute=(slug)=>{
    setRouter(slug)
  }

  return (
    <>
    <main className="min-h-screen bg-white">
        <div className="sm:px-10 px-4 lg:px-40 py-10 max-w-screen-2xl m-auto">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/" className="text-sm font-medium text-grey-600">Home</Link>
            <img src="/img/right-arrow.svg" className="w-2 h-2" />
            <Link href="javascript:void(0)" className="text-sm font-semibold text-black">{categoryList && categoryList?.[0]?.categoryName}</Link>
          </div>
          <div>
            <h3 className="font-semibold text-[32px] mb-8">{categoryList && categoryList?.[0]?.categoryName}</h3>
            {categoryList && categoryList?.map((response,index)=>(

              <>
              {response?.filterData.length !== 0 ? 
              <>
              {response?.filterData.map((result)=>(
                <>
                <div className="pb-6 flex justify-between items-center group border-b border-gray-100 mb-6">
                  <Link href={`/categoriesDetails/${result?.slug}`} onClick={()=>handleRoute(response?.categorySlug)} className="text-black font-medium text-lg group-hover:text-blue-600">
                    {result?.title}
                  </Link>
                  <Link href={`/categoriesDetails/${result?.slug}`}>
                  <img src="/img/right-arrow-black.svg" />
                  </Link>
                </div>
                </>
                ))}
              </>:
               <>
               <NodataImg />
               </>
              }
                </>
              ))}
          </div>
        </div>
      </main>
    </>
  )
}


           