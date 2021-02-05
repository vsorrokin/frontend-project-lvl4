import axios from 'axios';
import routes from '../routes';

const mapping = {
  createMessage: {
    method: 'post',
    route: 'channelMessagesPath',
    routeArgProp: 'channelId',
  },
};

export default {
  request(action, data) {
    const { method, route, routeArgProp } = mapping[action];
    const routeArgValue = data[routeArgProp];
    const URL = routes[route](routeArgValue);

    return axios[method](URL, {
      data: {
        attributes: data,
      },
    });
  },
};
