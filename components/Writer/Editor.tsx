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
  onChange: (body: string) => void;
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
    setMarkdown(markdown);
  };

  useEffect(() => {
    convertMarkdown();
    onChange(markdown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  return <BlockNoteView editor={editor} onChange={convertMarkdown} />;
}
