/**
 * Author: Inreet Kaur
 * Last Modified: March 7th
 * Purpose: Test the authentication operations.
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { signUp, signIn } from "../firebaseControllers/firebaseAuth";

describe("Firebase Auth Functions", () => {
  const email = "test@rapidcare.ca";
  const password = "capstone";
  let userId: string | undefined;

  beforeAll(async () => {
    // Optional: Set up any necessary preconditions
  });

  afterAll(async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      userId = userCredential.user.uid;
      await userCredential.user.delete();
    } catch (error) {
      console.error("Error cleaning up user:", error);
    }
  });

  test("should create a new user with valid credentials", async () => {
    const user = await signUp(email, password);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  test("should throw an error if credentials are invalid", async () => {
    await expect(signUp(email, password)).rejects.toThrow();
    await expect(signUp("123ab", password)).rejects.toThrow();
    await expect(signUp(email, "123")).rejects.toThrow();
  });

  test("should signIn using valid credentials", async () => {
    const user = await signIn(email, password);
    expect(user).toBeDefined();
    expect(user.email).toBe(email);
  });

  test("should throw an error if credentials are invalid", async () => {
    await expect(signIn("wrong@example.com", password)).rejects.toThrow();
    await expect(signIn(email, "12345")).rejects.toThrow();
    await expect(signIn("wrong@example.com", "12345")).rejects.toThrow();
  });
});
