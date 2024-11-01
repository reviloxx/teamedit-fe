import GqlQueryProvider from './gql-query-provider';
import YdocCompressionUtils from './ydoc-compression-utils';

const endpoint = "/data-api/graphql"

class ApiClient {  

    static async getById(id) {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: GqlQueryProvider.getById(id)
        });        
        
        const responseData = await response.json();
        const data = responseData.data.document_by_pk;

        if (data === null) {
            return null;
        }
        
        data.ydoc = YdocCompressionUtils.fromBase64(data.ydoc);        
        return data;
    };    

    static async getAll() {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: GqlQueryProvider.getAll()
        });        
        
        const data = await response.json();
        return data.data.documents.items;
    };

    static async create(document) {
        document.ydoc = YdocCompressionUtils.toBase64(document.ydoc);

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: GqlQueryProvider.create(document)
        });
    }

    static async update(document) {
        document.ydoc = YdocCompressionUtils.toBase64(document.ydoc);

        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: GqlQueryProvider.update(document)
        });
    }

    static async delete(document) {      
        await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: GqlQueryProvider.delete(document)
        });
    }
}

export default ApiClient;