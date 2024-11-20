import { signInAnonymously } from "firebase/auth";
import { auth } from "../config/firebase.config";

export default async function signIntoFirebaseWithClerk(token: string) {
  // Sign into Firebase with the Clerk token
  signInAnonymously(auth ).then((credentials) =>
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user
    console.log("User:", credentials.user)
  );
}
