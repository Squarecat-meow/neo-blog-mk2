import Button from '@/components/Primitives/Button/Button';
import Input from '@/components/Primitives/Input/Input';
import { Editor } from '@/components/Writer/DynamicEditor';
import { Select } from '@radix-ui/themes';

export default function Page() {
  return (
    <section className="w-full flex justify-center">
      <article className="w-full md:w-3/4 space-y-2">
        <form className="w-full flex gap-2">
          <Select.Root size={'3'}>
            <Select.Trigger placeholder="카테고리" />
            <Select.Content>
              <Select.Group>
                <Select.Label>요즈미나</Select.Label>
                <Select.Item value="일상">일상</Select.Item>
                <Select.Item value="개발">개발</Select.Item>
                <Select.Item value="바이크">바이크</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Input placeholder="제목" className="w-full flex-1" />
          <Button variant="primary" className="px-4">
            글쓰기
          </Button>
        </form>
        <Editor />
      </article>
    </section>
  );
}
