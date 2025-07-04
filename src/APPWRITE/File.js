import config from "../config";
import { Client, ID , Databases , Query , Storage } from "appwrite";



class File {
  client = new Client();
  bucket ;


  constructor(){
    this.clientlientlient
             .setEndpoint(config.appwriteUrl)
             .setProject(config.appwriteProjectId);
    this.bucket = new Storage(this.client)
  }


  async uploadFiles(file){
    try{
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
)
    }
    catch(error){
        console.log("Appwrite service :: getCurrentUser :: error", error.message);
        return false ;
    }
  }

  async delteFile(fileID){
    try{
        await this.bucket.deleteFile(
            config.appwriteBucketId,
            fileID
        )
    }
    catch(error){
        console.log("Appwrite service :: getCurrentUser :: error", error.message);
        return false ;
    }
  }


  getpreview(fileID){
    return this.bucket.getFilePreview(
        config.appwriteBucketId,
        fileID
    )
  }



  }




const Fileservice = new File()

export default Fileservice;