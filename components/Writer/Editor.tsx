'use client';

import '@blocknote/core/fonts/inter.css';
import { useCreateBlockNote } from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import '@blocknote/mantine/style.css';
import { codeBlock } from '@blocknote/code-block';
import { useEffect, useState } from 'react';

export default function Editor({
  onChange,
}: {
  onChange: (body: string) => void;
}) {
  const [markdown, setMarkdown] = useState('');
  const editor = useCreateBlockNote({
    codeBlock,
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
