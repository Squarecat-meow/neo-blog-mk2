import Modal from '@/components/Primitives/Modal/Modal';
import { ProfileImgModalStateType } from '../ProfileImgButton';
import Button from '@/components/Primitives/Button/Button';

export default function ProfileImgConfirmModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: ProfileImgModalStateType;
  setIsVisible: (state: ProfileImgModalStateType) => void;
}) {
  const modalFunc = (state: boolean) => {
    if (state === true) return setIsVisible('confirm');
    else return setIsVisible('none');
  };
  return (
    <Modal
      modalVisibleState={isVisible === 'confirm' && true}
      setModalVisibleState={(state) => modalFunc(state)}
    >
      <div className="w-sm p-2 flex flex-col items-center gap-6">
        <h1 className="w-full text-xl">알림</h1>
        <span className="font-light">이미지를 자르시겠습니까?</span>
        <div className="w-full flex gap-2">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => setIsVisible('cropper')}
          >
            자르기
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsVisible('none')}
          >
            그냥 쓰기
          </Button>
        </div>
      </div>
    </Modal>
  );
}
