import { IUser } from '@/types/UserType';
import { Camera } from 'lucide-react';
import { ChangeEvent, useRef, useState } from 'react';

export default function ProfileImgButton({
  user,
  callback,
}: {
  user: IUser;
  callback: (url: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [profileImgObjectUrl, setProfileImgObjectUrl] = useState<string | null>(
    null,
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setProfileImgObjectUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return objectUrl;
    });
    callback(objectUrl);
  };

  return (
    <>
      <button
        onClick={() => fileRef.current?.click()}
        className="w-full rounded-full relative cursor-pointer border aspect-square flex justify-center items-center transition-colors hover:bg-slate-500/30 z-[1]"
      >
        {user.profileImgUrl || profileImgObjectUrl ? (
          <img
            className="object-cover size-full rounded-full mix-blend-darken"
            src={profileImgObjectUrl || user.profileImgUrl || ''}
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
    </>
  );
}
