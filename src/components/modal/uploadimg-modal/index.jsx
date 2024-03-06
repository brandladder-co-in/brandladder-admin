import React, { useState } from 'react';
import { useStorage } from '../../../context/StorageContext';

const UploadImgMOdal = () => {

    const [img, setImg] = useState();
    const [imgURL, setImgURL] = useState();

    const { uploadImage } = useStorage();

    const handleUploadImg = async () => {
        try {
            const res = await uploadImage(img, 'blogs')
            console.log(res)
            setImgURL(res)
        } catch (error) {
            console.error('Error while uploafding img: ', error)
        }
    }

    return (
        <>
            <input className="modal-state" id="img-upload-modal" type="checkbox" />
            <div className="modal w-screen">
                <label className="modal-overlay" htmlFor="img-upload-modal"></label>
                <div className="modal-content flex flex-col gap-5">
                    <label htmlFor="img-upload-modal" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>

                    <h2 className="text-xl">Upload Img</h2>
                    <input
                        type="file"
                        className="input-file input input-ghost-secondary"
                        // value={img}
                        onChange={(e) => { setImg(e.target.files[0]) }}
                    />
                    <button className="btn btn-error w-full" onClick={handleUploadImg}>Upload Img</button>
                    {
                        imgURL && (imgURL)
                    }
                </div>
            </div>
        </>
    )
}

export default UploadImgMOdal
