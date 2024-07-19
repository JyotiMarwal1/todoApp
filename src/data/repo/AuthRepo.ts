import FlashMessageRef from '../../utils/FlashMessageRef';
import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class AuthRepo {

  static LoginApi = (
    name: string,
    email: string,
    mobileNumber: string,
    isNewUser: boolean,
    deviceToken: string,
    deviceType: number,
    userType: number,
    firebaseUserId: string
  ) => {
    return new Promise((resolve, reject) => {
      const body = {
        name,
        email,
        mobileNumber,
        isNewUser,
        deviceToken,
        deviceType,
        userType,
        firebaseUserId
      };
      const apiManager = new ApiManager();
      apiManager.apiConfig.isApiResAutoHandle = false

      apiManager.makePostRequest(WebConstants.kLoginSignUp, body).then((res: any) => {
        console.log("loginapires", res)
        resolve(res);
      });
    });
  };

  static SignUpApi = (
    name: string,
    email: string,
    mobileNumber: string,
    isNewUser: boolean,
    deviceToken: string,
    deviceType: number,
    userType: number,
    firebaseUserId: string,
    latitude: any,
    longitude: any,
    postcode: any,
    address: any,
    wasteCarriersLicence: any,
    publicLiabilityInsurance: any,
    whereYouTipWaste: any,
    isVATRegistered: any,
    vatNumber: any,
    uploadAddressProof: any,
    carrerLicenseExpiryDate : any,
	  insuranceExpiryDate : any,
  ) => {
    return new Promise((resolve, reject) => {
      const body = {
        name,
        email,
        mobileNumber,
        isNewUser,
        deviceToken,
        deviceType,
        userType,
        firebaseUserId,
        latitude,
        longitude,
        postcode,
        address,
        wasteCarriersLicence,
        publicLiabilityInsurance,
        whereYouTipWaste,
        isVATRegistered,
        vatNumber,
        uploadAddressProof,
        carrerLicenseExpiryDate,
	      insuranceExpiryDate,
      };
      const apiManager = new ApiManager();
      apiManager.apiConfig.isApiResAutoHandle = false

      apiManager.makePostRequest(WebConstants.kLoginSignUp, body).then((res: any) => {
        console.log("loginapires", res)
        resolve(res);
      });
    });
  };

  static kIsUserExistsAtAnotherSideApi = (
    mobileNumber: string,
    userType: number,

  ) => {
    return new Promise((resolve, reject) => {
      const body = {
        mobileNumber,
        userType,
      };

      console.log("*****************" + WebConstants.kLogin)
      const apiManager = new ApiManager();
      apiManager.apiConfig.isApiResAutoHandle = false

      apiManager.makePostRequest(WebConstants.kIsUserExistsAtAnotherSide, body).then((res: any) => {
        console.log("kIsUserExistsAtAnotherSide Res", res)
        resolve(res?.response_packet);
      });
    });
  };


  static kkIsCollectorVerifyApi = (

  ) => {
    return new Promise((resolve, reject) => {
      const body = {

      };
      console.log("*****************" + WebConstants.kLogin)
      const apiManager = new ApiManager();
      apiManager.apiConfig.isApiResAutoHandle = false
      apiManager.apiConfig.showSpinner = true
      apiManager.makePostRequest(WebConstants.kIsCollectorVerify, body).then((res: any) => {
        console.log("kIsCollectorVerify Res", res)
        resolve(res?.response_packet);
      });
    });
  };

  static logoutApi = () => {
    return new Promise((resolve, reject) => {
      const body = {}
      const apiManager = new ApiManager()
      apiManager.makePostRequest(WebConstants.kLogout, body).then((res: any) => {
        FlashMessageRef.show({ message: res?.success_message, success: true })
        console.log("logout api", res)
        resolve(res)
      })
    })
  };


  static deleteApi = () => {
    return new Promise((resolve, reject) => {
      const body = {}
      const apiManager = new ApiManager()
      apiManager.apiConfig.isApiResAutoHandle = false
      apiManager.makePostRequest(WebConstants.kDeleteAccount, body).then((res: any) => {
        // FlashMessageRef.show({ message: res?.success_message, success: true })
        FlashMessageRef.show({ message: res?.success_message, success: true })
        console.log("deleete api", res)
        resolve(res)
      })
    })
  };


}

export default AuthRepo;
