import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../Components'
import DatabaseService from '../APPWRITE/DATABASE.JS'

function AllPostPage() {
const [post , setPost] = useState([])
useEffect(()=>{
DatabaseService.getPost([]).then((post)=>{
    if(post){
        setPost(post.documents)
    }
})
},[])
  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
            {post.map((P) => {
                return (
                    <div key={P.$id}>
                        <PostCard p = {P}/>
                    </div>
                )
            })}
               
           </div>
        </Container>
    </div>
  )
}

export default AllPostPage;