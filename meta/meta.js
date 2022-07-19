export const createMeta = (meta) => {
  for (let key in meta) {
    if (key !== 'api') {
      let metaTag = document.createElement('meta')
      metaTag.setAttribute('name', key)
      metaTag.setAttribute('content', meta[key])
      document.head.appendChild(metaTag)
    }

    if (key === 'title' || key === 'description') {
      let facebookTag = document.createElement('meta')
      let twitterTag = document.createElement('meta')
      facebookTag.setAttribute('name', `og:${key}`)
      facebookTag.setAttribute('content', meta[key])
      twitterTag.setAttribute('name', `twitter:${key}`)
      twitterTag.setAttribute('content', meta[key])
      document.head.appendChild(facebookTag)
      document.head.appendChild(twitterTag)
    }
    console.log(key, meta[key])
  }
}

const metaData = {
  title: 'todo',
  description: 'a vanilla todo application',
  author: 'alexander',
  version: '0.0.1',
  license: 'MIT',
  api:
    location.hostname === 'todo-vanilla-app-2.vercel.app'
      ? 'https://vanillatodoaxj.herokuapp.com/'
      : 'http://localhost:3000/',
}
export default metaData
