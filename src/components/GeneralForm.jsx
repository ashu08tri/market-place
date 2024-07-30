"use client";
import React, { useState } from "react";
import app from "@/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Toaster, toast } from "sonner";
import { BeatLoader } from "react-spinners";

const GeneralForm = ({ api, initialData, storageUrl }) => {
  const [image, setImg] = useState("");
  const [title, setTitle] = useState(initialData.title || "");
  const [title2, setTitle2] = useState(initialData.title2 || "");
  const [desc, setDesc] = useState(initialData.desc || "");
  const [url, setUrl] = useState(initialData.url || "");
  const [url2, setUrl2] = useState(initialData.url2 || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && url) {
      setSubmitting(true);
      let downloadUrl = initialData.image; // Use existing image URL by default

      if (image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `landingPage/${storageUrl}/${image.name}`);
        await uploadBytes(storageRef, image);
        downloadUrl = await getDownloadURL(storageRef);
      }

      const updatedItem = { image: downloadUrl, title, url, title2, url2, desc };

      try {
        let res = await fetch(api, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify( updatedItem )
        });
        res = await res.json();
        if (res.ok) {
          toast.success("Update Successful!");
        } else {
          throw new Error(res.error || "Failed to update!");
        }
      } catch (err) {
        toast.error("Failed to update!");
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
        {
          initialData.title2 && initialData.title2.length > 0 && <div className="flex justify-between">
          <label>Text</label>
          <input
            className="text-black"
            type="text"
            value={title2}
            onChange={(e) => setTitle2(e.target.value)}
          />
        </div>
        }
        {initialData.desc && (
          <div className="flex justify-between">
            <label>Description</label>
            <input
              className="text-black"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        )}
        {
          initialData.url && <div className="flex justify-between">
          <label>URL</label>
          <input
            className="text-black"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div> 
        }
        {
          initialData.url2 && initialData.url2.length > 0 && <div className="flex justify-between">
          <label>URL 2</label>
          <input
            className="text-black"
            type="text"
            value={url2}
            onChange={(e) => setUrl2(e.target.value)}
          />
        </div>
        }
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
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default GeneralForm;
