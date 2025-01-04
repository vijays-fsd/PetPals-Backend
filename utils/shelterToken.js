import jwt from "jsonwebtoken";

const generateShelterToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};

export default generateShelterToken;