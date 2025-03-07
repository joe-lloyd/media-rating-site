import React from "react"
import { MDXProvider } from "@mdx-js/react"

const MyH1: React.FC = (props) => <h1 style={{ color: `tomato` }} {...props} />
const MyParagraph: React.FC = props => (
  <p style={{ fontSize: "18px", lineHeight: 1.6 }} {...props} />
)

const components = {
  h1: MyH1,
  p: MyParagraph,
}

export const MdxComponentsWrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <MDXProvider components={components}>{children}</MDXProvider>
)
