import config from "../config";
import { Client, Account, ID } from "appwrite";

export class Auth {

    client = new Client();
    account;
    constructor(){
        this.client 
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
             

        this.account = new Account(this.client);
    }
    
    async createAccount({email , password , name }){
        try{
       const userAccount  = await  this.account.create(ID.unique(), email, password, name);
       if(userAccount){
        return this.login({email , password});
       }
       else{
        throw new Error("Unable to create account");
       }
        }
        catch (error){
           console.log(error.message);
        }
}

    async login({email , password}){
        try{
      return await this.account.createEmailPasswordSession(email, password);
}
        catch(error){
            console.log(error.message)
            ;
        }
    }
    async getCurrentUser(){
        try{
            return await this.account.get();
        }
        catch(error){
          console.log("Appwrite service :: getCurrentUser :: error", error.message);
        }
        return null;
    }
   
    async logout(){
        try{
            return await this.account.deleteSessions();
        }
        catch(error){
            console.log("Appwri te service :: logout :: error", error.message);
        }
    }





}




const AuthService = new Auth()




export default AuthService;



