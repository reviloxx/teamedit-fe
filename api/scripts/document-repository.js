class DocumentRepositoy {
    static documents = [];

    static getDocuments() {
        return this.documents;
    }

    static addDocument(document) {

        this.documents = this.documents.filter(x => x.id !== document.id);
        this.documents.push(document);
    }

    static deleteDocument(document) {

        this.documents = this.documents.filter(x => x.id !== document.id);
    }
}

module.exports = DocumentRepositoy;