import {notification} from 'antd';

export function authNotification(type) {
  let notificationMsg;
  switch (type) {
    case 'credential':
      notificationMsg = {title: 'Wrong credentials', msg: 'Please, check the credential again', type: 'warning'};
      break;
    case 'unauthorized':
      notificationMsg = {title: 'Unauthorized', msg: 'Please try to log in again.', type: 'error'};
      break;
    case 'connect':
      notificationMsg = {title: "Can't connect to server.", msg: 'Please try again later.', type: 'error'};
      break;
    default:
      notificationMsg = {title: 'Application error', msg: 'The error accrued during operations. Sorry!', type: 'error'};
      break;
  }

  notification[notificationMsg.type]({
    message: notificationMsg.title,
    description: notificationMsg.msg,
    duration: 3,
  });
}