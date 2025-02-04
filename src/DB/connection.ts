const mongoose = require('mongoose');

const connectToDB = async (url: string) => {
    mongoose.connect(url)
        .then(() => "connected to database")
        .then((err: any) => console.log(err));
}

export default connectToDB;