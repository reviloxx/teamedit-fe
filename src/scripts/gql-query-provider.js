class GqlQueryProvider {
    static getById(id) {
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

          return JSON.stringify(query);
    }

    static getAll() {
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

        return JSON.stringify({ query: query });
    }

    static create(document) {
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

        return JSON.stringify(query);
    }

    static update(document) {
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

        return JSON.stringify(query);
    }

    static delete(document) {
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

        return JSON.stringify(query);
    }
}

export default GqlQueryProvider;