"use client";
import { useState } from "react";
import ImageModal from "./ImageModal";
import Image from "next/image";
import { imageUrls } from "@/utility/images";

const Gallery: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const openModal = (index: number) => {
    setSelectedImageIndex(index);
  };
  const closeModal = () => {
    setSelectedImageIndex(null);
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-3 gap-6">
        {imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`Image ${index + 1}`}
            className="object-cover w-full h-full cursor-pointer pb-3"
            height={500}
            width={500}
            onClick={() => openModal(index)}
          />
        ))}
        {selectedImageIndex !== null && (
          <ImageModal
            selectedImageIndex={selectedImageIndex}
            closeModal={closeModal}
          />
        )}
      </div>

      
    </>
  );
};
export default Gallery;
