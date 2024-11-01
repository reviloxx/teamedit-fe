import React, { Component } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import { EditorContent, Editor } from '@tiptap/react';
import { Collaboration } from '@tiptap/extension-collaboration';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';

class DocumentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
        };
    }

    componentDidMount() {
        const { document } = this.props;

        const editor = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Italic,
                Heading.configure({ levels: [1, 2, 3] }),
                BulletList,
                OrderedList,
                ListItem,
                Collaboration.configure({
                    document: document.ydoc
                })
            ],
            editorProps: {
                attributes: {
                    class: 'input'
                }
            }
        });

        this.setState({ editor });
       
        this.provider = new TiptapCollabProvider({            
            name: document.id,
            appId: '7j9y6m10',
            token: 'notoken',
            document: document.ydoc
        });
    }

    componentWillUnmount() {
        if (this.state.editor) {
            this.state.editor.destroy();
        }
        if (this.provider) {
            this.provider.disconnect();
        }
    }

    renderToolbar() {
        const { editor } = this.state;

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
    }

    render() {
        const { editor } = this.state;
        const { document, onClose } = this.props;

        return (
            <div className="editor-container">
                <div style={{ justifyContent: "space-between", alignItems: "flex-start", display: "flex" }}>
                    <h2>{document.title}</h2>
                    <IconButton onClick={onClose} className="close-button"><CloseIcon /></IconButton>
                </div>            
                {this.renderToolbar()}
                {editor && (
                    <EditorContent
                        style={{ margin: 0, justifyContent: 'top-left', alignItems: 'top-left' }}
                        editor={editor}
                    />
                )}
            </div>
        );
    }
}

export default DocumentEditor;
