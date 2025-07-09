import React , {useState , useEffect} from 'react'
import DatabaseService from '../APPWRITE/Database_temp.js'
import { Container , PostCard } from '../Components'
import { useSelector } from 'react-redux';


function HomePage() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        DatabaseService.getallpost().then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents)
            }
        })
    }, [])
    if (!userData) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-black hover:text-gray-500">
                                Login To Read Posts !!
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
  
   
    const userPosts = posts.filter(
        (post) => post["user-id"] === userData?.$id
    );

    if (userPosts.length === 0) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <Container>
                    <div className="flex flex-col items-center justify-center h-full">
                        <h1 className="text-2xl font-bold text-black">
                            No Posts yet from your side.
                        </h1>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap gap-4">
                    {userPosts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default HomePage;