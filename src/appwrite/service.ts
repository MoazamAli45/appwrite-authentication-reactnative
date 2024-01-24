import {ID, Account, Client} from 'appwrite';

import config from 'react-native-config';

import Snackbar from 'react-native-snackbar';

const appwriteClient = new Client();

const APPWRITE_ENDPOINT = config.APPWRITE_API_URL;
const APPWRITE_PROJECT_ID = config.APPWRITE_PROJECT_ID;

//   FOR CREATING USER ACCOUNT
type createUserAccount = {
  name: string;
  email: string;
  password: string;
};

type loginUserAccount = {
  email: string;
  password: string;
};

//  CLASS
class AppwriteService {
  account;

  constructor() {
    appwriteClient
      .setEndpoint(APPWRITE_ENDPOINT)
      .setProject(APPWRITE_PROJECT_ID);

    this.account = new Account(appwriteClient);
  }

  //   createAccount

  async createAccount({email, password, name}: createUserAccount) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //   Move to login function
      } else {
        return userAccount;
      }
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });
      console.log(' ERROR IN CREATE ACCOUNT FUNCTION 🔥');
    }
  }

  //    LOGIN ACCOUNT
  async login({email, password}: loginUserAccount) {
    try {
      const loginAccount = await this.account.createEmailSession(
        email,
        password,
      );
    } catch (error) {
      Snackbar.show({
        text: String(error),
        duration: Snackbar.LENGTH_LONG,
      });

      console.log('ERROR IN login FUNCTION 🔥');
    }
  }

  //   GET USER
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log('ERROR IN GET CURRENT USER 🔥🔥');
    }
  }

  // logout

  async logout() {
    try {
      //   THIS WILL DELETE THE CURRENT USER
      return await this.account.deleteSession('current');
    } catch (error) {
      console.log(':: ERROR IN LOGOUT FUNCTION 🔥');
    }
  }
}
