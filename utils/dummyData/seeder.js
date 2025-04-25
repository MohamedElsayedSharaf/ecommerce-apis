const fs = require('fs');
require('colors');
const dotenv = require('dotenv');
const ProductModel = require('../../models/ProductModel');
const db = require('../../config/db');

dotenv.config({ path: '../../.env' });

// connect to DB
db();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));

// Insert data into DB
const insertData = async () => {
  try {
    await ProductModel.create(products);
    console.log('Data Inserted'.blue.inverse); 
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}