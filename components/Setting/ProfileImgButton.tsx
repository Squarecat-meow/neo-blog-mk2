import { Camera } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';
import ProfileImgConfirmModal from './Modal/ProfileImgConfirmModal';
import ProfileImgCropperModal from './Modal/ProfileImgCropperModal';

export type ProfileImgModalStateType = 'confirm' | 'cropper' | 'none';

export default function ProfileImgButton({
  imageState,
  setImageState,
}: {
  imageState: string | null;
  setImageState: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profileImgObjectUrl, setProfileImgObjectUrl] = useState<string | null>(
    null,
  );
  const [isModalOpened, setIsModalOpened] =
    useState<ProfileImgModalStateType>('none');

  console.log(isModalOpened);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    setIsModalOpened('confirm');
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImgObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
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
        {imageState || profileImgObjectUrl ? (
          <img
            className="object-cover size-full rounded-full"
            src={profileImgObjectUrl || imageState || ''}
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
        image={profileImgObjectUrl!}
        isVisible={isModalOpened}
        setIsVisible={setIsModalOpened}
      />
    </>
  );
}
