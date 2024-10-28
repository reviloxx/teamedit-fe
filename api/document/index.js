module.exports = async function (context, req) {
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: [{ id: "9a96c9bf-8f6d-4deb-8a4e-1de8e7e33553", content: "hallo", title: 'api doc', lastModifiedUtc: new Date().toISOString() }],
    };
  };