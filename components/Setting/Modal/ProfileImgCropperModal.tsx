import Modal from '@/components/Primitives/Modal/Modal';
import { ProfileImgModalStateType } from '../ProfileImgButton';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useState } from 'react';
import Button from '@/components/Primitives/Button/Button';

export default function ProfileImgCropperModal({
  image,
  isVisible,
  setIsVisible,
}: {
  image: string;
  isVisible: ProfileImgModalStateType;
  setIsVisible: (state: ProfileImgModalStateType) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const modalFunc = (state: boolean) => {
    if (state === true) return setIsVisible('cropper');
    else return setIsVisible('none');
  };
  return (
    <Modal
      modalVisibleState={isVisible === 'cropper' && true}
      setModalVisibleState={(state) => modalFunc(state)}
    >
      <div className="w-lg relative flex flex-col items-center gap-6">
        <div className="w-sm aspect-video p-2">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(croppedArea: Area, croppedAreaPixels: Area) =>
              console.log(croppedArea, croppedAreaPixels)
            }
          />
        </div>
        <div className="flex gap-2">
          <Button variant="primary">확인</Button>
          <Button variant="outline">취소</Button>
        </div>
      </div>
    </Modal>
  );
}
