import  { decode } from 'html-entities';

const getImageUrl = (decodedContent) => {
    let imgRegex = /<img[^>]*src="([^"]*)"/gm;

    let matches = decodedContent.matchAll(imgRegex);
    let images = '';

    for(let match of matches){
        if(match[1] !== '' && match[1].startsWith('https')) {
            images = match;
        }
    }

    return images ? images[1] : null
};

const decodeContent = (markup) => {
    return decode(markup);
};

const removeAllTags = (contentText) => {
    return contentText.replace(/<.*?>/g, ' ');
};

export const getContent = (contentMarkup) => {
    const decodedContent = decodeContent(contentMarkup);
    const noExtraSpacesContent = decodedContent.replace(/\s+/g, ' ');
    const imgUrl = getImageUrl(decodedContent);
    let textContent = '';

    if (imgUrl !== null ) {
        textContent = removeAllTags(noExtraSpacesContent).slice(0, 700) + '...';
    } else {
        textContent = removeAllTags(noExtraSpacesContent).slice(0, 1000) + '...';
    }

    return {
        imgUrl,
        textContent
    }
}