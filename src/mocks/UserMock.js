export const UserMock = {
  getName: () => {
    return "Test User";
  },
  getEmail: () => {
    return "test@user.sample";
  },
  getImageUrl: () => {
    return process.env.BASE_URL + "logo.png";
  }
};
