import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class PostRepo {

  static getPostApi = (
  ) => {
    return new Promise((resolve, reject) => {
      const body = {
        
      };
      const apiManager = new ApiManager();
        apiManager.apiConfig.isApiResAutoHandle = true

      apiManager.makeGetRequest(WebConstants.kPosts).then((res: any) => {
        console.log("post response", res)
        resolve(res.response_packet);
      });
    });
  };

}

export default PostRepo;
