"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import DetailPageSkeleton from '../SkeletonLoader/DetailPageSkeleton';
import { getRouter } from '@/app/api/serverAction';

export default function CategoriesDetails({detailData,CategoryList,params}) {

    console.log(CategoryList,"CategorieFilter101789");
    
    const [loader,setLoader]=useState(true)
    const [routeShow,setRouteShow]=useState("")

    console.log(routeShow,"routeShowwww");

// const testCallApi=async()=>{
//     let variable_category={
//         "categoryGroupId": 1,
//         "limit":50,
//         "offset":0
//       }
      
//     let variable_slug={ "limit": 10, "offset": 0,"slug": params}

//       const [CategoryList,detailData]=await Promise.all([fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY,variable_category),fetchGraphQl(GET_POSTS_SLUG_QUERY,variable_slug)])
//     }



const [isScriptLoaded, setIsScriptLoaded] = useState(false);

    useEffect(() => {
      if (isScriptLoaded) return;
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com?plugins=forms,typography,aspect-ratio,line-clamp,container-queries';
      script.defer = true;
      script.async = true;
  
      script.onload = () => setIsScriptLoaded(true); 
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, [isScriptLoaded]);


useEffect(()=>{
    window.scrollTo(0, 0);
    if(detailData){
        setLoader(false)
    }
    const RouteFn=async()=>{
     let datass=await getRouter()
     setRouteShow(datass?.value);
    }
    RouteFn()
},[])


console.log(detailData,"detailData");

    const CategorieFilter=CategoryList?.CategoryList?.categorylist?.filter(d=>(detailData?.ChannelEntryDetail?.categoriesId.toString().includes(d?.id.toString()) && (d?.categorySlug == routeShow && routeShow)))


    console.log(CategorieFilter,"CategorieFilter101");
    console.log(detailData?.ChannelEntryDetail?.categoriesId,"detailDataqqq",CategoryList,routeShow)
    
  return (
    <>
    <main className="min-h-screen bg-white">
                <div className="sm:px-10 px-4 lg:px-40 py-10 max-w-screen-2xl m-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <Link href="/" className="text-sm font-medium text-grey-600">Home</Link>
                        <img src="/img/right-arrow.svg" className="w-2 h-2" />
                        {loader == false?
                        // <Link href={`/allCategories/${CategorieFilter&&CategorieFilter?.[0]?.categorySlug}`}className="text-sm font-medium text-grey-600">{CategorieFilter&&CategorieFilter?.[0]?.categoryName}</Link>:<>
                          <Link href={`/allCategories/${CategorieFilter&&CategorieFilter?.[0]?.categorySlug}`}className="text-sm font-medium text-grey-600">{CategorieFilter&&CategorieFilter?.[0]?.categoryName}</Link>:<>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 shadow animate-pulse"></div>
                        </>}
                        <img src="/img/right-arrow.svg" className="w-2 h-2" />
                        {loader == false?
                        <Link href="javascript:void(0)" className="text-sm font-semibold text-black line-clamp-1">{routeShow && detailData?.ChannelEntryDetail?.title}</Link>
                        :
                        <>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 shadow animate-pulse"></div>
                        </>}
                    </div>
                    {loader?<><DetailPageSkeleton /></>
                    :<>
                    <div className="flex flex-col gap-6 mb-10">
                        <h2 className="text-[40px] font-semibold text-black">{detailData?.ChannelEntryDetail?.title}</h2>
                        {/* <p className="text-gray-300 text-lg font-normal">
                            Help Center is your own, publicly accessible Knowledge Base where your customers can find answers to their questions. It supports the other customer service channels you use and improves the average chat resolution time. Help Center is your own, publicly accessible Knowledge Base where your customers can find answers to their questions. It supports the other customer service channels you use and improves the average chat resolution time. Help Center is your own, publicly accessible Knowledge Base where your customers can find answers to their questions. It supports the other customer service channels you use and improves the average chat resolution time. Help Center is your own, publicly accessible Knowledge Base where your customers can find answers to their questions. It supports the other customer service channels you use and improves the average chat resolution time.
                        </p> */}
                    </div>
                    <div className="mb-10">
                        {/* <img src={`${imageUrl}${detailData?.ChannelEntryDetail?.coverImage}`} className="w-full h-auto" /> */}
                    </div>
                    <div className="flex flex-col gap-6 mb-6">
                        {/* <h2 className="text-2xl font-semibold text-black">How To Add Images/Videos To The KnowledgeBase Article</h2> */}
                        
                         {/* {detailData?.ChannelEntryDetail?.contentChunk?.data?.length !=0 &&

                          detailData?.ChannelEntryDetail?.contentChunk?.data.map((res)=>(
                            <>
                            <div className="text-gray-300 text-lg font-normal desc" dangerouslySetInnerHTML={{__html: res.replaceAll("<br>"," "),}}/>
                            </>
                          ))
                         
                         } */}

                    <div className="text-gray-300 text-lg font-normal desc" dangerouslySetInnerHTML={{__html: detailData?.ChannelEntryDetail?.description?.replaceAll("<br>"," "),}}/>
                    </div>
                    </>}
                    <div className="mt-[60px] py-[60px] bg-gray-200 flex justify-center items-center">
                        <div className="flex flex-col gap-8">
                            <h3 className="text-black text-2xl font-semibold">Was this article helpful?</h3>
                            <div className="flex gap-6 items-center justify-center">
                                <button className="flex items-center justify-center gap-1.5 border-gray-500 border h-11 px-6 rounded text-base font-medium text-black"><img src="/img/thumbs-up.svg" /> yes</button>
                                <button className="flex items-center justify-center gap-1.5 border-gray-500 border h-11 px-6 rounded text-base font-medium text-black"><img src="/img/thumbs-down.svg" /> no</button>
                            </div>
                        </div>
                    </div> 
                </div>
            </main>
    </>
  )
}
