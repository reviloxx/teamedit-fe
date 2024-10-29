import React, { Component } from 'react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import { EditorContent, Editor } from '@tiptap/react';
import { Collaboration } from '@tiptap/extension-collaboration';
import { TiptapCollabProvider } from '@hocuspocus/provider';

class DocumentEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editor: null,
        };
    }

    componentDidMount() {
        const { document, yDoc } = this.props;

        const editor = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                Collaboration.configure({
                    document: yDoc, // Configure Y.Doc for collaboration
                }),
            ],
            editorProps: {
                attributes: {
                    class: 'input'
                }
            },
            onUpdate: ({ editor }) => {
                if (editor.state.doc.textContent !== "") {
                    document.content = editor.state.doc.textContent;
                }
            }
        });

        this.setState({ editor });

        // Connect to your Collaboration server
        this.provider = new TiptapCollabProvider({
            name: document.id, // Unique document identifier for syncing
            appId: '7j9y6m10', // Your Cloud Dashboard AppID or `baseURL` for on-premises
            token: 'notoken', // Your JWT token
            document: yDoc,
            onSynced: () => {
                if (editor.state.doc.textContent === "") {
                    editor.commands.setContent(document.content);
                }
            }
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
                <h2>{document.title}</h2>
                {editor && (
                    <EditorContent
                        style={{ margin: 0, justifyContent: 'top-left', alignItems: 'top-left' }}
                        editor={editor}
                    />
                )}
                <div className="button-container">
                    <button onClick={onClose} className="button" style={{ backgroundColor: '#f0a500' }}>
                        Close
                    </button>
                </div>
            </div>
        );
    }
}

export default DocumentEditor;
