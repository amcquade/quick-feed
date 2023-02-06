// Formatting method for URLs to avoid having duplicate favorites in localstorage as the key used is the URL
export const formatUrl = (url) => {
    let urlSequence;
    let finalUrl;
    if (url.includes('://')) {
      urlSequence = url.split('://')[1];
      finalUrl = 'https://' + urlSequence;
    } else {
      finalUrl = 'https://' + url;
    }

    return finalUrl;
};