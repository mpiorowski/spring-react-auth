import {notification} from 'antd';

export function productNotification(type) {
  let notificationMsg;
  switch (type) {
    case 'success':
      notificationMsg = {title: 'Products updated', msg: 'Products added to the database.'};
      break;
    case 'error':
      notificationMsg = {title: 'Wrong form', msg: 'Please check your form again.'};
      break;
    default:
      notificationMsg = {title: 'Application error', msg: 'An error accrued during operations. Sorry!'};
      break;
  }

  console.log(type);

  let notType;
  type != null ? notType = type : notType = 'error';

  notification[notType]({
    message: notificationMsg.title,
    description: notificationMsg.msg,
    duration: 3,
  });
}