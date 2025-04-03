/**
 * Author: Moamen Ahmed
 * Last Modified: March 7th
 * Purpose: Login functionality
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

/**
 * Sign up through firebase auth  
 *
 * @async
 * @param {string} email 
 * @param {string} password 
 * @returns {unknown} 
 */
export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

/**
 * Sign In functionality
 *
 * @async
 * @param {string} email 
 * @param {string} password 
 * @returns {unknown} 
 */
export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};
