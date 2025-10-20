'use client';

import { Anniversary } from '@/app/generated/prisma';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ky from 'ky';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

interface IAnniversaryForm {
  id: number;
  name: string;
  description: string | null;
  startDay: string;
  endDay: string;
}

export default function BlogSettingForm() {
  const [selectedAnniversary, setSelectedAnniversary] = useState<number>();
  const containerRef = useRef<HTMLUListElement>(null);
  const { register, reset, handleSubmit } = useForm<IAnniversaryForm>();
  const queryClient = useQueryClient();
  const { data: anniversary, isLoading: isAnniversaryLoading } = useQuery<
    Anniversary[]
  >({
    queryKey: ['anniversary'],
    queryFn: () => ky.get('/api/setting/anniversary').json(),
  });
  const useAddAnniversary = useMutation({
    mutationFn: (e: Omit<IAnniversaryForm, 'id'>) =>
      ky.post('/api/setting/anniversary', {
        json: e,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['anniversary'],
      }),
  });
  const usePatchAnniversary = useMutation({
    mutationFn: (e: IAnniversaryForm) =>
      ky.patch('/api/setting/anniversary', {
        json: e,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['anniversary'],
      }),
  });
  const useDeleteAnniversary = useMutation({
    mutationFn: (e: Partial<IAnniversaryForm>) =>
      ky.delete('/api/setting/anniversary', {
        json: e,
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['anniversary'],
      }),
  });

  const handleAnniversaryClick = async (id: number) => {
    setSelectedAnniversary(id);
    const singleAnniversary = await ky
      .get('/api/setting/anniversary', {
        searchParams: {
          anniversary: id,
        },
      })
      .json<Anniversary>();
    reset({
      name: singleAnniversary.name,
      description: singleAnniversary.description,
      startDay: singleAnniversary.startDay,
      endDay: singleAnniversary.endDay,
    });
  };

  const handleAnniversaryBlur = () => {
    setSelectedAnniversary(undefined);
  };

  const onSubmit = (e: IAnniversaryForm) => {
    if (selectedAnniversary) {
      const payload = {
        id: selectedAnniversary,
        name: e.name,
        description: e.description,
        startDay: e.startDay,
        endDay: e.endDay,
      };
      usePatchAnniversary.mutate(payload);
    } else {
      const payload = {
        name: e.name,
        description: e.description,
        startDay: e.startDay,
        endDay: e.endDay,
      };
      useAddAnniversary.mutate(payload);
    }
    reset({
      name: '',
      description: '',
      startDay: '',
      endDay: '',
    });
  };

  const handleOutsideMouseClick = (e: MouseEvent) => {
    if (e.target === containerRef.current) {
      handleAnniversaryBlur();
      reset({
        name: '',
        description: '',
        startDay: '',
        endDay: '',
      });
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideMouseClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideMouseClick);
    };
  }, []);

  return (
    <section className="w-2xl py-4 space-y-4">
      <h1>타임라인 설정</h1>
      <section className="grid grid-cols-2 gap-4">
        <ul
          className="min-h-24 p-2 flex flex-col border border-gray-300 rounded-2xl"
          ref={containerRef}
        >
          {isAnniversaryLoading && <span>로딩중...</span>}
          {!anniversary || anniversary.length === 0 ? (
            <li className="font-light">기념일이 없어요!</li>
          ) : (
            <>
              {anniversary!.map((day) => (
                <li
                  key={day.id}
                  tabIndex={0}
                  className="rounded-lg p-1 focus:bg-sky-200 cursor-pointer"
                  onFocus={() => handleAnniversaryClick(day.id)}
                >
                  {day.name}
                </li>
              ))}
            </>
          )}
        </ul>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <label className="font-light">
            기념일 이름
            <TextField.Root
              {...register('name', { required: true })}
              placeholder="기념일 이름"
            />
          </label>
          <label className="font-light">
            기념일 설명
            <TextArea
              {...register('description', { required: true })}
              placeholder="기념일 설명"
            />
          </label>
          <label className="font-light">
            날짜
            <div className="flex gap-2">
              <input
                type="date"
                className="w-full p-1 border border-gray-300 rounded-sm"
                {...register('startDay', { required: true })}
              />
              &tilde;
              <input
                type="date"
                className="w-full p-1 border border-gray-300 rounded-sm"
                {...register('endDay', { required: true })}
              />
            </div>
          </label>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              color="red"
              disabled={selectedAnniversary ? false : true}
              onClick={(e) => {
                e.preventDefault();
                useDeleteAnniversary.mutate({ id: selectedAnniversary });
              }}
            >
              삭제
            </Button>
            <Button
              variant="outline"
              disabled={selectedAnniversary ? true : false}
            >
              추가
            </Button>
            <Button disabled={selectedAnniversary ? false : true}>저장</Button>
          </div>
        </form>
      </section>
    </section>
  );
}
