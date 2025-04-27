import React from 'react'
import UserHeader from '../components/UserHeader.jsx'
import UserPost from '../components/UserPost.jsx'

function UserPage() {
  return (
    <>
        <UserHeader/>
        <UserPost likes={200} replies={419} postImg="../../public/post1.png" postTitle = "Lets talk about threads" />
        <UserPost likes={100} replies={221} postImg="../../public/post2.png" postTitle = "Lets talk about instatgram" />
        <UserPost likes={50} replies={542} postImg="../../public/post3.png" postTitle = "Lets talk about facebook" />
        <UserPost likes={50} replies={542}  postTitle = "Lets talk about facebook" />
    </>
  )
}

export default UserPage
