import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-50 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-amber-400 mb-4">404</div>
        <h1 className="text-3xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-300 mb-8">
          Sorry, we couldn't find what you were looking for.
          {process.env.NODE_ENV === "development" && (
            <span className="block mt-2 text-sm">
              Try creating a page in{" "}
              <code className="bg-gray-700 text-amber-300 px-1.5 py-0.5 rounded font-mono text-sm">
                src/pages/
              </code>
            </span>
          )}
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-5 py-2.5 bg-amber-400 text-gray-900 font-semibold rounded-lg hover:bg-amber-300 transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
