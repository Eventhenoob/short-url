import jwt from "jsonwebtoken";
const secret = "hello2!23kwr";
export const setAuth = (user: { _id: string; name: string; email: string }) => {
  return jwt.sign(user, secret);
};

export const getAuth = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};
