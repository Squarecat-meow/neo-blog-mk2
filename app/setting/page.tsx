import SettingForm from '@/components/Setting/SettingForm';
import { IUser } from '@/types/UserType';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const userInfo = (await res.json()) as {
    authenticated: boolean;
    currentUser: IUser;
  };

  return (
    <section className="flex justify-center">
      <SettingForm user={userInfo.currentUser} />
    </section>
  );
}
