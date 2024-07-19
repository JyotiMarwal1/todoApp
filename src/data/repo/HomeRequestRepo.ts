import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class HomeRequestRepo {

    static getAllRequestListForCollector = (
        pageNumber: number,
        pageSize: number,

    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                pageNumber,
                pageSize
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.showSpinner = true
            apiManager
                .makeGetRequest(WebConstants.kgetAllRequestForCollector + `?pageNumber=${pageNumber}&pageSize=${pageSize}`)
                .then((res: any) => {
                    console.log("Ressssss", res)
                    resolve(res);
                });
        });
    };

    static getRequestActiveStatus = (
        WastePickupId: any

    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                WastePickupId
            };
            const apiManager = new ApiManager();
            apiManager
                .makeGetRequest(WebConstants.kgetRequestActiveStatus + `?WastePickupId=${WastePickupId}`,)
                .then((res: any) => {
                    resolve(res);
                });
        });
    };

    static getRequestDetail = (
        WastePickupId: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                WastePickupId,
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.showSpinner = false
            apiManager
                .makeGetRequest(WebConstants.kgetRequestDetail + `?WastePickupId=${WastePickupId}`,)
                .then((res: any) => {
                    resolve(res);
                });
        });
    };

    static getRequestDetailWhenCustomerAcceptReqApi = (
        WastePickupId: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                WastePickupId,
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.showSpinner = false
            apiManager
                .makeGetRequest(WebConstants.kGetQuoteDetail + `?WastePickupId=${WastePickupId}`,)
                .then((res: any) => {
                    resolve(res);
                });
        });
    };

    static RequestAcceptRejectApi = (
        wastePickupId: any,
        pickupStatus: boolean

    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                wastePickupId,
                pickupStatus
            };

            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false

            apiManager.makePostRequest(WebConstants.kRequestAcceptReject, body).then((res: any) => {
                console.log("kRequestAcceptReject", res)
                resolve(res);
            });
        });
    };

    static UpdateCollectorLocationApi = (
        longitude: any,
        latitude: any,
        pickupAddress: any,
        postCode: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                longitude,
                latitude,
                pickupAddress,
                postCode
            };

            const apiManager = new ApiManager();
            apiManager.makePostRequest(WebConstants.kUpdateCollectorLocation, body).then((res: any) => {
                console.log("kUpdateCollectorLocation", res)
                resolve(res);
            });
        });
    };

    static UpdateCollectorLocationWithoutLoaderApi = (
        longitude: any,
        latitude: any,
        pickupAddress: any,
        postCode: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                longitude,
                latitude,
                pickupAddress,
                postCode
            };

            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false
            apiManager.makePostRequest(WebConstants.kUpdateCollectorLocation, body).then((res: any) => {
                console.log("UpdateCollectorLocationWithoutLoaderApi", res)
                resolve(res);
            });
        });
    };


    static kUpdateWastePickUpStatusApi = (
        wastePickupId: any,
        pickupStatus: number

    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                wastePickupId,
                pickupStatus
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false
            apiManager.makePostRequest(WebConstants.kUpdateWastePickUpStatus, body).then((res: any) => {
                console.log("kUpdateWastePickUpStatus", res)
                resolve(res);
            });
        });
    };


    static uploadProfileImage = (
        name: string,
        type: string,
        uri: string
    ) => {
        return new Promise((resolve, reject) => {
            const formDataBody = new FormData()
            formDataBody.append("Photo", { name, uri, type })
            const apiManager = new ApiManager()
            apiManager.apiConfig.showSpinner = false
            const apiUrl = WebConstants.kUploadImages + "?Type=1"
            apiManager.makeMultiPartPostRequest(apiUrl, formDataBody).then((res: any) => {
                resolve(res.response_packet)
                // resolve(res.response_packet.fileName)
            })
        })
    };


    static uploadCollectorProfileImage = (
        name: string,
        type: string,
        uri: string
    ) => {
        return new Promise((resolve, reject) => {
            const formDataBody = new FormData()
            formDataBody.append("Photo", { name, uri, type })
            const apiManager = new ApiManager()
            const apiUrl = WebConstants.kUploadImages + "?Type=3"
            apiManager.makeMultiPartPostRequest(apiUrl, formDataBody).then((res: any) => {
                resolve(res.response_packet)
                // resolve(res.response_packet.fileName)
            })
        })
    };

    static uploadAddressImage = (
        name: string,
        type: string,
        uri: string
    ) => {
        return new Promise((resolve, reject) => {
            const formDataBody = new FormData()
            formDataBody.append("Photo", { name, uri, type })
            const apiManager = new ApiManager()
            apiManager.apiConfig.showSpinner = true
            const apiUrl = WebConstants.kUploadImages + "?Type=1"
            apiManager.makeMultiPartPostRequest(apiUrl, formDataBody).then((res: any) => {
                resolve(res.response_packet)
                // resolve(res.response_packet.fileName)
            })
        })
    };


    static RFQCompleteByCollectorApi = (
        wastePickupId: any,
        rfqCompleteImages: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                wastePickupId,
                rfqCompleteImages,
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false
            apiManager.makePostRequest(WebConstants.kRFQCompleteByCollector, body).then((res: any) => {
                console.log("kRFQCompleteByCollector", res)
                resolve(res);
            });
        });
    };


    static changeQuoteApi = (
        wastePickupId: any,
        collectorCost: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                wastePickupId,
                collectorCost,
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false
            apiManager.makePostRequest(WebConstants.kChangeQuote, body).then((res: any) => {
                console.log("kChangeQuote", res)
                resolve(res);
            });
        });
    };

    static getCollectorStripeStatus = (

    ) => {
        return new Promise((resolve, reject) => {

            const apiManager = new ApiManager();
            apiManager.apiConfig.showSpinner = true
            apiManager
                .makeGetRequest(WebConstants.kCollectorStripeStatus)
                .then((res: any) => {
                    console.log("kCollectorStripeStatus", res)
                    resolve(res);
                });
        });
    };

    static RevisedQuoteApi = (
        wastePickupId: any,
        reviseQuoteCharges: any,
    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                wastePickupId,
                reviseQuoteCharges,
            };
            const apiManager = new ApiManager();
            apiManager.apiConfig.isApiResAutoHandle = false
            apiManager.makePostRequest(WebConstants.kRevisedQuote, body).then((res: any) => {
                console.log("kRevisedQuote", res)
                resolve(res);
            });
        });
    };

}

export default HomeRequestRepo;