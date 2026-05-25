import { useState } from 'react'
import ToolLayout from '../../components/layout/ToolLayout'
import Button from '../../components/ui/Button'
import CopyButton from '../../components/ui/CopyButton'

const loremText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState('paragraphs')
  const [output, setOutput] = useState('')

  const generateLorem = () => {
    const words = loremText.split(' ')
    const sentences = loremText.split('. ').map(s => s + '.')
    
    let result = ''
    
    if (type === 'words') {
      const generated = []
      for (let i = 0; i < count; i++) {
        generated.push(words[i % words.length])
      }
      result = generated.join(' ')
    } else if (type === 'sentences') {
      const generated = []
      for (let i = 0; i < count; i++) {
        generated.push(sentences[i % sentences.length])
      }
      result = generated.join(' ')
    } else {
      const generated = []
      for (let i = 0; i < count; i++) {
        generated.push(loremText)
      }
      result = generated.join('\n\n')
    }
    
    setOutput(result)
  }

  return (
    <ToolLayout
      category="text"
      toolName="Lorem Ipsum Generator"
      description="Generate placeholder text."
    >
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Type
          </label>
          <div className="flex gap-2">
            <Button
              variant={type === 'paragraphs' ? 'primary' : 'secondary'}
              onClick={() => setType('paragraphs')}
            >
              Paragraphs
            </Button>
            <Button
              variant={type === 'sentences' ? 'primary' : 'secondary'}
              onClick={() => setType('sentences')}
            >
              Sentences
            </Button>
            <Button
              variant={type === 'words' ? 'primary' : 'secondary'}
              onClick={() => setType('words')}
            >
              Words
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Count: {count}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="flex gap-2">
          <Button variant="primary" onClick={generateLorem}>
            Generate
          </Button>
          {output && <CopyButton text={output} />}
        </div>
      </div>

      {output && (
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Generated Text
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-gray-900 border border-white/[0.06] rounded-lg p-4 text-slate-100 text-sm resize-none"
          />
        </div>
      )}
    </ToolLayout>
  )
}
