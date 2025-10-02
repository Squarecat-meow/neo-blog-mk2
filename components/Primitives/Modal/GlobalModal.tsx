'use client';

import { useGlobalModalStore } from '@/store/GlobalModalStore';
import { useShallow } from 'zustand/shallow';
import Modal from './Modal';
import Button from '../Button/Button';

export default function GlobalModal() {
  const { isVisible, setIsVisible, content } = useGlobalModalStore(
    useShallow((state) => ({
      isVisible: state.isVisible,
      setIsVisible: state.setIsVisible,
      content: state.content,
    })),
  );
  return (
    <Modal modalVisibleState={isVisible} setModalVisibleState={setIsVisible}>
      <div className="w-sm p-2 flex flex-col items-center gap-6">
        <h1 className="w-full text-xl">알림</h1>
        <span className="font-light">{content}</span>
        <div className="w-full flex justify-end gap-2">
          <Button
            variant="primary"
            className="px-4 w-fit"
            onClick={() => setIsVisible(false)}
          >
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
}
