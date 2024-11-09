import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';

const colors = ['#FF5733', '#33FF57', '#3357FF', '#FFD700', '#FF33A8', '#A833FF', '#333333'];

const DocumentEditorToolbar = ({ editor }) => {
    const [textColorAnchor, setTextColorAnchor] = useState(null);
    const [backgroundColorAnchor, setBackgroundColorAnchor] = useState(null);

    if (!editor) return null;

    const handleTextColorClick = (event) => setTextColorAnchor(event.currentTarget);
    const handleBackgroundColorClick = (event) => setBackgroundColorAnchor(event.currentTarget);
    const closeTextColor = () => setTextColorAnchor(null);
    const closeBackgroundColor = () => setBackgroundColorAnchor(null);

    const applyTextColor = (color) => {
        editor.chain().focus().setColor(color).run();
        closeTextColor();
    };
    
    const applyBackgroundColor = (color) => {
        if (color === "reset") {
            editor.chain().focus().unsetHighlight().run();
        } else {
            editor.chain().focus().setHighlight({ color }).run();
        }
        closeBackgroundColor();
    };

    return (
        <div className="toolbar">
            {/* Text Formatting */}
            <Tooltip title="Bold">
                <IconButton onClick={() => editor.chain().focus().toggleBold().run()}>
                    <FormatBoldIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Italic">
                <IconButton onClick={() => editor.chain().focus().toggleItalic().run()}>
                    <FormatItalicIcon />
                </IconButton>
            </Tooltip>

            {/* Alignment */}
            <Tooltip title="Align Left">
                <IconButton onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                    <FormatAlignLeftIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Align Center">
                <IconButton onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                    <FormatAlignCenterIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Align Right">
                <IconButton onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                    <FormatAlignRightIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Justify">
                <IconButton onClick={() => editor.chain().focus().setTextAlign('justify').run()}>
                    <FormatAlignJustifyIcon />
                </IconButton>
            </Tooltip>

            {/* Lists */}
            <Tooltip title="Bullet List">
                <IconButton onClick={() => editor.chain().focus().toggleBulletList().run()}>
                    <FormatListBulletedIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Numbered List">
                <IconButton onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                    <FormatListNumberedIcon />
                </IconButton>
            </Tooltip>

            {/* Headings */}
            {[1, 2, 3].map(level => (
                <Tooltip key={level} title={`Heading ${level}`}>
                    <IconButton onClick={() => editor.chain().focus().toggleHeading({ level }).run()}>
                        <TitleIcon fontSize="small" />{level}
                    </IconButton>
                </Tooltip>
            ))}

             {/* Text Color Picker */}
             <Tooltip title="Text Color">
                <IconButton onClick={handleTextColorClick}>
                    <FormatColorTextIcon />
                </IconButton>
            </Tooltip>
            <Popover
                open={Boolean(textColorAnchor)}
                anchorEl={textColorAnchor}
                onClose={closeTextColor}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <div style={{ display: 'flex', padding: '8px' }}>
                    {colors.map((color) => (
                        <IconButton
                            key={color}
                            onClick={() => applyTextColor(color)}
                            style={{ backgroundColor: color, width: 24, height: 24, margin: '1px' }}
                        />
                    ))}
                </div>
            </Popover>

            {/* Background Color Picker */}
            <Tooltip title="Background Color">
                <IconButton onClick={handleBackgroundColorClick}>
                    <FormatColorFillIcon />
                </IconButton>
            </Tooltip>
            <Popover
                open={Boolean(backgroundColorAnchor)}
                anchorEl={backgroundColorAnchor}
                onClose={closeBackgroundColor}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <div style={{ display: 'flex', padding: '8px' }}>
                    <IconButton
                        onClick={() => applyBackgroundColor("reset")}
                        style={{ width: 24, height: 24, margin: '1px', border: '1px solid black' }}
                    >
                    </IconButton>
                    {colors.map((color) => (
                        <IconButton
                            key={color}
                            onClick={() => applyBackgroundColor(color)}
                            style={{ backgroundColor: color, width: 24, height: 24, margin: '1px' }}
                        />
                    ))}
                </div>
            </Popover>
        </div>
    );
};

export default DocumentEditorToolbar;
