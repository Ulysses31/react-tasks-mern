export const getDateTimeFromTicks = (ticks) => {
  var ticksToMicrotime = ticks / 10000;
  var epochMicrotimeDiff = Math.abs(
    new Date(0, 0, 1).setFullYear(1)
  );
  var tickDate = new Date(
    ticksToMicrotime - epochMicrotimeDiff
  );

  return tickDate;
};

export const fixDate = (dtInput) => {
  const dt = new Date(dtInput);
  return (
    ('0' + dt.getDate()).slice(-2) +
    '/' +
    ('0' + (dt.getMonth() + 1)).slice(-2) +
    '/' +
    dt.getFullYear()
  );
};

export const fixDateTime = (dtInput) => {
  const dt = new Date(dtInput);
  return (
    ('0' + dt.getDate()).slice(-2) +
    '/' +
    ('0' + (dt.getMonth() + 1)).slice(-2) +
    '/' +
    dt.getFullYear() +
    ' ' +
    dt.getHours() +
    ':' +
    dt.getMinutes() +
    ':' +
    dt.getSeconds()
  );
};

export const getPageSize = () => {
  return 10;
};

export const saveValidatedUserInfo = (userInfo) => {
  // save user info into session storage
  console.log(userInfo);
  sessionStorage.setItem(
    'validatedUser',
    JSON.stringify(userInfo)
  );
};

export const resetValidatedUserInfo = () => {
  // reset user info into session storage
  sessionStorage.setItem(
    'validatedUser',
    JSON.stringify({
      department: null,
      email: null,
      id: null,
      position: null,
      role: null,
      title: null
    })
  );
};

export const getValidatedUserInfo = () => {
  // get user info from session storage
  const info = JSON.parse(
    sessionStorage.getItem('validatedUser')
  );
  if (info === null || info.id === 0 || info.id === null) {
    return {
      _id: 0,
      title: '',
      email: '',
      department: '',
      position: '',
      role: ''
    };
  }
  return info;
};
