import React, { Suspense } from 'react'
import HomePage from './homepage/HomePage'
import HomePageSkeleton from '../components/Skeleton/HomePageSkeleton'
import BookSkeleton from '../components/Skeleton/BookSkeleton'

const page = () => {
  return (
    <div>
      <Suspense fallback={<HomePageSkeleton/>}>
      {/* <BookSkeleton /> */}
      <HomePage />
      {/* <HomePageSkeleton/> */}
      </Suspense>
      </div>
  )
}

export default page