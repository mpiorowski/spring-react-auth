import {notification} from 'antd';

export function productNotification(type) {
  let notificationMsg;
  switch (type) {
    case 'updated':
      notificationMsg = {title: 'Products updated', msg: 'Products updated to the database.', type: 'success'};
      break;
    case 'deleted':
      notificationMsg = {title: 'Products deleted', msg: 'Products deleted from the database.', type: 'success'};
      break;
    case 'success':
      notificationMsg = {title: 'Products updated', msg: 'Products added to the database.', type: 'success'};
      break;
    case 'warning':
      notificationMsg = {title: 'Wrong form', msg: 'Please check your form again.', type: 'warning'};
      break;
    case 'error':
      notificationMsg = {title: 'Application error', msg: 'An error accrued during operations. Sorry!', type: 'error'};
      break;
    case 'noChanges':
      notificationMsg = {title: 'No changes', msg: 'There is nothing to commit. Please check the form again.', type: 'warning'};
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