import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class UserProfileRepo {

    static getCollectorProfileDetailsApi = (


    ) => {
        return new Promise((resolve, reject) => {
            const body = {

            };
            const apiManager = new ApiManager();
            apiManager
                .makeGetRequest(WebConstants.kGetCollectorProfileDetails, body)
                .then((res: any) => {
                    resolve(res);
                });
        });
    };


    static updateCollectorProfileDetailsApi = (
        name: any,
        email: any,
        profileImage: any
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                name,
                email,
                profileImage
            };

            const apiManager = new ApiManager();
            apiManager.makePostRequest(WebConstants.kUpdateCollectorProfileDetails, body).then((res: any) => {
                console.log("updateCollectorrProfileDetailsApi", res)
                resolve(res);
            });
        });
    }

}

export default UserProfileRepo;