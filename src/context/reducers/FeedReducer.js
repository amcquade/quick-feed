export function feedReducer(state, action) {
    switch (action.type) {
        case "SET_CURRENT_FEED":
            // Update current feed and previous feed at the same time.
            return { ...state, currentFeed: {
                episodes: action.payload.items,
                program_title: action.payload.title,
                program_image: action.payload.image.url,
                program_description: action.payload.description,
                program_link: action.payload.feedUrl
              }, previousFeeds: [...new Set([...state.previousFeeds, action.payload.feedUrl])]
            };
        case "SET_FETCHING":
            return { ...state, onFetching: action.payload };
        case "SET_ERROR":
            return { ...state, error: action.payload };
        case "ADD_FAVORITE_FEED":
            localStorage.setItem(`favorite-${action.payload.program_link}`, JSON.stringify(action.payload));
            return { ...state, favoriteFeeds: [...state.favoriteFeeds, action.payload] };
        case "REMOVE_FAVORITE_FEED":
            localStorage.removeItem(`favorite-${action.payload.program_link}`);
            return { ...state, favoriteFeeds: state.favoriteFeeds.filter(element => element.program_link !== action.payload.program_link) };
        default:
            return state;
    }
}