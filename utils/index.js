const bcrypt = require("bcrypt");
const ImageKit = require("imagekit");

const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(5);

  return bcrypt.hash(password, salt);
};

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const encryptOrder = async () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let orderTrx = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    orderTrx += characters.charAt(randomIndex);
  }

  return orderTrx;
};

module.exports = {
  encryptOrder,
  encryptPassword,
  imageKit,
};
