
import { Alert, PermissionsAndroid } from "react-native";
import { Strings } from "../localization/Strings";
import Constants from "./Constants";
import FlashMessageRef from "./FlashMessageRef";

const isStrEmpty = (str: string) => {
    return (str == "")
}

const isValidEmail = (val: string) => {
    return (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val));
}



const isValidPhoneNumber = (val: string) => {
    let validMobileNumberRegex = /^[0-9]+$/;
    console.log("validMobileNumberRegex.test(val)", validMobileNumberRegex.test(val))
    return (validMobileNumberRegex.test(val));
};


const isValidName = (val: string) => {
    // let validNameReg = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let validNameReg = /^[a-zA-Z0-9\s]+$/;
    return (validNameReg.test(val));
}



const isValidPassword = (password: string) => {
    // let passRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
    let passRegex = /^(?=.*?)(?=.*?[a-zA-Z])(?=.*?[0-9]).{8,15}$/;
    return (passRegex.test(password));
}

const isValidUserName = (username: string) => {
    let validUserRegex = /^[A-Za-z0-9 ]+$/;
    return (validUserRegex.test(username))
}

const isValidVATNumber = (VATNumber: string) => {
    let validVATRegex = /^(GB)?([0-9]{9}([0-9]{3})?|[A-Z]{2}[0-9]{3})$/;
    return (validVATRegex.test(VATNumber))
}


const showAlertPicker = (config: any) => {
    const arrOptions = config.options.map((e: string, i: number) => {
        return {
            text: e,
            onPress: () => config.onSelect(i),
        };
    });
    Alert.alert(config.headerTitle, config.headerMessage, arrOptions, {
        cancelable: true,
    });
};
const showAlert = function (title = "", message = "", handler = () => { }, btnTitle1 = Strings.ok) {
    Alert.alert(
        title,
        message,
        [
            {
                text: btnTitle1, onPress: () => handler(),
            },
        ],
        // { cancelable: false }
    )
}

const uuidv4 = () => {
    // eslint-disable-next-line
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            // eslint-disable-next-line
            var r = (Math.random() * 16) | 0,
                v = c === "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
};

const showAlertWithTwoButtons = function (message = "", handler = () => { }, no = () => { }, btnTitle1 = Strings.yes, title = Constants.APP_NAME) {
    Alert.alert(
        title,
        message,
        [
            {
                text: btnTitle1, onPress: () => handler(),
            },
            {
                text: "No", onPress: () => no(),
            }

        ],
        // { cancelable: false }
    )
}


const showDeletAlertWithTwoButtons = function (message = "", handler = () => { }, no = () => { }, btnTitle1 = Strings.yes, title = Constants.CONFIRMDELETE) {
    Alert.alert(
        title,
        message,
        [
            {
                text: btnTitle1, onPress: () => handler(),
            },
            {
                text: "No", onPress: () => no(),
            }

        ],
        // { cancelable: false }
    )
}

const showPermissionAlert = function (title = "", message = "", handler = () => { }, btnTitle1 = Strings.ok) {
    Alert.alert(
        title,
        message,
        [
            {
                text: btnTitle1, onPress: () => handler(),
            },
        ],
        // { cancelable: false }
    )
}

const isAndroidPermission = async () => {
    try {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        ]);
        console.log(
            '@forground - ',
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED,
            '\n background - ',
            granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED,
        );
        if (
            granted['android.permission.ACCESS_FINE_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
            granted['android.permission.ACCESS_BACKGROUND_LOCATION'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
            return true;
        }
    } catch (err) {
        console.warn(err);
        FlashMessageRef.show({ message: Strings.oopsSomethingWentWrong });
    }
    return false;
}

function formatDate(inputDate) {
    const inputDateStr = inputDate ?? ""; // Use an empty string if inputDate is undefined or null
    const dateParts = inputDateStr.split("/");
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt((dateParts[2] ?? "").substring(0, 4)); // Add nullish coalescing operator and empty string fallback

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedDate = `${months[month - 1]} ${day.toString().padStart(2, "0")}, ${year}`;
    return formattedDate;
}


const truncateString = (str: any) => {
    if (str.length <= 20) {
        return str;
    } else {
        return str.substring(0, 20) + '...';
    }
}

const maskNumber = (num: any) => {
    const numString = num.toString();
    const lastFourDigits = numString.slice(-4);
    const maskedString = numString.slice(0, -4).replace(/\d/g, "*") + lastFourDigits;
    return maskedString;
}


export {
    isStrEmpty, isValidEmail, isValidPassword, isValidUserName, isValidName, isValidVATNumber, showAlert,
    uuidv4, showAlertWithTwoButtons, showAlertPicker, isValidPhoneNumber,
    showDeletAlertWithTwoButtons, showPermissionAlert,
    isAndroidPermission, formatDate, truncateString, maskNumber
};

