import mongoose from "mongoose";
import { Link } from "@/utils/Modal/links";
import { NextResponse } from "next/server";

if (!mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Connection to MongoDB failed:", err));
  }

  //Get all links
export async function GET(){
    try{
        const link = await Link.find();
        return NextResponse.json(link);
    }catch(err){
        return NextResponse.json({message: err.message})
    }
}

//Add new sublink
export async function POST(request) {
    const {mainTitle, sublink ,url, title} = await request.json();
  
    try {
      const navLink = await Link.updateOne(
        { title: mainTitle, 'subLinks.title': sublink },
        { $push: { 'subLinks.$.sublink': { url, title } } }
      );
      return NextResponse.json(navLink);
    } catch (err) {
      console.error('Error inserting navigation data:', err);
      return NextResponse.json({ message: 'Error inserting navigation data', details: err.message });
    }
  }


// PUT: Update a sublink's title or url
export async function PUT(request) {
    const { mainTitle, sublink, oldTitle, newTitle, newUrl, newMainTitle, oldImageUrl, newImage } = await request.json();
    console.log(oldImageUrl + "New" + newImage);
  
    try {
        const updateFields = {};
  
        // Update sublink title and URL if provided
        if (newTitle) {
            updateFields['subLinks.$[outer].sublink.$[inner].title'] = newTitle;
        }
        if (newUrl) {
            updateFields['subLinks.$[outer].sublink.$[inner].url'] = newUrl;
        }
  
        // Handle sublink updates
        if (newTitle || newUrl) {
            await Link.updateOne(
                { title: mainTitle, 'subLinks.title': sublink, 'subLinks.sublink.title': oldTitle },
                { $set: updateFields },
                {
                    arrayFilters: [
                        { 'outer.title': sublink },
                        { 'inner.title': oldTitle },
                    ],
                }
            );
        }
  
        // Handle main title update
        if (newMainTitle) {
            await Link.updateOne(
                { title: mainTitle },
                { $set: { title: newMainTitle } }
            );
        }
  
        // Handle single image update
        if (oldImageUrl && newImage) {
            await Link.updateOne(
                { title: mainTitle, 'images.img': oldImageUrl },
                { $set: { 'images.$': newImage } }
            );
        }
  
        return NextResponse.json({ message: 'Update successful' });
    } catch (err) {
        console.error('Error updating navigation data:', err);
        return NextResponse.json({ message: 'Error updating navigation data', details: err.message });
    }
  }

// DELETE: Delete a sublink
export async function DELETE(request) {
    const { mainTitle, sublink, sublinkTitle } = await request.json();
  
    try {
        if (sublink && sublinkTitle) {
            // Delete sublink
            const deletedLink = await Link.updateOne(
                { title: mainTitle, 'subLinks.title': sublink },
                { $pull: { 'subLinks.$.sublink': { title: sublinkTitle } } }
            );
            return NextResponse.json(deletedLink);
        }
  
        return NextResponse.json({ message: 'No valid deletion parameters provided' });
    } catch (err) {
        console.error('Error deleting navigation data:', err);
        return NextResponse.json({ message: 'Error deleting navigation data', details: err.message });
    }
  }