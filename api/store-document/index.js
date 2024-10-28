const DocumentRepository = require('../scripts/document-repository');

module.exports = async function (context, req) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: DocumentRepository.addDocument(req.body),
    };
  };
