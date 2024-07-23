import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const NavFormModal = ({ isOpen, onClose, mode, mainTitle, sublinkTitle, oldTitle, onSuccess }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [newMainTitle, setNewMainTitle] = useState(mainTitle);
  const [images, setImages] = useState([{ img: '', alt: '', text: '' }]);

  useEffect(() => {
    if (mode === 'edit') {
      setTitle(oldTitle);
    } else {
      setTitle('');
      setUrl('');
    }
  }, [mode, oldTitle]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (mode === 'add') {
        response = await fetch('/api/navlink', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainTitle: newMainTitle, sublink: sublinkTitle, title, url }),
        });
      } else if (mode === 'edit') {
        response = await fetch('/api/navlink', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainTitle: newMainTitle, sublink: sublinkTitle, oldTitle, newTitle: title, newUrl: url, images }),
        });
      } else if (mode === 'delete') {
        response = await fetch('/api/navlink', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainTitle: newMainTitle, sublink: sublinkTitle, sublinkTitle: oldTitle }),
        });
      }

      if (response.ok) {
        onSuccess();
        toast.success('Operation Successfull!')
        onClose();
      } else {
        console.error('Failed to perform action');
        toast.error('Operation Failed!')
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!')
    }
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, { img: '', alt: '', text: '' }]);
  };

  const removeImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 text-black">
      <Toaster closeButton position='bottom-right' />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-black">
          {mode === 'add' ? 'Add Sublink' : mode === 'edit' ? 'Edit Sublink' : 'Delete Sublink'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'add' || mode === 'edit' ? <><div>
            <label className="block text-sm font-medium text-gray-700">Main Title:</label>
            <input
              type="text"
              value={newMainTitle}
              onChange={(e) => setNewMainTitle(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
            />
          </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">URL:</label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>

          </> : <></>}


          {mode === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Images:</label>
              {images.map((image, index) => (
                <div key={index} className="space-y-2">
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={image.img}
                    onChange={(e) => handleImageChange(index, 'img', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Alt Text"
                    value={image.alt}
                    onChange={(e) => handleImageChange(index, 'alt', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  />
                  <input
                    type="text"
                    placeholder="Text"
                    value={image.text}
                    onChange={(e) => handleImageChange(index, 'text', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                  />
                  {index > 0 && (
                    <button type="button" onClick={() => removeImageField(index)} className="text-red-500">
                      Remove Image
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addImageField} className="text-blue-500">
                Add Image
              </button>
            </div>
          )}
          {mode === 'delete' && (
            <p>Are you sure you want to delete the sublink titled "{oldTitle}"?</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md"
          >
            {mode === 'add' ? 'Add' : mode === 'edit' ? 'Update' : 'Delete'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavFormModal;
