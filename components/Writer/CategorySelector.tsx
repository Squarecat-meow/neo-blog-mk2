import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import { Loader2Icon } from 'lucide-react';
import { Category } from '@prisma/client';
import { useState } from 'react';
import NewCategoryModal from '@/components/Writer/NewCategoryModal';

interface ICategoryResponse {
  categories: {
    userId: string;
    nickname: string;
    ownedCategories: Category[];
  }[];
}

export default function CategorySelector({
  setValue,
}: {
  setValue: (categoryId: number) => void;
}) {
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  const { data, isPending } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch('/api/writer/category');
      const data = (await res.json()) as ICategoryResponse;

      return data.categories;
    },
    staleTime: 5 * 60 * 1000,
  });

  const onCategoryChange = (e: string) => {
    if (e === '새 카테고리') {
      setIsNewCategoryModalVisible(true);
    } else {
      setValue(parseInt(e));
    }
  };

  return (
    <>
      {isPending ? (
        <Loader2Icon className="animate-spin" />
      ) : (
        <Select.Root size={'3'} onValueChange={onCategoryChange}>
          <Select.Trigger placeholder="카테고리" />
          <Select.Content>
            <Select.Group>
              {data?.map((user) => (
                <Select.Group key={user.userId}>
                  <Select.Label>{user.nickname}</Select.Label>
                  {user.ownedCategories.map((categories) => (
                    <Select.Item
                      key={categories.id}
                      value={categories.id.toString()}
                    >
                      {categories.name}
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Item
                value="새 카테고리"
                onSelect={() => setIsNewCategoryModalVisible(true)}
              >
                새 카테고리
              </Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      )}
      <NewCategoryModal
        isVisible={isNewCategoryModalVisible}
        setIsVisible={setIsNewCategoryModalVisible}
      />
    </>
  );
}
