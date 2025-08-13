import Modal from '@/components/Primitives/Modal/Modal';
import { ProfileImgModalStateType } from '../ProfileImgButton';
import Cropper, { Area, Point } from 'react-easy-crop';
import { useState } from 'react';
import Button from '@/components/Primitives/Button/Button';
import { useProfileImgCropperStore } from '@/store/ProfileImgCropStore';
import { cropImage } from './CropImage';

export default function ProfileImgCropperModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: ProfileImgModalStateType;
  setIsVisible: (state: ProfileImgModalStateType) => void;
}) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
  const { currentImg, changeCurrentImg } = useProfileImgCropperStore();

  const modalFunc = (state: boolean) => {
    if (state === true) return setIsVisible('cropper');
    else return setIsVisible('none');
  };

  const onCropComplete = async () => {
    try {
      const newImageUrl = await cropImage({
        imageUrl: currentImg!,
        croppedAreaPixels,
        flip: {
          horizontal: false,
          vertical: false,
        },
        rotation: 0,
      });
      changeCurrentImg(newImageUrl ?? '');
      modalFunc(false);
    } catch (err) {
      if (err instanceof Error) console.error(err.message);
    }
  };

  return (
    <Modal
      modalVisibleState={isVisible === 'cropper' && true}
      setModalVisibleState={(state) => modalFunc(state)}
    >
      <div className="w-lg relative flex flex-col items-center">
        <div className="w-full relative aspect-video">
          <Cropper
            image={currentImg!}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={(_, croppedAreaPixels) =>
              setCroppedAreaPixels(croppedAreaPixels)
            }
            style={{
              containerStyle: {
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              },
            }}
          />
        </div>
        <div className="w-full relative flex gap-2 p-2">
          <Button variant="primary" className="w-full" onClick={onCropComplete}>
            확인
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => modalFunc(false)}
          >
            취소
          </Button>
        </div>
      </div>
    </Modal>
  );
}
