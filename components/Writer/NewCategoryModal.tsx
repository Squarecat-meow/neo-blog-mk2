import Button from '../Primitives/Button/Button';
import Input from '../Primitives/Input/Input';
import Label from '../Primitives/Label/Label';
import Modal from '../Primitives/Modal/Modal';

export default function NewCategoryModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) {
  return (
    <Modal modalVisibleState={isVisible} setModalVisibleState={setIsVisible}>
      <section className="p-2">
        <form>
          <Label label="새 카테고리 이름">
            <Input placeholder="이름을 입력해 주세요" />
          </Label>
          <div className="w-full text-right">
            <Button variant="primary" className="mt-2 px-4">
              확인
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
