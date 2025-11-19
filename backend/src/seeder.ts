import connectDB = require("./config/db");
import Product = require("./models/Product");

connectDB();

const products = [
  {
    name: "Đồng hồ Rolex Submariner",
    description: "Đồng hồ thể thao sang trọng, chịu nước đến 300m.",
    price: 250000000,
    brand: "Rolex",
    image: "https://res.cloudinary.com/demo/image/upload/v1700000001/rolex_submariner.jpg",
    stock: 5,
  },
  {
    name: "Đồng hồ Casio G-Shock",
    description: "Đồng hồ bền bỉ, thể thao.",
    price: 3000000,
    brand: "Casio",
    image: "https://res.cloudinary.com/demo/image/upload/v1700000001/casio_gshock.jpg",
    stock: 10,
  },
];

const importData = async () => {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(products);
    console.log("✅ Products imported!");
  } else {
    console.log("Products already exist.");
  }
  process.exit();
};

importData();
