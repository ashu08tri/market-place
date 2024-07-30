"use client";
import React, { useState } from "react";
import app from "@/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

const AddForm = ({ api, storageUrl }) => {
  const [image, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

      setSubmitting(true);
      if (image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `landingPage/${storageUrl}/${image.name}`);
        await uploadBytes(storageRef, image);
        let downloadUrl = await getDownloadURL(storageRef);

      const updatedItem = { image: downloadUrl, title, desc };

      try {
        let res = await fetch(api, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify( updatedItem )
        });
        res = await res.json();
        if (res.ok) {
          toast.success("Blog Added!");
        } else {
          throw new Error(res.error || "Failed to Add!");
        }
      } catch (err) {
        toast.error("Failed to Add!");
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  return (
    <div className="absolute top-40 left-10 p-5 w-96 bg-black rounded-md text-white z-50">
      <Toaster closeButton />
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex justify-between">
          <label>Image</label>
          <input type="file" onChange={(e) => setImg(e.target.files[0])} />
        </div>
        <div className="flex justify-between">
          <label>Title</label>
          <input
            className="text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
          <div className="flex justify-between">
            <label>Description</label>
            <input
              className="text-black"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        <button
          className="bg-white text-black py-1 px-3 mt-2"
          type="submit"
          disabled={submitting}
        >
          {submitting ? (
            <BeatLoader
              loading={submitting}
              size={10}
              color="black"
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Add Blog"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddForm;
