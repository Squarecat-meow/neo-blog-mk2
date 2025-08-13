import { Camera } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import ProfileImgConfirmModal from './Modal/ProfileImgConfirmModal';
import ProfileImgCropperModal from './Modal/ProfileImgCropperModal';
import { useProfileImgCropperStore } from '@/store/ProfileImgCropStore';

export type ProfileImgModalStateType = 'confirm' | 'cropper' | 'none';

export default function ProfileImgButton() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [isModalOpened, setIsModalOpened] =
    useState<ProfileImgModalStateType>('none');
  const { currentImg, changeCurrentImg } = useProfileImgCropperStore();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    changeCurrentImg(objectUrl);
    setIsModalOpened('confirm');
    // setProfileImgObjectUrl((prev) => {
    //   if (prev) URL.revokeObjectURL(prev);
    //   return objectUrl;
    // });
    // setImageState(objectUrl);
  };

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          fileRef.current?.click();
        }}
        className="w-full rounded-full cursor-pointer aspect-square flex justify-center items-center transition-colors bg-sky-200 hover:bg-sky-300 z-[1]"
      >
        {currentImg ? (
          <img
            className="object-cover size-full rounded-full"
            src={currentImg}
            alt="유저 프로필 사진"
          />
        ) : (
          <Camera size={48} strokeWidth={0.5} />
        )}
      </button>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileChange}
        ref={fileRef}
        hidden
      />
      <ProfileImgConfirmModal
        isVisible={isModalOpened}
        setIsVisible={setIsModalOpened}
      />
      <ProfileImgCropperModal
        isVisible={isModalOpened}
        setIsVisible={setIsModalOpened}
      />
    </>
  );
}
