import React, { useEffect, useState } from 'react'
import { Container, PostCard } from '../Components'
import DatabaseService from '../APPWRITE/Database.js'

function AllPostPage() {
const [post , setPost] = useState([])
useEffect(() => {
  DatabaseService.getallpost().then((result) => {
    if (result && result.documents) {
      setPost(result.documents);
    }
  });
}, []);
  return (
    <div className='w-full py-8'>
        <Container>
           <div className='flex flex-wrap'>
            {post.map((P) => {
  console.log("PostCard data:", P);
  return (
    <div key={P.$id}>
      <PostCard {...P} />
    </div>
  );
})}
               
           </div>
        </Container>
    </div>
  )
}

export default AllPostPage;