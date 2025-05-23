import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

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
  code: ({ children, className }) => (
    <code
      className={`rounded bg-zinc-100 px-1 py-0.5 font-mono text-sm dark:bg-zinc-800 ${className || ''}`}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="mb-4 overflow-x-auto rounded-lg bg-zinc-900 p-4 text-sm text-white">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-primary text-muted-foreground mb-4 border-l-4 pl-4 italic">
      {children}
    </blockquote>
  ),
};

interface MarkdownProps {
  children: string;
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeHighlight]} components={markdownComponents}>
      {children}
    </ReactMarkdown>
  );
}
