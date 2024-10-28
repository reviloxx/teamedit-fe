module.exports = async function (context, req) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: [{ id: crypto.randomUUID(), content: "hallo", title: 'api doc', lastModifiedUtc: new Date().toISOString() }],
    };
  };