import {notification} from 'antd';

export function userNotification(type) {
  let notificationMsg;
  switch (type) {
    case 'success':
      notificationMsg = {title: 'User added', msg: 'User have been added to the database.', type: 'success'};
      break;
    case 'delete':
      notificationMsg = {title: 'User successfully deleted', msg: 'User successfully deleted.', type: 'success'};
      break;
    case 'updated':
      notificationMsg = {title: 'User successfully updated', msg: 'User successfully updated.', type: 'success'};
      break;
    case 'form':
      notificationMsg = {title: 'Wrong form', msg: 'Please check your form again.', type: 'warning'};
      break;
    case 'user':
      notificationMsg = {title: 'User already taken', msg: 'Please try another one.', type: 'warning'};
      break;
    case 'connect':
      notificationMsg = {title: "Can't connect to server.", msg: 'Please try again later.', type: 'error'};
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