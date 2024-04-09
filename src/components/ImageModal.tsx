import { useRef, useState, useEffect } from "react";
import { imageUrls } from "@/utility/images";
import Image from "next/image";

const ImageModal: React.FC<{
  selectedImageIndex: number;
  closeModal: () => void;
}> = ({ selectedImageIndex, closeModal }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(selectedImageIndex);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string>(
    imageUrls[currentIndex]
  );
  const [sliderIndex, setSliderIndex] = useState<number>(0);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
    setSelectedImageUrl(imageUrls[index]);
  };

  const goToPreviousSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setSliderIndex((prevIndex) =>
      prevIndex === imageUrls.length - 8 ? prevIndex : prevIndex + 1
    );
  };

  const closeModalWithTransition = () => {
    setShowModal(false);
    setTimeout(closeModal, 300);
  };

  const goToPreviousImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const goToNextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? prevIndex : prevIndex + 1
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowModal(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 transition-all duration-300 ease-in-out md:mx-auto ${
          showModal ? "opacity-100 pointer-events-auto" : ""
        }`}
        onClick={closeModalWithTransition}
      >
        <div
          ref={modalRef}
          className={`relative bg-white p-4 rounded shadow-md transition-opacity ${
            showModal ? "opacity-100" : "opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className=" overflow-x-auto">
            <button
              type="button"
              onClick={closeModalWithTransition}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 float-end inline-flex justify-center items-center mb-1"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
            <div className="flex justify-center items-center">
              <button
                onClick={goToPreviousImage}
                className={`absolute top-1/2 left-0 transform -translate-y-1/2 p-2 ms-3 ${
                  currentIndex === 0 ? "pointer-events-none opacity-50" : ""
                }`}
                disabled={currentIndex === 0}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
              </button>
              <div className="flex justify-center items-center mb-4">
                <Image
                   src={imageUrls[currentIndex]}
                   alt={`Image ${currentIndex + 1}`}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="h-96 w-auto"
                />
              </div>
              <button
                onClick={goToNextImage}
                className={`absolute top-1/2 right-0 transform -translate-y-1/2 p-2 me-3 ${
                  currentIndex === imageUrls.length - 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                disabled={currentIndex === imageUrls.length - 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-wrap justify-center items-center py-5">
              <button
                onClick={goToPreviousSlide}
                disabled={sliderIndex === 0}
                className="p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z" />
                </svg>
              </button>
              {imageUrls
                .slice(sliderIndex, sliderIndex + 8)
                .map((url, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer m-2 ${
                      currentIndex === sliderIndex + index
                        ? "border-2 border-gray-500 opacity-85 rounded-lg transform scale-110"
                        : ""
                    }`}
                    onClick={() => goToImage(sliderIndex + index)}
                  >
                    <Image
                      src={url}
                      alt={`Image ${sliderIndex + index + 1}`}
                      width={100}
                      height={100}
                      loading="lazy"
                      className="rounded-lg h-20 w-24"
                    />
                  </div>
                ))}
              <button
                onClick={goToNextSlide}
                disabled={sliderIndex === imageUrls.length - 8}
                className="p-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  viewBox="0 -960 960 960"
                  width="24"
                >
                  <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageModal;
