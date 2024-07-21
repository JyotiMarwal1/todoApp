import { createAsyncThunk } from "@reduxjs/toolkit";
import FlashMessageRef from "../../../utils/FlashMessageRef";
import PostRepo from "../../repo/PostRepo";

export const postThunk = createAsyncThunk(
    'postThunk',
    async () => {
      const res: any = await PostRepo.getPostApi()
  
      console.log("post thunk ress", res)
    //   if (res?.response_code === 200) {
    //     return true
    //   }
    //   else if (res?.response_code === 208) {
    //     FlashMessageRef.show({ message: res?.failure_message });
    //     return false
    //   } else {
    //     FlashMessageRef.show({ message: res?.failure_message });
    //     return false
    //   }
  
    if (res?.length > 0) {
        return true
      }
       else {
        FlashMessageRef.show({ message: res?.failure_message });
        return false
      }

    },
  );
  