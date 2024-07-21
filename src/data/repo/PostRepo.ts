import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class PostRepo {

  static getPostApi = (
  ) => {
    return new Promise((resolve, reject) => {
      const body = {
        
      };
      const apiManager = new ApiManager();
        apiManager.apiConfig.isApiResAutoHandle = false

      apiManager.makeGetRequest(WebConstants.kPosts).then((res: any) => {
        console.log("post response", res)
        resolve(res);
      });
    });
  };

}

export default PostRepo;
