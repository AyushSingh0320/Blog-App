import config from "../config";
import { Client, ID , Databases , Query , Storage } from "appwrite";


class Databaseservice {
    client = new Client();
     databases;
     bucket;

     constructor(){
        this.client
             .setEndpoint(config.appwriteUrl)
             .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
     }


     async createpost({title , content , featuredImage , status , userId}){
        try{
            const result = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    userId,
                    featuredImage,
                    status

                    }
            )
            return result;
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error.message);
        }
        
     }

     async updatepost(ID, {title  , content , featuredImage , status }
){
        try{
       return await this.databases.updateDocument( config.appwriteDatabaseId,
                config.appwriteCollectionId,
                ID.unique(),
            {
                title,
                content,
                featuredImage,
                status
                

            })

        }
        catch(error){
        console.log(error.message
)
        }

     }

     async deletePost(){
        try{
         await this.databases.deleteDocument( 
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            ID.unique())
            return true
        }
        
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error.message);
            return false
        }
     }
 
     async getPost(){
      try{
       return await this.databases.getDocument(
            config.appwriteDatabaseId,
            config.appwriteCollectionId,
            ID.unique())
            
      }
      catch (error){
        console.log("Appwrite service :: getCurrentUser :: error", error.message);
        return false ;
      }
     }

      async getallpost(){
        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                [
                    Query.equal("status" , "active")
                ]
            )
        }
        catch(error){
            console.log("Appwrite service :: getCurrentUser :: error", error.message);
        }
      }
}









const DatabaseService = new Databaseservice();

export default DatabaseService;





