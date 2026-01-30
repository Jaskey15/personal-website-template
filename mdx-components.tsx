import type { MDXComponents } from 'mdx/types';
import { MDXLink } from '@/components/mdx-link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
        {children}
      </h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
        {children}
      </h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white">
        {children}
      </h6>
    ),
    // Paragraphs and text
    p: ({ children }) => (
      <p className="my-4 text-gray-700 dark:text-gray-300 leading-relaxed">
        {children}
      </p>
    ),
    // Links
    a: MDXLink,
    // Lists
    ul: ({ children }) => (
      <ul className="my-4 ml-6 list-disc text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal text-gray-700 dark:text-gray-300 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="my-4 pl-4 border-l-4 border-gray-300 dark:border-gray-600 italic text-gray-600 dark:text-gray-400">
        {children}
      </blockquote>
    ),
    // Code
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-pink-600 dark:text-pink-400 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="my-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-x-auto">
        {children}
      </pre>
    ),
    // Tables
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-left text-gray-900 dark:text-white font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
        {children}
      </td>
    ),
    // Horizontal rule
    hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
    // Images
    img: ({ src, alt }) => (
      <img
        src={src}
        alt={alt}
        className="my-4 rounded-lg max-w-full h-auto"
      />
    ),
    // Allow custom components to be passed in
    ...components,
  };
}
