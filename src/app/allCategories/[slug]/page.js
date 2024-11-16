import AllCategories from '@/Component/AllCategories'
import { fetchGraphQl } from '@/app/api/graphicql'
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_LIST_QUERY } from '@/app/api/query'
import { defaultCategorySlug } from '@/app/api/url'
import PageNotFound from '@/app/not-found'
import React from 'react'



export default async function page({params}) {


  // let variable_category={
  //   "categoryGroupId": 1,
  //   "limit":50,
  //   "offset":0
  // }
  let variable_category={
    
    "commonFilter": {
    "limit":50,
    "offset":0},
    "categoryFilter": {
      // "hierarchyLevel": 2,
      "categoryGroupSlug": defaultCategorySlug,
      "excludeGroup": true,
  }
  }
//  let  variable_list={ "limit": 10, "offset": 0,"req": {"authorDetails": true,"categories": true},"categoryId":1}
let  variable_list={
  "commonFilter": {
    "limit": 10,
    "offset": 0,
    "keyword":""
  },
  "entryFilter": {
    "Status": "Publish",
    "categorySlug": defaultCategorySlug
  },
  "AdditionalData": {
    "categories": true
  }
}


  const [CategoryList,CategoryEntries]=await Promise.all([fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY,variable_category),fetchGraphQl(GET_POSTS_LIST_QUERY,variable_list)])

  const filteredData = CategoryList?.CategoryList?.categorylist.filter(d => d?.categorySlug === params?.slug)

  if (filteredData?.length==0) {
    return PageNotFound();
  }


  return (
    <>
      {/* <header className="bg-white shadow-lg top-0 sticky z-10">
        <div className="max-w-screen-2xl m-auto lg:px-20 sm:px-10 p-4 sm:py-6 h-[72px] bg-white   flex justify-between gap-4 items-center">
          <a href="javascript:void(0)" className="text-black-300 text-base font-medium flex items-center gap-4 whitespace-nowrap">
            <img src="img/logo.svg" />
            Help Center
          </a>
          <div className="relative sm:block hidden">
            <input type="text" className="h-[52px] w-full border border-gray-100 sm:max-w-[640px] lg:min-w-[640px] pr-10 rounded-lg px-6 text-base text-black font-medium focus-visible:outline-0" placeholder="Ask a question..." />
            <img src="img/search.svg" className="absolute top-4 right-4" />
          </div>
        </div>
      </header> */}
      <AllCategories CategoryList={CategoryList} CategoryEntries={CategoryEntries} params={params?.slug}/>
    </>
  )
}
