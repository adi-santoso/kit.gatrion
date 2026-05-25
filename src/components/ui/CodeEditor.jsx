import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

export default function CodeEditor({ value, onChange, readOnly = false, language = 'json' }) {
  const extensions = {
    json: [json()],
  }

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions[language] || []}
      theme={oneDark}
      readOnly={readOnly}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
      }}
      className="text-sm font-mono border border-white/[0.06] rounded-lg overflow-hidden"
      style={{ fontSize: '14px' }}
    />
  )
}
