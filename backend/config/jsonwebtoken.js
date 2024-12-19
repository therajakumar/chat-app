import jwt from "jsonwebtoken";
const generateTOken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export default generateTOken;
