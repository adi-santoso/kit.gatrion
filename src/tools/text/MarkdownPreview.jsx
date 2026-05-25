import { useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import ToolLayout from '../../components/layout/ToolLayout'

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and this is *italic*.\n\n- List item 1\n- List item 2\n\n```js\nconst hello = "world";\n```')

  const getHTML = () => {
    const rawHTML = marked(markdown)
    return DOMPurify.sanitize(rawHTML)
  }

  return (
    <ToolLayout
      category="text"
      toolName="Markdown Preview"
      description="Live preview Markdown ke HTML."
    >
      <div className="grid grid-cols-2 gap-4">
        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Markdown Input
          </label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[600px] bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 font-mono text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500/50 resize-none"
          />
        </div>

        {/* Preview */}
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            HTML Preview
          </label>
          <div
            className="w-full h-[600px] bg-white dark:bg-gray-900 border border-slate-200 dark:border-white/[0.06] rounded-lg p-4 text-slate-900 dark:text-slate-100 text-sm overflow-y-auto prose dark:prose-invert prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: getHTML() }}
            style={{
              lineHeight: '1.6',
            }}
          />
        </div>
      </div>
    </ToolLayout>
  )
}
