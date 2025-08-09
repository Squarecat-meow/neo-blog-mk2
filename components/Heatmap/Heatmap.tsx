'use client';

import { useQuery } from '@apollo/client';
import { GET_CONTRIBUTION } from '../Apollo/queries';
import HeatMap from '@uiw/react-heat-map';
import { Tooltip } from '@radix-ui/themes';
import Link from 'next/link';
import { useWindowSize } from '@/hooks/useWindowSize';
import { XLARGE_WIDTH } from '@/constant/windowSize';

interface IContributionCalendar {
  weeks: {
    contributionDays: {
      date: string;
      contributionCount: number;
    }[];
  }[];
}

interface IUserInfo {
  avatarUrl: string;
  login: string;
}

export default function GithubHeatmap({ username }: { username: string }) {
  const { width } = useWindowSize();
  const { loading, error, data } = useQuery(GET_CONTRIBUTION, {
    variables: { username },
  });

  if (loading) return <div>loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const userInfo = data.user as IUserInfo;
  const contribution = data.user.contributionsCollection
    .contributionCalendar as IContributionCalendar;

  const value = Array.from(
    contribution.weeks.map((days) =>
      days.contributionDays.map((date) => {
        return {
          date: date.date,
          count: date.contributionCount,
        };
      }),
    ),
  ).flat();

  if (!width) return;

  return (
    <div>
      <Link
        href={`https://github.com/${userInfo.login}`}
        className="flex items-center gap-2"
      >
        <img
          src={userInfo.avatarUrl}
          alt={`${userInfo.login}의 Github 프로필사진`}
          className="h-12 spect-square rounded-full"
        />
        <div className="flex flex-col">
          <span>{userInfo.login}&apos;s</span>
          <span className="text-sm font-light">Recent Contribution</span>
        </div>
      </Link>
      <HeatMap
        width={width > XLARGE_WIDTH ? 620 : 330}
        value={value}
        startDate={
          width > XLARGE_WIDTH
            ? new Date(value[0].date)
            : new Date(value[(value.length - 1) / 2].date)
        }
        rectSize={9}
        rectProps={{
          rx: 2,
        }}
        rectRender={(props, data) => (
          <Tooltip content={`${data.date} count: ${data.count || 0}`}>
            {data.count !== 0 ? (
              <rect {...props} />
            ) : (
              <rect {...props} fill="#ebedf0" />
            )}
          </Tooltip>
        )}
      />
    </div>
  );
}
