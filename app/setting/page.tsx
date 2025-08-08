import SettingForm from '@/components/Setting/SettingForm';
import { IUser } from '@/types/UserType';

export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/me`);
  const userInfo = (await res.json()) as IUser;

  return (
    <section>
      <SettingForm user={userInfo} />
    </section>
  );
}
