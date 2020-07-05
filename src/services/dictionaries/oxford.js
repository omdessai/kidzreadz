class Oxford {
  appkey = '2d96750da5f085eeb1c96d6b27e47f08';
  appid = 'b0f9fd73';
  url = 'https://od-api.oxforddictionaries.com:443/api/v2/entries/';

  async lookup(word) {
    var language = 'en-us';
    var getUrl = this.url + language + '/' + word;
    var fetchResponse = await fetch(getUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        app_id: this.appid,
        app_key: this.appkey,
      },
    });
    var jsonResp = await fetchResponse.json();
    return {
      meaning:
        jsonResp.results[0].lexicalEntries[0].entries[0].senses[0]
          .shortDefinitions[0],
    };
  }
}

module.exports = {
  Oxford,
};
