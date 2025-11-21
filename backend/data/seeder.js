import Category from "../models/CategoryModel";
import Course from "../models/CourseModel";
import User from "../models/userModel";
import fs from "fs";


const importData = async() =>{
    try {
        //clear the database

    await Course.deleteMany();
    await Category.deleteMany();
    await User.deleteMany();

    //insert the data
    const userData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/users/json'),'utf-8'));


    const usersWithHashedPassword = userData.map((user)=>{
        //create passssword hash 
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(user.password,salt);
        return { ...user , password: hashedPassword};
    });

    const createdUsers = await User.insertMany(usersWithHashedPassword);

    const instructorUser = createdUsers.find((user) =>user.role === 'instructor') 

    //insert category data
    const categoryData = JSON.parse(fs.readFileSync(path.join(__dirname,'/data/category.json'), 'utf-8'));
    const createdCategory = await Category.insertMany(usersWithHashedPassword);

    const webdevCategory = createdCategory.find((category) => category.name === 'Web Dev')

    //insert course
    const courses = [{
        title: 'Complete Web dev course 2025',
        description : 'Random text about the course: command not found: asdfsdf',
        price:99,
        instructor : instructorUser.id,
        category: webdevCategory.id
    }]

    await Course.insertMany(courses);

    console.log('Data is successfully added to database!');
    } catch (error) {
        console.log("Error while data to database", error);
    }
}

    // remove data
    const destroyData = ()=>{
        //deleteMany queries will go here!
        console.log("Data destroyed")
    }

    //logic to add script to run seed file for different methods
    if(process.argv[2] === '-d'){  
        destroyData();
    } else {
        importData("import data");
        console.log("import data");
    }