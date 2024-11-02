import React from 'react';
import IconButton from '@mui/material/IconButton';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';

const DocumentEditorToolbar = ({ editor }) => {
    if (!editor) return null;

    return (
        <div className="toolbar">
            <IconButton onClick={() => editor.chain().focus().toggleBold().run()} aria-label="Bold">
                <FormatBoldIcon />
            </IconButton>
            <IconButton onClick={() => editor.chain().focus().toggleItalic().run()} aria-label="Italic">
                <FormatItalicIcon />
            </IconButton>
            <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()} aria-label="Bullet List">
                <FormatListBulletedIcon />
            </IconButton>
            <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()} aria-label="Ordered List">
                <FormatListNumberedIcon />
            </IconButton>
            {[1, 2, 3].map(level => (
                <IconButton
                    key={level}
                    onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
                    aria-label={`Heading ${level}`}
                >
                    <TitleIcon fontSize="small" />{level}
                </IconButton>
            ))}
        </div>
    );
};

export default DocumentEditorToolbar;