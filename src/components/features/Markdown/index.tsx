'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { useTheme } from 'next-themes';

const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-foreground mt-8 mb-4 text-4xl leading-tight font-extrabold">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-foreground mt-8 mb-3 text-3xl leading-snug font-bold">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-foreground mt-6 mb-2 text-2xl leading-snug font-semibold">{children}</h3>
  ),
  p: ({ children }) => <p className="text-foreground mb-4 text-base leading-relaxed">{children}</p>,
  ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="mb-4 list-decimal pl-6">{children}</ol>,
  li: ({ children }) => <li className="mb-1">{children}</li>,
  // 内联代码样式
  code: ({ children, className, ...props }) => {
    const match = /language-(\w+)/.exec(className || '');
    const isInline = !match;

    if (isInline) {
      return (
        <code
          className="bg-code-inline-bg text-foreground border-code-inline-border rounded-md border px-2 py-1 font-mono text-sm font-medium"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // 代码块样式 - 根据主题动态调整
  pre: ({ children }) => (
    <pre className="bg-code-block-bg border-code-block-border text-foreground [&_.hljs]:color-inherit mb-6 overflow-x-auto rounded-xl border p-4 text-sm shadow-lg transition-colors duration-200 [&_.hljs]:bg-transparent [&_code]:bg-transparent [&_code]:text-inherit">
      <div className="relative">{children}</div>
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-primary text-muted-foreground bg-muted/30 mb-4 rounded-r-md border-l-4 py-2 pl-4 italic">
      {children}
    </blockquote>
  ),
  // 表格相关组件 - 使用项目配色系统
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto">
      <table className="bg-table-bg border-table-border w-full border-collapse rounded-lg border">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-table-header-bg">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-table-border divide-y">{children}</tbody>,
  tr: ({ children }) => <tr className="hover:bg-table-row-hover transition-colors">{children}</tr>,
  th: ({ children }) => (
    <th className="text-foreground border-table-border border-b px-4 py-3 text-left font-semibold">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="text-foreground px-4 py-3 text-sm">{children}</td>,
  // 分割线
  hr: () => <hr className="border-border my-8 border-dashed" />,
  // 链接样式
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

interface MarkdownProps {
  children: string;
}

function MarkdownContent({ children }: MarkdownProps) {
  const { resolvedTheme } = useTheme();

  // 动态设置代码高亮主题
  React.useEffect(() => {
    // 移除之前的主题样式
    const existingStyle = document.querySelector('#hljs-theme');
    if (existingStyle) {
      existingStyle.remove();
    }

    // 根据主题加载对应的样式
    const link = document.createElement('link');
    link.id = 'hljs-theme';
    link.rel = 'stylesheet';

    // 使用CDN链接，更可靠
    if (resolvedTheme === 'dark') {
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css';
    } else {
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css';
    }

    document.head.appendChild(link);

    return () => {
      const styleEl = document.querySelector('#hljs-theme');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, [resolvedTheme]);

  return (
    <ReactMarkdown
      rehypePlugins={[rehypeHighlight]}
      remarkPlugins={[remarkGfm]}
      components={markdownComponents}
    >
      {children}
    </ReactMarkdown>
  );
}

export default function Markdown({ children }: MarkdownProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={markdownComponents}
      >
        {children}
      </ReactMarkdown>
    );
  }

  return <MarkdownContent>{children}</MarkdownContent>;
}
