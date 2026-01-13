// import Category from "../models/CategoryModel.js";
// import Course from "../models/CourseModel.js";
// import User from "../models/UserModel.js";
// import fs from "fs";

// const importData = async() =>{
//     try {
//         //clear the database

//     await Course.deleteMany();
//     await Category.deleteMany();
//     await User.deleteMany();

//     //insert the data
//     const userData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/users/json'),'utf-8'));

//     const usersWithHashedPassword = userData.map((user)=>{
//         //create passssword hash
//         const salt = bcrypt.genSaltSync(10);
//         const hashedPassword = bcrypt.hashSync(user.password,salt);
//         return { ...user , password: hashedPassword};
//     });

//     const createdUsers = await User.insertMany(usersWithHashedPassword);

//     const instructorUser = createdUsers.find((user) =>user.role === 'instructor')

//     //insert category data
//     const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/category.json'), 'utf-8'));
//     const createdCategory = await Category.insertMany(usersWithHashedPassword);

//     const webdevCategory = createdCategory.find((category) => category.name === 'Web Dev')

//     //insert course
//     const courses = [{
//         title: 'Complete Web dev course 2025',
//         description : 'Random text about the course: command not found: asdfsdf',
//         price:99,
//         instructor : instructorUser.id,
//         category: webdevCategory.id
//     }]

//     await Course.insertMany(courses);

//     console.log('Data is successfully added to database!');
//     } catch (error) {
//         console.log("Error while data to database", error);
//     }
// }

//     // remove data
//     const destroyData = ()=>{
//         //deleteMany queries will go here!
//         console.log("Data destroyed")
//     }

//     //logic to add script to run seed file for different methods
//     if(process.argv[2] === '-d'){
//         destroyData();
//     } else {
//         importData("import data");
//         console.log("import data");
//     }

// updated version

import mongoose from "mongoose";
import Category from "../models/CategoryModel.js";
import Course from "../models/CourseModel.js";
import User from "../models/UserModel.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import connectdb from "../config/db.js";
import dotenv from "dotenv";

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB before any operation
// await mongoose.connect('mongodb://127.0.0.1:27017/test', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
dotenv.config();
connectdb();

// const importData = async () => {
//   try {
//     // Clear collections
//     await Course.deleteMany();
//     await Category.deleteMany();
//     await User.deleteMany();

//     // Read user data
//     const userData = JSON.parse(fs.readFileSync(path.join(__dirname, 'users.json'), 'utf-8'));

//     // Hash passwords
//     const usersWithHashedPassword = userData.map((user) => {
//       const salt = bcrypt.genSaltSync(10);
//       const hashedPassword = bcrypt.hashSync(user.password, salt);
//       return { ...user, password: hashedPassword };
//     });

//     const createdUsers = await User.insertMany(usersWithHashedPassword);
//     const instructorUser = createdUsers.find(user => user.role === 'instructor');

//     // Read category data
//     const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname, 'category.json'), 'utf-8'));
//     const createdCategory = await Category.insertMany(categoryData);
//     const webdevCategory = createdCategory.find(category => category.name === 'Web Dev');

//     // Insert courses
//     const courses = [{
//       title: 'Complete Web dev course 2025',
//       description: 'Random text about the course: command not found: asdfsdf',
//       price: 99,
//       instructor: instructorUser._id,
//       category: webdevCategory._id,
//     }];

//     await Course.insertMany(courses);

//     console.log('Data is successfully added to database!');
//     process.exit();
//   } catch (error) {
//     console.log('Error while importing data:', error);
//     process.exit(1);
//   }
// };

const importData = async () => {
  try {
    // Clear collections
    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    // Read user data
    const userData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "users.json"), "utf-8")
    );

    // Hash passwords
    const usersWithHashedPassword = userData.map((user) => {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(user.password, salt);
      return { ...user, password: hashedPassword };
    });

    const createdUsers = await User.insertMany(usersWithHashedPassword);

    // Pick an instructor
    const instructorUser = createdUsers.find(
      (user) => user.role === "instructor"
    );

    // Read categories
    const categoryData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "category.json"), "utf-8")
    );
    const createdCategories = await Category.insertMany(categoryData);

    // Helper to get category ID
    const getCategory = (name) =>
      createdCategories.find((cat) => cat.name === name)._id;

    // Insert multiple courses
    const courses = [
      {
        title: "Complete Web Dev Course 2025",
        description: "Learn full-stack development from scratch.",
        price: 99,
        instructor: instructorUser._id,
        category: getCategory("Web Dev"),
        thumbnail:
          "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
        rating: 4.7,
        totalReviews: 1240,
      },
      {
        title: "DSA Masterclass",
        description: "Data Structures & Algorithms with coding problems.",
        price: 79,
        instructor: instructorUser._id,
        category: getCategory("DSA"),
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        rating: 4.8,
        totalReviews: 980,
      },
      {
        title: "AI Fundamentals",
        description: "Basics of Artificial Intelligence, ML concepts.",
        price: 129,
        instructor: instructorUser._id,
        category: getCategory("AI"),
        thumbnail:
          "https://images.unsplash.com/photo-1677442136019-21780ecad995",
        rating: 4.5,
        totalReviews: 760,
      },
      {
        title: "UI/UX Design Bootcamp",
        description: "Learn modern design principles and Figma.",
        price: 59,
        instructor: instructorUser._id,
        category: getCategory("Design"),
        thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d",
        rating: 4.6,
        totalReviews: 540,
      },
      {
        title: "Data Analytics Pro",
        description: "Learn Excel, SQL, Power BI & real-world dashboards.",
        price: 89,
        instructor: instructorUser._id,
        category: getCategory("Data Analytics"),
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        rating: 4.4,
        totalReviews: 620,
      },
      {
        title: "Advanced Machine Learning",
        description: "Hands-on ML models, pipelines, deployment.",
        price: 149,
        instructor: instructorUser._id,
        category: getCategory("AI"),
        thumbnail:
          "https://images.unsplash.com/photo-1620712943543-bcc4688e7485",
        rating: 4.9,
        totalReviews: 410,
      },
    ];

    await Course.insertMany(courses);

    console.log("Data is successfully added to database!");
    process.exit();
  } catch (error) {
    console.log("Error while importing data:", error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();
    console.log("Data destroyed successfully!");
    process.exit();
  } catch (error) {
    console.log("Error while destroying data:", error);
    process.exit(1);
  }
};

// Run seed or destroy based on CLI arguments
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
