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
      <section className="p-4">
        <div className="w-full">
          <h1>확인</h1>
        </div>
        <p>이 포스트를 발행하시겠습니까?</p>
        <div className="w-full">
          <Button variant="outline" onClick={() => setIsVisible(false)}>
            취소
          </Button>
          <Button variant="primary" onClick={confirmCallback}>
            확인
          </Button>
        </div>
      </section>
    </Modal>
  );
}
