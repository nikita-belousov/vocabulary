const ACCESS_KEY = 'dict.1.1.20170801T132430Z.613ff8bae0847d24.98ea9be0225adf1c9ae0b41327f1a0fd082fba03';

export const AVAIBLE_LANGS = [
  { code: 'be', lang: 'Belarusian' },
  { code: 'bg', lang: 'Bulgarian' },
  { code: 'cs', lang: 'Czech' },
  { code: 'da', lang: 'Danish' },
  { code: 'de', lang: 'German' },
  { code: 'el', lang: 'Greek' },
  { code: 'en', lang: 'English' },
  { code: 'es', lang: 'Spanish' },
  { code: 'et', lang: 'Estonian' },
  { code: 'fi', lang: 'Finnish' },
  { code: 'fr', lang: 'French' },
  { code: 'hu', lang: 'Hungarian' },
  { code: 'it', lang: 'Italian' },
  { code: 'lt', lang: 'Lithuanian' },
  { code: 'lv', lang: 'Latvian' },
  { code: 'nl', lang: 'Dutch' },
  { code: 'no', lang: 'Norwegian' },
  { code: 'pl', lang: 'Polish' },
  { code: 'pt', lang: 'Portuguese' },
  { code: 'ru', lang: 'Russian' },
  { code: 'sk', lang: 'Slovak' },
  { code: 'sv', lang: 'Swedish' },
  { code: 'tr', lang: 'Turkish' },
  { code: 'tt', lang: 'Tatar' },
  { code: 'uk', lang: 'Ukrainian' }
];

export function lookup(word, from, to) {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${ACCESS_KEY}&lang=${from}-${to}&text=${word}`;

  return fetch(url)
    .then(res => res.json())
    .then(res => {
      return res.def.reduce((result, pos) => {
        result.original = result.word || pos.text;
        result.from = result.from || from;
        result.to = result.to || to;
        result.poses = result.poses || [];

        const resultPos = {};
        resultPos.pos = pos.pos;
        resultPos.translations = pos.tr.map(tr => tr.text);

        result.poses.push(resultPos);

        return result;
      }, {});
    });
}

export function getLangs() {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${ACCESS_KEY}`;

  return fetch(url).then(res => res.json());
}
