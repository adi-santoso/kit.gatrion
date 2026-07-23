import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { githubLight } from '@uiw/codemirror-theme-github'
import { useThemeStore } from '../../store/themeStore'

const extensions = {
  json: [json()],
}

export default function CodeEditor({ value, onChange, readOnly = false, language = 'json', height = '300px' }) {
  const theme = useThemeStore((state) => state.theme)

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions[language] || []}
      theme={theme === 'dark' ? oneDark : githubLight}
      readOnly={readOnly}
      height={height}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
      }}
      className="dt-code-editor overflow-hidden rounded-[5px] border-[1.5px] border-[var(--dt-line)] bg-[var(--dt-panel)] font-mono text-sm shadow-[3px_3px_0_var(--dt-line)]"
      style={{ fontSize: '14px', colorScheme: theme }}
    />
  )
}
