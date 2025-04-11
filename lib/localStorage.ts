const USER_DISPLAY_NAME = 'user_display_name';

export const setUserDisplayName = (name: string) => {
  localStorage.setItem(USER_DISPLAY_NAME, name);
};

export const getUserDisplayName = () => {
  return localStorage.getItem(USER_DISPLAY_NAME);
};
