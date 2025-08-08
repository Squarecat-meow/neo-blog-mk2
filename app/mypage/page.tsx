import MyPageForm from '@/components/MyPage/MyPageForm';
import { IUser } from '@/types/UserType';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/me`);
  const userInfo = (await res.json()) as IUser;

  return (
    <section>
      <MyPageForm user={userInfo} />
    </section>
  );
}
