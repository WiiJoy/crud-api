export const getId = (url: string) => {
    const urlArray = url.split('/')
    const index = urlArray.indexOf('users')

    return urlArray[index + 1] || ''
}