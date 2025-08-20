import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css';

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
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 decoration-sky-700 no-underline hover:underline"
            >
              {children}
            </a>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
