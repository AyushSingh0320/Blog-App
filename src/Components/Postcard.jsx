import React from 'react'
// import DatabaseService from "../APPWRITE/Database"
import Fileservice from "../APPWRITE/File"
import {Link} from 'react-router-dom'

function PostCard({ $id, Title, Image_ID }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="bg-gray-900 rounded-xl p-4 w-64 h-64 flex flex-col items-center justify-center ">
        <div className="w-full flex justify-center mb-2">
          {Image_ID && (
            <img
              src={Fileservice.getpreview(Image_ID)}
              alt={Title}
              className="rounded-8xl w-50 h-50 object-contain mb-2"
            />
          )}
        </div>
        <h2 className="text-xl font-bold text-center ">{Title}</h2>
      </div>
    </Link>
  );
}


export default PostCard