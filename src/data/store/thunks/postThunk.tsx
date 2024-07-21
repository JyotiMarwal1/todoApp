import { createAsyncThunk } from "@reduxjs/toolkit";
import FlashMessageRef from "../../../utils/FlashMessageRef";
import PostRepo from "../../repo/PostRepo";

export const postThunk = createAsyncThunk(
    'postThunk',
    async () => {
        const res = await PostRepo.getPostApi();
        console.log("post thunk ress", res);
        return res; // Ensure the response is returned
    },
);
