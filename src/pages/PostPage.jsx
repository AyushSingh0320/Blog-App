import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatabaseService from '../APPWRITE/Database.js'
import { Container ,Button } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Fileservice from "../APPWRITE/File";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post["user-id"] === userData.$id : false;

    useEffect(() => {
        if (slug) {
            DatabaseService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        DatabaseService.deletePost(post.$id).then((status) => {
            if (status) {
               Fileservice.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="max-w-3xl w-full mx-auto px-4">
                    <div className="flex justify-center mb-4 relative">
                        <img
                            src={Fileservice.getpreview(post.Image_ID)}
                            alt={post.title}
                            className="rounded-xl max-h-96 w-full object-contain border border-gray-400"
                            style={{ maxWidth: "100%" }}
                        />
                        {isAuthor && (
                            <div className="absolute right-6 top-6">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgcolor="bg-green-500" className="mr-3">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgcolor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold break-words">{post.title}</h1>
                    </div>
                    <div className="browser-css overflow-x-auto w-full break-words">
                        {typeof post.Content === "string" ? parse(post.Content) : null}
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
