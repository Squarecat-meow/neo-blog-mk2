'use client';

import { useState } from 'react';
import Button from '../Primitives/Button/Button';
import KeomojiStealConfirmModal from './Modal/KeomojiStealConfirmModal';
import { importKeomojis } from '@/actions/importKeomojis';
import { useGlobalLoadingStore } from '@/store/GlobalLoadingStore';
import { useGlobalModalStore } from '@/store/GlobalModalStore';
import { useShallow } from 'zustand/shallow';

export default function BlogSettingForm() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const setIsLoading = useGlobalLoadingStore((state) => state.setIsVisible);
  const { setIsGlobalModalVisible, setContent } = useGlobalModalStore(
    useShallow((state) => ({
      setIsGlobalModalVisible: state.setIsVisible,
      setContent: state.setContent,
    })),
  );

  const handleClick = async () => {
    try {
      setIsModalVisible(false);
      setIsLoading(true);
      const res = (await importKeomojis()) as { result: { count: number } };
      setIsLoading(false);
      setContent(`${res.result.count}개의 커모지 돚거가 완료되었어요!`);
      setIsGlobalModalVisible(true);
    } catch (err) {
      if (err instanceof Error) {
        setContent('오류가 발생했어요! \n' + err.message);
        setIsGlobalModalVisible(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="py-4 space-y-4 w-1/2">
        <Button
          variant="outline"
          className="px-4 w-fit h-fit"
          onClick={(e) => {
            e.preventDefault();
            setIsModalVisible(true);
          }}
        >
          커모지 돚거해오기
        </Button>
      </section>
      <KeomojiStealConfirmModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        callback={handleClick}
        // callback={importKeomojis}
      />
    </>
  );
}
