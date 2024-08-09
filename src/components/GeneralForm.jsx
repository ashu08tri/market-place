"use client";
import React, { useState } from "react";
import app from "@/firebase";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { BeatLoader } from "react-spinners";

const GeneralForm = ({ api, initialData, storageUrl, onClose }) => {
  const [image, setImg] = useState("");
  const [imageB, setImgB] = useState("");
  const [imageT, setImgT] = useState("");
  const [address, setAddress] = useState(initialData.address || "");
  const [openOn, setOpenon] = useState(initialData.openOn || "");
  const [zipcode, setZipcode] = useState(initialData.zipcode || "");
  const [title, setTitle] = useState(initialData.title || "");
  const [title2, setTitle2] = useState(initialData.title2 || "");
  const [desc, setDesc] = useState(initialData.desc || "");
  const [url, setUrl] = useState(initialData.url || "");
  const [url2, setUrl2] = useState(initialData.url2 || "");
  const [name, setName] = useState(initialData.name || "");
  const [date, setDate] = useState(initialData.date || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title) {
      setSubmitting(true);
      let downloadUrl = initialData.image; // Use existing image URL by default
      let downloadUrlB = initialData.imageB; 
      let downloadUrlT = initialData.imageT; 

      if (image) {
        const storage = getStorage(app);
        const storageRef = ref(storage, `landingPage/${storageUrl}/${image.name}`);
        await uploadBytes(storageRef, image);
        downloadUrl = await getDownloadURL(storageRef);
      }

      if (imageB && imageT) {
        const storage = getStorage(app);
        const storageRefB = ref(storage, `landingPage/${storageUrl}/${imageB.name}`);
        const storageRefT = ref(storage, `landingPage/${storageUrl}/${imageT.name}`);
        await uploadBytes(storageRefB, imageB);
        await uploadBytes(storageRefT, imageT);
        downloadUrlB = await getDownloadURL(storageRefB);
        downloadUrlT = await getDownloadURL(storageRefT);
      }

      const updatedItem = { image: downloadUrl, title, url, title2, url2, desc, 
        name, date, imageB: downloadUrlB, imageT: downloadUrlT, address, zipcode, openOn };

      try {
        let res = await fetch(api, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedItem)
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
    <div className="absolute top-0 right-1/2 p-5 w-96 bg-black rounded-md text-white z-50">
     <div className="flex justify-end mb-2">
     <button className="text-right text-black p-2 bg-white" onClick={() => onClose()}>X</button>
     </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
       {!initialData.imageB && !initialData.imageT &&
         <div className="flex justify-between">
         <label>Image</label>
         <input type="file" onChange={(e) => setImg(e.target.files[0])} />
       </div>
       }
        <div className="flex justify-between">
          <label>Title</label>
          <input
            className="text-black p-1"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {
          initialData.imageB && initialData.imageT &&
          <>
            <div className="flex justify-between">
              <label>Before IMG</label>
              <input type="file" onChange={(e) => setImgB(e.target.files[0])} />
            </div>
            <div className="flex justify-between">
              <label>After IMG</label>
              <input type="file" onChange={(e) => setImgT(e.target.files[0])} />
            </div>
          </>
        }
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
        {
          initialData.address && initialData.zipcode && initialData.openOn && <><div className="flex justify-between">
            <label>Address</label>
            <input
              className="text-black"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label>ZipCode</label>
            <input
              className="text-black"
              type="Number"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="flex justify-between">
            <label>Open On</label>
            <input
              className="text-black"
              type="text"
              value={openOn}
              onChange={(e) => setOpenon(e.target.value)}
            />
          </div>
          </> 
        }
        {initialData.desc && (
          <div className="flex justify-between">
            <label>Description</label>
            <textarea
              className="text-black w-[70%] h-20 p-1"
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
        {
          initialData.name && initialData.name.length > 0 && <div className="flex justify-between">
            <label>Name</label>
            <input
              className="text-black"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        }
        {
          initialData.date && initialData.date.length > 0 && <div className="flex justify-between">
            <label>Date In('year-month-day')</label>
            <input
              className="text-black"
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
