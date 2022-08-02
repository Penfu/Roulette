const state = {
  user: localStorage.user
    ? JSON.parse(localStorage.user)
    : {
        id: "",
        name: "",
        email: "",
        created_at: "",
      },
};

export const isAuth = () => state.user !== null;

export const setAuth = (user: {
  id: "";
  name: "";
  email: "";
  created_at: "";
}) => {
  state.user = { ...user };
  localStorage.setItem("user", JSON.stringify(user));
};

export const removeUser = () => (state.user = null);

export default () => ({ ...state });
