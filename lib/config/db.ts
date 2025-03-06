import mongoose from 'mongoose';

export const ConnectDB = async () =>{
    await mongoose.connect(`mongodb+srv://shivforevershakti:PW33Jqgoh2ZjLqKf@cluster0.li6ys.mongodb.net/blog-app?retryWrites=true&w=majority&appName=Cluster0`);
   console.log('Db connected');
}