import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, check, request } from 'react-native-permissions';

class NotificationManager {
  constructor() {
    this.initNotification();
  }

  initNotification = () => {
    this.checkPermission();
  };

  //Check whether Push Notifications are enabled or not
  checkPermission = async () => {
    if (Platform.OS == "android") {
      if (Platform.Version >= 33) {
        const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
        console.log("Check android permission is enabled or not", status)
        if (status !== RESULTS.GRANTED) {
          this.requestUserPermission();
        }
        else {
          this.getToken();
        }
      }
      else {
        this.getToken();
      }
    } else {
      messaging()
        .hasPermission()
        .then(async authStatus => {
          console.log('hasPermission authStatus1:>>>', authStatus);
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
          console.log('hasPermission status2:>>>', enabled);
          if (enabled) {
            this.getToken();
          } else {
            this.requestUserPermission();
          }
        });
    }
  };

  requestUserPermission = async () => {
    const status = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS)
    console.log("==notification status", status)
    const authStatus = await messaging().requestPermission({
      alert: true,
      badge: false,
      sound: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    console.log('enabled', enabled);
    if (enabled) {
      console.log('Authorization status:>>>', authStatus);
      this.getToken();
    }
  };

  getInitialNotification = callBack => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage != null) {
          console.log(
            'get Initial Notification in the notification manager',
            remoteMessage.notification,
          );
          callBack(remoteMessage);
        }
      });
  };

  onNotificationTapped = callBack => {
    console.log("hello notification tap")
    this.unsubscribeTapNotifListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        console.log('Tapped Notification@@@', remoteMessage);
        callBack(remoteMessage);
      },
    );
  };

  // receive notification in foreground state
  getNotificationInForeground = callBack => {
    this.unsubscribeforegroundMsgListener = messaging().onMessage(
      async notif => {
        console.log('hello forground test 11111', JSON.stringify(notif));
        callBack(notif);
      },
    );
  };

  //receive data in background state
  getNotificationInBackground = callBack => {
    this.foregroundMessages = messaging().setBackgroundMessageHandler(
      async remoteMessage => {
        console.log("get notification in background", JSON.stringify(remoteMessage))
        callBack(remoteMessage);
      },
    );
  };

  //Get Device Registration Token
  getToken = () => {
    messaging()
      .getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          console.log('fcmToken:>> notification manager', fcmToken);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  onTokenRefresh = () => {
    this.unsubscribeTokenRefreshListener = messaging().onTokenRefresh(
      async token => {
        console.log('refresh Token:>>>>', token);
      },
    );
  };
}

export default new NotificationManager();
