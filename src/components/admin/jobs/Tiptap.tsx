'use client';
import { Editor, EditorContent } from '@tiptap/react';
import { Toggle } from '../../ui/toggle';
import {
  BoldIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  StrikethroughIcon,
} from 'lucide-react';
import { Skeleton } from '../../ui/skeleton';

const Tiptap = ({ editor }: { editor: Editor | null }) => {
  const menuItems = editor && [
    {
      command: () => editor.chain().focus().toggleBold().run(),
      content: <BoldIcon className='h-4 w-4' />,
      isActive: () => editor.isActive('bold'),
    },
    {
      command: () => editor.chain().focus().toggleItalic().run(),
      content: <ItalicIcon className='h-4 w-4' />,
      isActive: () => editor.isActive('italic'),
    },
    {
      command: () => editor.chain().focus().toggleStrike().run(),
      content: <StrikethroughIcon className='h-4 w-4' />,
      isActive: () => editor.isActive('strike'),
    },
    {
      command: () => editor.chain().focus().toggleBulletList().run(),
      content: <ListIcon className='h-4 w-4' />,
      isActive: () => editor.isActive('bulletList'),
    },
    {
      command: () => editor.chain().focus().toggleOrderedList().run(),
      content: <ListOrderedIcon className='h-4 w-4' />,
      isActive: () => editor.isActive('orderedList'),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      content: 'H1',
      isActive: () => editor.isActive('heading', { level: 1 }),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      content: 'H2',
      isActive: () => editor.isActive('heading', { level: 2 }),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      content: 'H3',
      isActive: () => editor.isActive('heading', { level: 3 }),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      content: 'H4',
      isActive: () => editor.isActive('heading', { level: 4 }),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      content: 'H5',
      isActive: () => editor.isActive('heading', { level: 5 }),
    },
    {
      command: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      content: 'H6',
      isActive: () => editor.isActive('heading', { level: 6 }),
    },
  ];

  return menuItems ? (
    <div className='border rounded-lg'>
      <div className='flex p-1 bg-gray-100'>
        {menuItems.map((item, index) => (
          <Toggle
            key={index}
            onPressedChange={() => item.command()}
            pressed={item.isActive()}
            variant='default'
            className='data-[state=on]:bg-gray-200'
          >
            {item.content}
          </Toggle>
        ))}
      </div>
      <EditorContent className='p-2' editor={editor} />
    </div>
  ) : (
    <div className='pt-8 pl-4'>
      <Skeleton className='h-6 w-24' />
      <Skeleton className='h-4 w-2/5 mt-4' />
    </div>
  );
};

export default Tiptap;
