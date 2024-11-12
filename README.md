# TeamEdit
This project is a web-based rich text editor built with **React** and **Material-UI**. It provides a simple and customizable interface for basic text formatting, alignment, color styling, and undo-redo functionality. It is possible for multiple users to collaborate in real time when editing a document.
Currently the application is hosted as an Azure Static Web Application: https://gentle-sky-0d32c1210.5.azurestaticapps.net/

# Main React Components
The application is composed with multiple React components which encapsulate their own rendering and logic. The most important ones are:
[CollaborationApp](#CollaborationApp)
[DocumentEditor](#DocumentEditor)

# CollaborationApp

## Overview

The `CollaborationApp` component is a React-based application for managing and editing documents collaboratively. It uses **Yjs** for real-time document updates and includes CRUD functionality to create, view, edit, and delete documents through an `ApiClient`.

## Props

-   **`currentUser`** (object): Represents the currently authenticated user. This prop is passed to the `DocumentEditor` for tracking edits.

## State

-   **`documents`** (array): List of documents fetched from the server.
-   **`currentDocument`** (object or null): The document currently being edited.
-   **`isEditing`** (boolean): Determines if the editor view is displayed.
-   **`isAdding`** (boolean): Indicates if the "add document" form is displayed.

## Lifecycle Methods

-   **`componentDidMount`**: Fetches the initial list of documents from the API when the component mounts.

## Methods

### `fetchData`

Fetches all documents from the API and updates the `documents` state.

### `handleShowAddDocument`

Sets `isAdding` to `true` to display the form for adding a new document.

### `handleCancelAddDocument`

Sets `isAdding` to `false` to hide the add document form.

### `handleAddDocument`

Creates a new document with a generated ID, adds it to the API, and updates the `documents` state with the new document.

-   **Parameters**:
    -   `newDocumentName` (string): The name/title of the new document.

### `handleOpenDocument`

Fetches and opens a document for editing based on its ID. If the document no longer exists, it removes it from the `documents` state.

-   **Parameters**:
    -   `id` (string): The unique identifier of the document to open.

### `handleDeleteDocument`

Deletes the specified document from the API and removes it from the `documents` state.

-   **Parameters**:
    -   `document` (object): The document to delete.

### `handleCloseEditor`

Saves the current document's state upon closing the editor, updating it in the API if it still exists or recreating it if deleted.

## Rendered Output

-   **If Editing**: Displays the `DocumentEditor` component, passing the `currentDocument`, `currentUser`, and `onClose` handler.
-   **If Not Editing**: Renders the document list view, which includes:
    -   `DocumentListHeader`: For adding, cancelling, and refreshing documents.
    -   `DocumentList`: Displays each document with options to open or delete.

## Usage

1.  **Adding a Document**: Use `DocumentListHeader` to open the add document form, enter a title, and save.
2.  **Editing a Document**: Click on a document in `DocumentList` to open it in `DocumentEditor`.
3.  **Deleting a Document**: Select the delete option in `DocumentList` for the desired document.

# DocumentEditor

## Overview

The `DocumentEditor` component provides a collaborative document editor using the **Tiptap** editor framework, with real-time updates managed by **TiptapCollabProvider** from the Hocuspocus library. This editor supports multiple rich text features and collaboration tools, including a collaboration cursor, and integrates a custom toolbar for text formatting.

## Props

-   **`document`** (object): The document to be edited, containing `id`, `title`, and `ydoc` (Yjs document instance) for collaboration.
-   **`currentUser`** (object): Represents the current user in the collaboration session, used by `CollaborationCursor` to identify the user’s cursor.
-   **`onClose`** (function): Callback function to handle closing and saving the document.

## State

-   **`editor`** (Editor instance or null): Holds the Tiptap editor instance, initialized in `componentDidMount`.

## Lifecycle Methods

-   **`componentDidMount`**:
    -   Initializes the `TiptapCollabProvider` for real-time collaboration.
    -   Sets up the Tiptap editor with extensions for rich text features like **bold**, **italic**, **underline**, **code blocks**, and **highlighting**, among others.
    -   Configures collaboration and cursors with the `Collaboration` and `CollaborationCursor` extensions.
-   **`componentWillUnmount`**:
    -   Cleans up the editor and disconnects the collaboration provider when the component is unmounted.

## Editor Extensions

The editor includes a range of Tiptap extensions for text formatting and collaboration:

-   **Document, Paragraph, Text**: Core document structure.
-   **Bold, Italic, Underline, Strike, CodeBlock**: Basic text styling.
-   **Blockquote, Highlight, TextStyle, Color**: Additional text styles.
-   **BulletList, OrderedList, ListItem**: List formatting.
-   **Heading**: Configures heading levels.
-   **TextAlign**: Controls text alignment for headings and paragraphs.
-   **Collaboration, CollaborationCursor**: Enables real-time document collaboration and displays cursors of collaborators.

## Rendered Output

-   **Header**: Displays the document title and a "Save and Close" button.
-   **DocumentEditorToolbar**: Renders a custom toolbar with text formatting options, positioned as a sticky element for easy access while scrolling.
-   **EditorContent**: Main editor content area where the document text is displayed and edited.

## Usage

To use this component:

1.  Pass the `document` and `currentUser` props.
2.  Use the `onClose` function to save and close the editor when editing is complete.