const ACCESS_KEY = 'dict.1.1.20170801T132430Z.613ff8bae0847d24.98ea9be0225adf1c9ae0b41327f1a0fd082fba03'

export const AVAIBLE_LANGS = [
  { code: 'be', name: 'Belarusian' },
  { code: 'bg', name: 'Bulgarian' },
  { code: 'cs', name: 'Czech' },
  { code: 'da', name: 'Danish' },
  { code: 'de', name: 'German' },
  { code: 'el', name: 'Greek' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'et', name: 'Estonian' },
  { code: 'fi', name: 'Finnish' },
  { code: 'fr', name: 'French' },
  { code: 'hu', name: 'Hungarian' },
  { code: 'it', name: 'Italian' },
  { code: 'lt', name: 'Lithuanian' },
  { code: 'lv', name: 'Latvian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'no', name: 'Norwegian' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'sk', name: 'Slovak' },
  { code: 'sv', name: 'Swedish' },
  { code: 'tr', name: 'Turkish' },
  { code: 'tt', name: 'Tatar' },
  { code: 'uk', name: 'Ukrainian' }
]

export function lookup(word, from, to) {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=${ACCESS_KEY}&lang=${from}-${to}&text=${word}`

  return fetch(url)
    .then(res => res.json())
    .then(res => {
      return res.def.reduce((result, pos) => {
        result.original = result.word || pos.text
        result.from = result.from || from
        result.to = result.to || to
        result.poses = result.poses || []

        const resultPos = {}
        resultPos.pos = pos.pos
        resultPos.translations = pos.tr.map(tr => tr.text)

        result.poses.push(resultPos)

        return result
      }, {})
    })
}

export function getLangs() {
  const url = `https://dictionary.yandex.net/api/v1/dicservice.json/getLangs?key=${ACCESS_KEY}`

  return fetch(url).then(res => res.json())
}
