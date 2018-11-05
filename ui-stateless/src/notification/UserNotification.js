import {notification} from 'antd';

export function userNotification(type) {
  let notificationMsg;
  switch (type) {
    case 'success':
      notificationMsg = {title: 'User added', msg: 'User have been added to the database.', type: 'success'};
      break;
    case 'form':
      notificationMsg = {title: 'Wrong form', msg: 'Please check your form again.', type: 'warning'};
      break;
    case 'wrong':
      notificationMsg = {title: 'Username already taken', msg: 'Please try another one.', type: 'error'};
      break;
    default:
      notificationMsg = {title: 'Application error', msg: 'An error accrued during operations. Sorry!', type: 'error'};
      break;
  }

  notification[notificationMsg.type]({
    message: notificationMsg.title,
    description: notificationMsg.msg,
    duration: 3,
  });
}