import AccountSettingForm from '@/components/Setting/AccountSettingForm';
import BlogSettingForm from '@/components/Setting/BlogSettingForm';
import { IUser } from '@/types/UserType';
import { Tabs } from '@radix-ui/themes';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(`${process.env.APP_URL}/api/users/me`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  const userInfo = (await res.json()) as {
    authenticated: boolean;
    currentUser: IUser;
  };

  return (
    <section className="w-full flex justify-center">
      <Tabs.Root className="w-full" defaultValue="account">
        <Tabs.List>
          <Tabs.Trigger value="account">계정 설정</Tabs.Trigger>
          <Tabs.Trigger value="blog">블로그 설정</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
          <AccountSettingForm user={userInfo.currentUser} />
        </Tabs.Content>
        <Tabs.Content value="blog">
          <BlogSettingForm />
        </Tabs.Content>
      </Tabs.Root>
    </section>
  );
}
