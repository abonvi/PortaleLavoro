import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3 } from 'lucide-react';

interface ToolbarProps {
  editor: Editor | null;
}

interface ToolbarButton {
  icon: React.ElementType;
  title: string;
  action: () => void;
  isActive: () => boolean;
}

export function Toolbar({ editor }: ToolbarProps) {
  if (!editor) return null;

  const tools: ToolbarButton[] = [
    {
      icon: Bold,
      title: 'Grassetto',
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive('bold'),
    },
    {
      icon: Italic,
      title: 'Corsivo',
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive('italic'),
    },
    {
      icon: Heading1,
      title: 'Titolo 1',
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      icon: Heading2,
      title: 'Titolo 2',
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      icon: Heading3,
      title: 'Titolo 3',
      action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      icon: List,
      title: 'Lista puntata',
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive('bulletList'),
    },
    {
      icon: ListOrdered,
      title: 'Lista numerata',
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive('orderedList'),
    },
  ];

  return (
    <div className="flex items-center space-x-1">
      {tools.map((tool) => {
        const Icon = tool.icon;
        return (
          <button
            key={tool.title}
            onClick={tool.action}
            className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${
              tool.isActive() ? 'text-primary-600 bg-primary-50' : 'text-gray-600'
            }`}
            title={tool.title}
            type="button"
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
}