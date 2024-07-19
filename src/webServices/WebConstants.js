const URLS = {
  DEVELOPMENT: 'https://wasteappdev.24livehost.com/API/',
  PRODUCTION: 'https://wasteappuat.24livehost.com/API/',
  LIVE: 'https://api.thewasteapp.com/'
};

const WebConstants = {
  //Api constants 

  BASE_URL: URLS.LIVE,
  kLogin: 'api/Account/SignUpLogin',
  kLoginSignUp: 'api/Account/SignUpLoginVer1',
  kIsUserExistsAtAnotherSide: 'api/Account/UserCheckSignUpLogin',
  kIsCollectorVerify: 'api/ManageAccount/IsCollectorVerify',
  kgetAllRequestForCollector: 'api/CollectorWastePickup/CollectorAllRequest',
  kgetRequestActiveStatus: 'api/CollectorWastePickup/RequestStatusForCollector',
  kgetRequestDetail: 'api/CollectorWastePickup/CollectorQuoteRequestVer1',
  // kgetRequestDetail: 'api/CollectorWastePickup/CollectorQuoteRequest',
  kRequestAcceptReject: 'api/CollectorWastePickup/CollectorAcceptsRejectsCustomerRequest',
  kUpdateCollectorLocation: 'api/CollectorWastePickup/UpdateCollectorCurrentLocation',
  kUpdateWastePickUpStatus: 'api/CollectorWastePickup/UpdateWastePickUpStatus',
  // kGetQuoteDetail: 'api/CollectorWastePickup/GetQuoteDetail',
  kGetQuoteDetail: 'api/CollectorWastePickup/GetQuoteDetailVer1',
  kUploadImages: 'api/Account/UploadImages',
  kRFQCompleteByCollector: 'api/CollectorWastePickup/RFQComplete',
  kGetAllBookingHistoryForCollector: 'api/CollectorWastePickup/CollectorHistoryList',
  // kGetCollectorProfileDetails: 'api/CollectorWastePickup/CollectorGetProfile',
  kGetCollectorProfileDetails: 'api/CollectorWastePickup/CollectorGetProfileVer1',
  kUpdateCollectorProfileDetails: 'api/CollectorWastePickup/CollectorSetProfile',
  kChangeQuote: 'api/CollectorWastePickup/ChangeQuote',
  kLogout: 'api/ManageAccount/Logout',
  kDeleteAccount: 'api/ManageAccount/DeleteAccount',
  kCollectorStripeStatus: 'api/CollectorWastePickup/CollectorStripeStatus',
  kRevisedQuote: 'api/CollectorWastePickup/ReviseQuote',

  //Api keys
  // privacyPolicy: 'https://wasteappuat.24livehost.com/Home/Privacy',
  // termsAndConditions: 'https://wasteappuat.24livehost.com/Home/Privacy',

  //Api Live keys
  privacyPolicy: 'https://thewasteapp.com/privacyPolicy.html',
  termsAndConditions: 'https://thewasteapp.com/TermsAndConditions.html',

  //Network code
  NetworkNoReachableStatusCode: 503,

  //for create profile

};

export default WebConstants;
