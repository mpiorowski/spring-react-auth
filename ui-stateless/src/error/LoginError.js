import {notification} from 'antd';

export function loginError(type) {
  let notificationMsg;
  switch (type) {
    case 'credential':
      notificationMsg = {title: 'Wrong credentials', msg: 'Please, check the credential again'};
      break;
    case 'unauthorized':
      notificationMsg = {title: 'Unauthorized', msg: 'Please try to log in again.'};
      break;
    default:
      notificationMsg = {title: 'Application error', msg: 'The error accrued during operations. Sorry!'};
      break;
  }

  openErrorNotification(notificationMsg);
}

const openErrorNotification = (notificationMsg) => {
  notification['error']({
    message: notificationMsg.title,
    description: notificationMsg.msg,
    duration: 3,
  });
};