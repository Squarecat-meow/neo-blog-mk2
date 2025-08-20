'use client';

import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { codeBlock } from '@blocknote/code-block';
import { useEffect, useState } from 'react';
import { Loading } from './Loading';
import { BlockNoteSchema, defaultBlockSpecs } from '@blocknote/core';

export default function Editor({
  onChange,
}: {
  onChange: (markdown: string, plainText: string) => void;
}) {
  const [markdown, setMarkdown] = useState('');

  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      loading: Loading,
    },
  });

  const editor = useCreateBlockNote({
    schema,
    codeBlock,
    pasteHandler: ({ event, editor, defaultPasteHandler }) => {
      if (event.clipboardData?.types.includes('Files')) {
        const currentBlock = editor.insertBlocks(
          [{ type: 'loading' }],
          editor.getTextCursorPosition().block,
        );
        const formData = new FormData();
        formData.append('file', event.clipboardData.files[0]);
        fetch('/api/media', {
          method: 'POST',
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            editor.replaceBlocks(currentBlock, [
              { type: 'image', props: { url: data.url } },
            ]);
          });
      }

      return defaultPasteHandler();
    },
  });

  const convertMarkdown = async () => {
    const markdown = await editor.blocksToMarkdownLossy(editor.document);
    setMarkdown(markdown.replace(/(?<!\\)</g, '\\<'));
  };

  const convertPlainText = (markdown: string) => {
    return (
      markdown
        // 이미지: ![alt](url) - 완전히 제거 (캡션도 제거)
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, '')
        // 링크: [text](url) - 텍스트만 남기기
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        // 볼드: **text** or __text__
        .replace(/(\*\*|__)(.*?)\1/g, '$2')
        // 이탤릭: *text* or _text_
        .replace(/(\*|_)(.*?)\1/g, '$2')
        // 코드: `code`
        .replace(/`([^`]*)`/g, '$1')
        // 헤더: # ## ### 등
        .replace(/^#{1,6}\s+/gm, '')
        // 인용: > text
        .replace(/^>\s+/gm, '')
        // 리스트: - * +
        .replace(/^[\s]*[-\*\+]\s+/gm, '')
        // 숫자 리스트: 1. 2. 등
        .replace(/^[\s]*\d+\.\s+/gm, '')
        // 구분선: --- *** ___
        .replace(/^[\s]*[-\*_]{3,}[\s]*$/gm, '')
        // 여러 공백을 하나로
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 140)
        .concat('', '...')
    );
  };

  useEffect(() => {
    convertMarkdown();
    const plainText = convertPlainText(markdown);
    onChange(markdown, plainText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  return <BlockNoteView editor={editor} onChange={convertMarkdown} />;
}
