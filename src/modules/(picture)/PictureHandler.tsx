import React, { useEffect, useState } from 'react';
import { encodeImageFileAsURL } from '../../utils/EncodedBase62';
import editPhotoIcon from '../../assets/add-photo.svg'
import Modal from '../../components/Modal'
import { PortfolioPicture, ProyectPicture } from './PictureInterface';
import { ClientPictutersRoutes } from './PictureConst'
import { getRequest, postRequest, putRequest } from '../../services/RequestService';

interface PictureHandlerProps {
  id: string;
  isViewer: boolean;
  isPublic: boolean;
  type: number;
}

const Base64ImageHandler: React.FC<PictureHandlerProps> = ({ id, isViewer, isPublic, type }) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [picture, setPicture] = useState<PortfolioPicture | ProyectPicture | null>(null);

  useEffect(() => {
   
      const loadPicture = async () => {

        if (type === 1) {

          const pictureFind = await getRequest(ClientPictutersRoutes.PUBLIC_PORTFOLIO, id);
            setPicture(pictureFind)
            setBase64Image(pictureFind.picture_data)
         
        } else if (type === 2) {

          const picture = await getRequest(ClientPictutersRoutes.PUBLIC_PORTFOLIO_PROYECT, id);
         
            setPicture(picture)
            setBase64Image(picture.picture_data)
         
        }
      };
      loadPicture();
    
  }, [id, type, isPublic, setBase64Image]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);

  };
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const base64 = await encodeImageFileAsURL(file);
      setBase64Image(base64);
    }
    openModal()
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleSavePicture = async () => {

    if (type === 1) {
      const pullRequest = {
        portfolio: id,
        picture_data: base64Image ? base64Image : "",
        picture_state: "6b17756c-c1da-4636-821e-4b98ed59c02f"
      };

      if (picture) {
        await putRequest(ClientPictutersRoutes.PRIVATE_PORTFOLIOS,picture.id,pullRequest)
        picture.picture_data = pullRequest.picture_data
        setPicture(picture)

      } else {
        await postRequest(ClientPictutersRoutes.PRIVATE_PORTFOLIOS,pullRequest)
        setPicture(picture)
        location.reload()
      }
    } else if (type === 2) {
      const pullRequest = {
        proyect: id,
        picture_data: base64Image ? base64Image : "",
        picture_state: "6b17756c-c1da-4636-821e-4b98ed59c02f"
      };

      if (picture) {

        await putRequest(ClientPictutersRoutes.PRIVATE_PORTFOLIO_PROYECTS,picture.id,pullRequest)
        picture.picture_data = pullRequest.picture_data
        setPicture(picture)

      } else {
        await postRequest(ClientPictutersRoutes.PRIVATE_PORTFOLIO_PROYECTS,pullRequest)
        setPicture(picture)
        location.reload()
      }
    }
    closeModal()
  }

  return (
    <div className="flex flex-col gap-6">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />

      {type === 2 ? (
        <picture>
          <img
            className={`${!isViewer ? ("h-[200px] w-[440px]") : ("h-[400px] w-full")} border-transparent self-center`}
            src={picture ? picture.picture_data : editPhotoIcon}
            alt="Encoded"
          />
        </picture>
      ) : (
        <div className="self-center flex justify-center items-center w-24 h-24 md:w-44 md:h-44 rounded-[100%] shadow-2xl bg-gray-200 hover:cursor-pointer hover:scale-110 duration-300  bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500">
          <picture>
            <img className={picture ? "min-w-[90px] h-[90px] md:min-w-[170px] md:h-[170px] object-cover rounded-[100%]" : "w-14 h-14"} src={picture ? picture.picture_data : editPhotoIcon} alt="Encoded" />
          </picture>
        </div>
      )}

      {isViewer && (
        <button
          onClick={handleButtonClick}
          className="py-2 px-4 mt-4 self-center bg-blue-500 text-white rounded hover:bg-blue-700 mb-4"
        >
          Cambiar foto
        </button>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className='flex flex-col items-center gap-10'>
          <div className="self-center flex justify-center items-center w-24 h-24 md:w-56 md:h-56 rounded-[100%] shadow-2xl bg-gray-200 hover:cursor-pointer hover:scale-110 duration-300 ">
            <picture>
              <img className={base64Image ? "w-full h-full rounded-[100%] border-2 border-zinc-200" : "w-14 h-14"} src={base64Image ? base64Image : editPhotoIcon} alt="Encoded" />
            </picture>
          </div>
          <button onClick={handleSavePicture} className='tracking-wide py-2 px-4 mt-3 bg-zinc-700  text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-zinc-600 focus:ring-zinc-500 focus:ring-offset-blue-200 rounded-lg flex gap-2  '>Guardar foto</button>
        </div>
      </Modal>
    </div>
  );
};

export default Base64ImageHandler;
