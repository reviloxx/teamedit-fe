import * as Y from 'yjs';
import * as base64 from "byte-base64";

const endpoint = "/data-api/graphql"

class DocumentApiService {  

    static async getById(id) {
        const gql = `
        query getById($id: UUID!) {
            document_by_pk(id: $id) {
                id
                title
                createdUtc
                ydoc                
            }
        }`;

        const query = {
            query: gql,
            variables: {
              id: id,
            },
          };

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });        
        
        const responseData = await response.json();
        const data = responseData.data.document_by_pk;

        if (data === null) {
            return null;
        }

        const loadedYDoc = new Y.Doc()
        Y.applyUpdate(loadedYDoc, base64.base64ToBytes(data.ydoc))
        data.ydoc = loadedYDoc;
        
        return data;
    };    

    static async getAll() {
        const query = `
        {
            documents {
            items {
                    id
                    title
                    createdUtc
                }
            }
        }`;

        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query: query })
        });        
        
        const data = await response.json();
        return data.data.documents.items;
    };

    static async create(document) {
        document.ydoc = base64.bytesToBase64(Y.encodeStateAsUpdate(document.ydoc));

        const gql = `
            mutation create($item: CreateDocumentInput!) {
            createDocument(item: $item) {
                id
            }
        }`;

        const query = {
            query: gql,
            variables: {
                item: document
            } 
        };

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });
    }

    static async update(document) {
        document.ydoc = base64.bytesToBase64(Y.encodeStateAsUpdate(document.ydoc));
        const gql = `
            mutation update($id: UUID!, $item: UpdateDocumentInput!) {
            updateDocument(id: $id, item: $item) {
                id
            }
        }`;

        const query = {
            query: gql,
            variables: {
                id: document.id,
                item: document
            } 
        };

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });
    }

    static async delete(document) {
        const gql = `
            mutation delete($id: UUID!) {
            deleteDocument(id: $id) {
                id
            }
        }`;

        const query = {
            query: gql,
            variables: {
                id: document.id
            } 
        };

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query)
        });
    }
}

export default DocumentApiService;