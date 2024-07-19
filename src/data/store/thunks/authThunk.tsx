import { createAsyncThunk } from '@reduxjs/toolkit';
import NavigationConstants from '../../../navigators/NavigationConstant';
import FlashMessageRef from '../../../utils/FlashMessageRef';
import * as NavigationObject from "../../../utils/NavigationObject";
import { resetScreen } from '../../../utils/NavigationObject';
import * as SessionManager from '../../../utils/SessionManager';
import WebConstants from '../../../webServices/WebConstants';
import AuthRepo from '../../repo/AuthRepo';

export const userLoginThunk = createAsyncThunk(
  'userLoginThunk',
  async (body: any) => {
    const res: any = await AuthRepo.LoginApi(
      body.name,
      body.email,
      body.mobileNumber,
      body.isNewUser,
      body.deviceToken,
      body.deviceType,
      body.userType,
      body.firebaseUserId
    );

    console.log("loginThunk ress", res)
    console.log("*****************" + WebConstants.kLogin)

    if (res?.response_code === 200) {
      await SessionManager.setLoginDataAsync(res?.response_packet);
      if (res?.response_packet?.phoneNumber) {
        resetScreen(NavigationConstants.BottomBarNavigation);
      }
      //  if (res?.response_packet?.isProfileComplete === false) {
      //   let userDetailsObj = {
      //     ...res?.response_packet,
      //     isFromProfileScreen: false,
      //   };
      //   NavigationObject.navigate(NavigationConstants.EditProfileScreen, {
      //     userDetails: userDetailsObj
      //   })
      //   // resetScreen(NavigationConstants.EditProfileScreen);
      // }
      else {
        resetScreen(NavigationConstants.LoginScreen);
      }
      return true
    }
    else if (res?.response_code === 404) {
      FlashMessageRef.show({ message: res?.failure_message });
      NavigationObject.navigate(NavigationConstants.SignUpScreen, {
        firebaseUserId: body.firebaseUserId,
        mobileNumber: body.mobileNumber
      })
      return false
    } else {
      return false
    }
  },
);


export const userSignupThunk = createAsyncThunk(
  'userSignupThunk',
  async (body: any) => {
    const res: any = await AuthRepo.SignUpApi(
      body.name,
      body.email,
      body.mobileNumber,
      body.isNewUser,
      body.deviceToken,
      body.deviceType,
      body.userType,
      body.firebaseUserId,
      body.latitude,
      body.longitude,
      body.postcode,
      body.address,
      body.wasteCarriersLicence,
      body.publicLiabilityInsurance,
      body.whereYouTipWaste,
      body.isVATRegistered,
      body.vatNumber,
      body.uploadAddressProof,
      body.carrerLicenseExpiryDate,
	    body.insuranceExpiryDate,
    );

    console.log("Signup thunk ress", res)
    if (res?.response_code === 200) {
      FlashMessageRef.show({ message: res?.success_message, success: true });
      await SessionManager.setLoginDataAsync(res?.response_packet);
      // NavigationObject.navigate(NavigationConstants.HomeScreen, { isFromSignUp: true })
      NavigationObject.resetScreen(NavigationConstants.BottomBarNavigation)


      return true
    }
    else if (res?.response_code === 208) {
      FlashMessageRef.show({ message: res?.failure_message });
      return false
    } else {
      return false
    }

  },
);




