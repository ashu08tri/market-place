import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const NavFormModal = ({ isOpen, onClose, mode, mainTitle, sublinkTitle, oldTitle, onSuccess, imageEdit, oldImage }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [newMainTitle, setNewMainTitle] = useState(mainTitle);
  const [newImage, setNewImage] = useState({ img: '', alt: '', text: '', url: '' });

  useEffect(() => {
    if (mode === 'edit') {
      setTitle(oldTitle);
    } else {
      setTitle('');
      setUrl('');
    }
  }, [mode, oldTitle, imageEdit, oldImage]);

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
          body: JSON.stringify({ mainTitle: newMainTitle, sublink: sublinkTitle, oldTitle, newTitle: title, newUrl: url.trim().toLowerCase().replace(/\s+/g, '_')}),
        });
      } else if (mode === 'delete') {
        response = await fetch('/api/navlink', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainTitle: newMainTitle, sublink: sublinkTitle, sublinkTitle: oldTitle, imageUrl: oldImage.img }),
        });
      } else if (imageEdit) {
        response = await fetch('/api/navlink', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainTitle, oldImageUrl: oldImage.img, newImage }),
        });
      }

      if (response.ok) {
        onSuccess();
        toast.success('Operation Successful!');
        onClose();
      } else {
        console.error('Failed to perform action');
        toast.error('Operation Failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    }
  };

  const handleNewImageChange = (field, value) => {
    setNewImage({ ...newImage, [field]: value });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 text-black">
      <Toaster closeButton position="bottom-right" />
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-xl text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-black">
          {mode === 'add' ? 'Add Sublink' : mode === 'edit' ? 'Edit Sublink' : mode === 'imageEdit' ? 'Edit Image': 'Delete Sublink'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'add' || mode === 'edit' ? (
            <>
              <div>
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
                <label className="block text-sm font-medium text-gray-700">Redirect URL:</label>
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </>
          ) : null}

          {mode === 'imageEdit' && (
            <div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Image URL:</label>
                <input
                  type="text"
                  value={newImage.img}
                  onChange={(e) => handleNewImageChange('img', e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Redirect URL:</label>
                <input
                  type="text"
                  value={newImage.url}
                  onChange={(e) => handleNewImageChange('url', e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Alt Text:</label>
                <input
                  type="text"
                  value={newImage.alt}
                  onChange={(e) => handleNewImageChange('alt', e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">New Title:</label>
                <input
                  type="text"
                  value={newImage.text}
                  onChange={(e) => handleNewImageChange('text', e.target.value)}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-black focus:border-black"
                />
              </div>
            </div>
          )}

          {mode === 'delete' && (
            <p>Are you sure you want to delete this?</p>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md"
          >
            {mode === 'add' ? 'Add' : mode === 'edit' ? 'Update' : mode === 'imageEdit' ? 'Edit Image' : 'Delete'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavFormModal;
