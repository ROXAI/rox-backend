import { FirebaseAuth } from "../services/firebase";
const { verifyIdToken } = new FirebaseAuth();

export const tt = async (token: string) => {
  try {
    const data = await verifyIdToken(token);
    console.log("====================================");
    console.log("data", data);
    console.log("====================================");
  } catch (error: any) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
  }
};


