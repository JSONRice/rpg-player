import * as React from 'react';
import Image from 'next/image';

export default function ImageUpload() {
  const [image, setImage] = React.useState({ preview: '', raw: '' });

  function changeImage(e: any) {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  }

  // TODO: Implement this
  async function uploadImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', image.raw);

    await fetch('YOUR_URL', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="rounded-lg shadow-xl bg-gray-50 lg:w-1/2">
        <div className="m-4">
          <label className="inline-block mb-2 text-gray-500">
            Upload Image(jpg,png,svg,jpeg)
          </label>
          <div className="flex items-center justify-center w-full">
            {image.preview ? (
              <Image
                src={image.preview}
                alt="Image preview"
                width="300"
                height="300"
              />
            ) : (
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select a photo
                  </p>
                </div>
                <input
                  onChange={changeImage}
                  type="file"
                  className="opacity-0"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-end p-2">
          <button type="button" onClick={uploadImage} className="btn btn-link">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}
