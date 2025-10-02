import Button from '@/components/Primitives/Button/Button';
import Modal from '@/components/Primitives/Modal/Modal';

export default function KeomojiStealConfirmModal({
  isVisible,
  setIsVisible,
  callback,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  callback: () => void;
}) {
  return (
    <Modal modalVisibleState={isVisible} setModalVisibleState={setIsVisible}>
      <section className="w-sm p-2 flex flex-col gap-2">
        <h1 className="w-full text-xl">정말요?</h1>
        <span className="font-light">
          세라복.모에에서 커모지를 돚거해올까요?
        </span>
        <div className="w-full flex gap-2">
          <Button variant="primary" className="w-full" onClick={callback}>
            확인
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsVisible(false)}
          >
            취소
          </Button>
        </div>
      </section>
    </Modal>
  );
}
