import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Code, Heading1, Heading2, Heading3, Type } from 'lucide-react';
import { Toolbar } from './Toolbar';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onHtmlChange: (html: string) => void;
}

export function RichTextEditor({ value, onChange, onHtmlChange }: RichTextEditorProps) {
  const [mode, setMode] = useState<'wysiwyg' | 'html'>('wysiwyg');
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
      onHtmlChange(html);
    },
    editorProps: {
      attributes: {
        class: 'prose max-w-none focus:outline-none min-h-[200px]',
      },
    },
  });

  // Update editor content when value prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleHtmlChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newHtml = e.target.value;
    onChange(newHtml);
    onHtmlChange(newHtml);
  };

  return (
    <div className="border border-gray-300 rounded-xl overflow-hidden">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-50 border-b">
        {mode === 'wysiwyg' ? (
          <Toolbar editor={editor} />
        ) : (
          <span className="text-sm text-gray-600">Modalità HTML</span>
        )}
        
        <button
          type="button"
          onClick={() => setMode(mode === 'wysiwyg' ? 'html' : 'wysiwyg')}
          className="ml-4 px-3 py-1 rounded-lg text-sm font-medium bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {mode === 'wysiwyg' ? (
            <div className="flex items-center">
              <Code className="h-4 w-4 mr-1" />
              HTML
            </div>
          ) : (
            <div className="flex items-center">
              <Type className="h-4 w-4 mr-1" />
              Editor
            </div>
          )}
        </button>
      </div>

      <div className="p-4">
        {mode === 'wysiwyg' ? (
          <EditorContent editor={editor} />
        ) : (
          <textarea
            value={value}
            onChange={handleHtmlChange}
            className="w-full min-h-[300px] font-mono text-sm focus:outline-none resize-none"
            spellCheck={false}
          />
        )}
      </div>
    </div>
  );
}