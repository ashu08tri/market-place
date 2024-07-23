import mongoose from "mongoose";

const ourCollectionSchema = new mongoose.Schema({
    mainTitle : String,
    items: [
        {
            img: String,
            url: String,
            title: String,
        }
    ]
})

export const OurCollection = mongoose.models.OurCollection || mongoose.model('OurCollection', ourCollectionSchema);