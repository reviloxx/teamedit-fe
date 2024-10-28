import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { Collaboration } from '@tiptap/extension-collaboration'
// Importing the provider and useEffect
import { useEffect } from 'react'
import { HocuspocusProvider, TiptapCollabProvider } from '@hocuspocus/provider'


function Editor({ document, yDoc }) {
    const editor = useEditor({
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
                class: 'focus:outline-none'
            }
        },
        onUpdate({ editor }) {
            if (editor.state.doc.textContent !== "")
                document.content = editor.state.doc.textContent
        }        
    })

    // Connect to your Collaboration server
    useEffect(() => {
        new TiptapCollabProvider({
            name: document.id, // Unique document identifier for syncing. This is your document name.
            appId: '7j9y6m10', // Your Cloud Dashboard AppID or `baseURL` for on-premises
            token: 'notoken', // Your JWT token
            document: yDoc,
            
            onSynced() {
                if (editor.state.doc.textContent === "")
                    editor.commands.setContent(document.content)
            }            
        })
    }, [])
    //useEffect(() => {
    //    new HocuspocusProvider({            
    //        name: 'document.name', // Unique document identifier for syncing. This is your document name.
    //        url: 'ws://127.0.0.1:1234', // Your Cloud Dashboard AppID or `baseURL` for on-premises
    //        token: 'notoken', // Your JWT token
    //        document: doc,

    //        // The onSynced callback ensures initial content is set only once using editor.setContent(), preventing repetitive content loading on editor syncs.
    //        onSynced() {
    //            if (!doc.getMap('config').get('initialContentLoaded') && editor) {
    //                doc.getMap('config').set('initialContentLoaded', true)

    //                editor.commands.setContent(`Initial text`)
    //            }
    //        },
    //    })
    //}, [])

    return (
        <EditorContent style={{
            margin: 0,
            justifyContent: 'top-left',
            alignItems: 'top-left',
        }} editor={editor} />
    )
}

export default Editor;