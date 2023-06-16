declare namespace Express {
  export interface User {
    // Define the properties of your custom User type here
    _id: string | Types.ObjectId;
    email: string;
    accountType: string;
    iat: string;
    exp: string;
    // Add any other properties specific to your User type
  }
}
