import React from "react"
import { MDXProvider } from "@mdx-js/react"

// Heading components
const Heading1: React.FC = (props) => (
  <h1 className="text-3xl font-bold mb-6 text-rose-600 dark:text-rose-400" {...props} />
)

const Heading2: React.FC = (props) => (
  <h2 className="text-2xl font-semibold mt-8 mb-4 text-rose-500 dark:text-rose-300" {...props} />
)

const Heading3: React.FC = (props) => (
  <h3 className="text-xl font-medium mt-6 mb-3 text-rose-400 dark:text-rose-200" {...props} />
)

// Text components
const Paragraph: React.FC = (props) => (
  <p className="text-base leading-relaxed mb-4 text-gray-800 dark:text-gray-200" {...props} />
)

// List components
const UnorderedList: React.FC = (props) => (
  <ul className="list-disc pl-6 mb-6 text-gray-800 dark:text-gray-200" {...props} />
)

const OrderedList: React.FC = (props) => (
  <ol className="list-decimal pl-6 mb-6 text-gray-800 dark:text-gray-200" {...props} />
)

const ListItem: React.FC = (props) => (
  <li className="mb-2" {...props} />
)

// Inline components
const InlineCode: React.FC = (props) => (
  <code className="bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 font-mono text-sm" {...props} />
)

const Blockquote: React.FC = (props) => (
  <blockquote className="border-l-4 border-rose-300 dark:border-rose-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300" {...props} />
)

// Links & Media
const Anchor: React.FC = (props) => (
  <a className="text-blue-600 dark:text-blue-400 hover:underline" {...props} />
)

// Code blocks are already handled by syntax highlighting plugins, but we can add custom styling
const CodeBlock: React.FC = (props) => (
  <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-6 text-sm" {...props} />
)

// Define custom MDX components
const components = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,
  a: Anchor,
}

export const MdxComponentsWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
