import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css';
import OpenGraphCard from './OpenGraphCard';

export default function MarkdownRenderer({ children }: { children: string }) {
  return (
    <div className="prose-lg">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrism]}
        components={{
          h1: ({ children }) => <h1 className="font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="font-bold">{children}</h2>,
          h3: ({ children }) => <h3 className="font-bold">{children}</h3>,
          a: ({ children, href }) => (
            <OpenGraphCard href={href}>{children}</OpenGraphCard>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
