'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '../Primitives/Button/Button';
import Input from '../Primitives/Input/Input';
import Label from '../Primitives/Label/Label';
import Modal from '../Primitives/Modal/Modal';

interface INewCategory {
  categoryName: string;
}

export default function NewCategoryModal({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: (state: boolean) => void;
}) {
  const { register, handleSubmit } = useForm<INewCategory>();

  const onSubmit: SubmitHandler<INewCategory> = async (e) => {
    fetch('/api/writer/new-category', {
      method: 'POST',
      body: JSON.stringify(e.categoryName),
    });
    setIsVisible(false);
  };
  return (
    <Modal modalVisibleState={isVisible} setModalVisibleState={setIsVisible}>
      <section className="p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label label="새 카테고리 이름">
            <Input
              placeholder="이름을 입력해 주세요"
              {...register('categoryName')}
            />
          </Label>
          <div className="w-full text-right">
            <Button variant="primary" className="mt-4 px-6">
              확인
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
