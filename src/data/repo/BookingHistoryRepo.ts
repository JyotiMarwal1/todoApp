import ApiManager from '../../webServices/ApiManager';
import WebConstants from '../../webServices/WebConstants';

class BookingHistoryRepo {

    static getAllBookingHistoryListForCollector = (
        pageNumber: number,
        pageSize: number,

    ) => {
        return new Promise((resolve, reject) => {
            const body = {
                pageNumber,
                pageSize
            };
            const apiManager = new ApiManager();
            apiManager
                .makeGetRequest(WebConstants.kGetAllBookingHistoryForCollector + `?pageNumber=${pageNumber}&pageSize=${pageSize}`,)
                .then((res: any) => {
                    resolve(res);
                });
        });
    };


}

export default BookingHistoryRepo;