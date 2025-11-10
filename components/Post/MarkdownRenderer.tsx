import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css';
import OpenGraphCard from './OpenGraphCard';
import { Text } from '@radix-ui/themes';

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
          ol: ({ children }) => <ol className="list-decimal">{children}</ol>,
          ul: ({ children }) => <ul className="list-disc">{children}</ul>,
          a: ({ children, href }) => (
            <OpenGraphCard href={href}>{children}</OpenGraphCard>
          ),
          img: ({ alt, src }) => (
            <>
              <img src={src} alt={alt} style={{ marginBottom: 0 }} />
              <span className="text-xs md:text-sm text-gray-500">{alt}</span>
            </>
          ),
          p: ({ children }) => (
            <Text as="p" mt="2" className="text-sm md:text-md lg:text-lg">
              {children}
            </Text>
          ),
        }}
      >
        {children}
      </Markdown>
    </div>
  );
}
