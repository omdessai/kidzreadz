class Webster {
  appkey = '9c3ac110-450d-4a0b-acd5-5c50301f977f';
  url = 'https://dictionaryapi.com/api/v3/references/collegiate/json/';
  format = 'mp3';
  audioUrlPrefix =
    'https://media.merriam-webster.com/audio/prons/en/us/' + this.format + '/';

  async lookup(word) {
    var getUrl = this.url + word + '?key=' + this.appkey;
    var fetchResponse = await fetch(getUrl, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    var jsonResp = await fetchResponse.json();
    if (
      jsonResp &&
      jsonResp.length > 0 &&
      jsonResp[0].shortdef &&
      jsonResp[0].shortdef.length > 0
    ) {
      if (
        jsonResp[0].hwi &&
        jsonResp[0].hwi.prs &&
        jsonResp[0].hwi.prs.length > 0 &&
        jsonResp[0].hwi.prs[0].sound &&
        jsonResp[0].hwi.prs[0].sound.audio
      ) {
        return {
          meaning: jsonResp[0].shortdef[0],
          audio:
            this.audioUrlPrefix +
            jsonResp[0].hwi.prs[0].sound.audio[0] +
            '/' +
            jsonResp[0].hwi.prs[0].sound.audio +
            '.' +
            this.format,
        };
      }
      return {meaning: jsonResp[0].shortdef[0]};
    }
  }
}

module.exports = {
  Webster,
};
