import { IUser } from '@/types/UserType';
import Image from 'next/image';

export default function AuthorIntroduction({ user }: { user: IUser }) {
  return (
    <footer className="w-full flex gap-4">
      {user.profileImgUrl ? (
        <Image
          src={user.profileImgUrl}
          alt={`${user.nickname}의 프로필 사진`}
          width={96}
          height={96}
          className="rounded-full"
        />
      ) : (
        <div className="h-24 aspect-square rounded-full bg-slate-200" />
      )}
      <div>
        <span className="text-2xl">{user.nickname}</span>
        <p className="text-lg font-light">{user.introduction}</p>
      </div>
    </footer>
  );
}
