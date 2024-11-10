import React, { Component } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import Highlight from '@tiptap/extension-highlight';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, Editor } from '@tiptap/react';
import { Collaboration } from '@tiptap/extension-collaboration';
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DocumentEditorToolbar from './DocumentEditorToolbar';
import { Tooltip } from '@mui/material';

class DocumentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null
        };
    }

    componentDidMount() {
        const { document, currentUser } = this.props;

        this.provider = new TiptapCollabProvider({
            name: document.id,
            appId: '7j9y6m10',
            token: 'notoken',
            document: document.ydoc,
        });

        const editor = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Bold,
                Italic,
                Underline,
                Strike,
                CodeBlock,
                Blockquote,
                Highlight.configure({ multicolor: true }),
                TextStyle,
                Color,
                Heading.configure({ levels: [1, 2, 3] }),
                BulletList,
                OrderedList,
                ListItem,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Collaboration.configure({
                    document: document.ydoc
                }),
                CollaborationCursor.configure({
                    provider: this.provider,
                    user: currentUser
                })
            ],
            editorProps: {
                attributes: {
                    class: 'input'
                }
            }
        });      

        this.setState({ editor });
    }

    componentWillUnmount() {
        if (this.state.editor) {
            this.state.editor.destroy();
        }
        if (this.provider) {
            this.provider.disconnect();
        }
    }

    render() {
        const { editor } = this.state;
        const { document, onClose } = this.props;

        return (
            <div className="editor-container">
                <div style={{ justifyContent: "space-between", alignItems: "flex-start", display: "flex" }}>
                    <h2>{document.title}</h2>
                    <Tooltip title='Save And Close'>
                        <IconButton onClick={onClose} className="close-button"><CloseIcon /></IconButton>
                    </Tooltip>
                </div>            
                <div style={{ position: 'sticky', top: '60px', margin: '1px', zIndex: 100, backgroundColor: '#f9f9f9' }}>
                    <DocumentEditorToolbar editor={editor} />
                </div>
                <EditorContent style={{ margin: 0, justifyContent: 'top-left', alignItems: 'top-left' }} editor={editor} />
            </div>
        );
    }
}

export default DocumentEditor;
