import Button from '../Primitives/Button/Button';
import Modal from '../Primitives/Modal/Modal';

export default function ConfirmPostModal({
  isVisible,
  setIsVisible,
  confirmCallback,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
  confirmCallback: () => Promise<void>;
}) {
  return (
    <Modal modalVisibleState={isVisible} setModalVisibleState={setIsVisible}>
      <section className="p-4 space-y-4">
        <div className="w-full">
          <h1 className="font-bold">확인</h1>
        </div>
        <p>이 포스트를 발행하시겠습니까?</p>
        <div className="w-full flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsVisible(false)}
            className="w-full"
          >
            취소
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              confirmCallback();
              setIsVisible(false);
            }}
            className="w-full"
          >
            확인
          </Button>
        </div>
      </section>
    </Modal>
  );
}
