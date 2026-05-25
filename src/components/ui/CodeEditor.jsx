import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'
import { githubLight } from '@uiw/codemirror-theme-github'
import { useThemeStore } from '../../store/themeStore'

export default function CodeEditor({ value, onChange, readOnly = false, language = 'json', height = '300px' }) {
  const { isDark } = useThemeStore()
  
  const extensions = {
    json: [json()],
  }

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      extensions={extensions[language] || []}
      theme={isDark ? oneDark : githubLight}
      readOnly={readOnly}
      height={height}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
      }}
      className="text-sm font-mono border border-slate-200 dark:border-white/[0.06] rounded-lg overflow-hidden"
      style={{ fontSize: '14px' }}
    />
  )
}
