import CategoriesDetails from '@/Component/CategoriesDetails'
import { fetchGraphQl } from '@/app/api/graphicql';
import { GET_POSTS_CATEGORYLIST_QUERY, GET_POSTS_SLUG_QUERY } from '@/app/api/query';
import { defaultCategorySlug } from '@/app/api/url';
import PageNotFound from '@/app/not-found';
import React from 'react'

export default async function page({params}) {


    // let variable_category={
    //     "categoryGroupId": 1,
    //     "limit":50,
    //     "offset":0
    //   }
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
      
    // let variable_slug={ "limit": 10, "offset": 0,"slug": params?.slug}

    let variable_slug={"slug": params?.slug, 
    "AdditionalData": {
      "authorDetails": true,
      "memberProfile": false,
      "additionalFields": false,
      "categories": false
    }
    
  }

      const [CategoryList,detailData]=await Promise.all([fetchGraphQl(GET_POSTS_CATEGORYLIST_QUERY,variable_category),fetchGraphQl(GET_POSTS_SLUG_QUERY,variable_slug)])

    if (!detailData) {
      return PageNotFound();
    }

    return (
        <>  
            <CategoriesDetails detailData={detailData} CategoryList={CategoryList} params={params?.slug}/>
        </>
    )
}
