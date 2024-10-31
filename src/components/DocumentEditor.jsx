import React, { Component } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, Editor } from '@tiptap/react';
import { Collaboration } from '@tiptap/extension-collaboration';
import { TiptapCollabProvider } from '@hocuspocus/provider';
import { format } from 'date-fns';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

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

    render() {
        const { editor } = this.state;
        const { document, onClose } = this.props;

        return (
            <div className="editor-container">
                <div style={{textAlign:"right"}}>
                    <IconButton onClick={onClose} className="close-button"><CloseIcon/></IconButton>
                </div>                
                <h2>{document.title}</h2>
                <h5>Created on {format(new Date(document.createdUtc), 'd.MM.yyyy, H:mm:ss')}</h5>
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
