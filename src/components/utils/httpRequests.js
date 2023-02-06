import { formatUrl } from "./formatUtils";

export const getFeed = async (event) => {

    if (event.preventDefault != null)
      event.preventDefault();
    const feed_url = formatUrl(event.target.elements.feed_url.value);
    const Parser = require("rss-parser");
    const parser = new Parser({
      customFields: {
        item: [["enclosure", { keepArray: true }]],
      },
    });
  
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  
    return await parser.parseURL(CORS_PROXY + feed_url);
};