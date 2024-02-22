import { ScrappedDataGPTResponse } from "../../helpers/chat-gpt";
import { FacebookPage } from "../../helpers/facebook/FBPage";
import { FBUserModel } from "../../models/schema";
import { FBIUser } from "../../types";

const arr =
  '[\n  "skin care products and services",\n  "cleansers for healthy skin",\n  "exfoliators for radiant complexion",\n  "moisturizers for hydrated skin",\n  "serums and treatments for skin",\n  "face masks for different skin concerns",\n  "sunscreen products for UV protection",\n  "eye care products for rejuvenated eyes",\n  "targeted solutions for specific skin concerns"\n]';
import { Request, Response } from "express";
export const automateFBPost = async (req: Request, res: Response) => {
  const data = { message: "", link: "" };
  try {
    const { GCP_API_QueryString } = new ScrappedDataGPTResponse();
    // const qeuryString = await GCP_API_QueryString();

    // return res.status(200).json({ data: qeuryString });
    // const FBUser: FBIUser[] = await FBUserModel.find();
    // if (FBUser.length === 0) throw new Error("there are no users");
    // FBUser.forEach((user) => {
    //   const { createPost } = new FacebookPage(user.accessToken, user._id);
    // });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
