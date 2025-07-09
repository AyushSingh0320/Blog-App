import React  from 'react'
import { useForm } from 'react-hook-form'
import {Button , Input , SelectBtn , RTE} from  "./index"
import { useSelector } from 'react-redux'
import DatabaseService from '../APPWRITE/Database_temp.js'
import { useNavigate } from 'react-router'
import Fileservice from '../APPWRITE/File'
import { useCallback } from 'react'



export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.Title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    // Redirect to login if not authenticated
    React.useEffect(() => {
        if (!userData) {
            navigate('/login');
        }
    }, [userData, navigate]);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await Fileservice.uploadFiles(data.image[0]) : null;

            if (file) {
                Fileservice.deleteFile(post.featuredImage);
            }

            const dbPost = await DatabaseService.updatepost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = data.image[0] ? await Fileservice.uploadFiles(data.image[0]) : null;

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                // Build payload to match Appwrite schema exactly
                // const payload = {
                //   Title: data.title,
                //   Content: data.content,
                //   "user-id": userData.$id,
                //   Image_ID: fileId
                // };
                console.log("userData at submit:", userData);
                // console.log("Final payload to send:", payload);
                const dbPost = await DatabaseService.createpost({ ...data, "user-id": userData.$id });
                console.log("Final payload to send:", dbPost)

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={Fileservice.getpreview(post.Image_ID)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgcolor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}