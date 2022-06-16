export const fetchUser = async () => {
  const userInfo =
    (await localStorage.getItem("user")) !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  return userInfo;
};
