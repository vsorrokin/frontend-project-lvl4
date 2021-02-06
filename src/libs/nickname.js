import Cookies from 'js-cookie';
import faker from 'faker';

export default () => {
  const currentNickname = Cookies.get('nickname');
  if (currentNickname) {
    return currentNickname;
  }
  const newNickname = faker.name.findName().replaceAll(' ', '_');
  Cookies.set('nickname', newNickname);
  return newNickname;
};
