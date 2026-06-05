import dotenv from 'dotenv';
dotenv.config();
import { PrismaClient } from '@prisma/client';
import { futimesSync } from 'node:fs';
const prisma = new PrismaClient();

//get all Users
const getUsers = async ()=>{
    const users = await prisma.user.findMany();
    console.log(users);
}

//create User
const createUser = async (name, email) => {
    const user = await prisma.user.create({
        data: {name, email},
    });
    console.log("User Created: ", user);
};

//update User
const updateUser = async (id, name)=>{
    const user = await prisma.user.update({
        where: {id},
        data: {name},
    });
    console.log("Updated Successfully. New User : ", user );
}

const deleteUser = async(id)=>{
    const user = await prisma.user.delete({
        where: { id },
    });
    console.log("User deleted: ", user);
}

async function main() {
    // await createUser("Abhi", "abhi@gmail.com");
    // await createUser("tom", "tom@gmail.com");
    // await createUser("hulk", "hulk@gmail.com");
    // await createUser("tony", "tony@gmail.com");

    // await updateUser(2, "Abhijith");
    // await deleteUser(2);
    await getUsers();
}

main().catch(console.error).finally(() => prisma.$disconnect());