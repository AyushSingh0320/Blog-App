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
           <div className='flex flex-wrap gap-4'>
            {post.map((P) => {
  console.log("PostCard data:", P);
  return (
    <div key={P.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
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