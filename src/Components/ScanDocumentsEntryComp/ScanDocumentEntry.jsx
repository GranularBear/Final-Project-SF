import React, { useState, useEffect } from "react";
import  { decode } from 'html-entities';

import Button from "../ButtonComp/Button";

import './ScanDocumentsEntry.scss';

const ScanDocumentsEntry = ({newsContent}) => {
    const [docText, setDocText] = useState('');
    const [imgURL, setImgURL] = useState(null);
    const { issueDate, url, title, attributes, content, source } = newsContent;
    const { text: titleText } = title;
    const { markup: contentMarkup } = content;
    const { name: sourceName } = source;
    const { isTechNews, isAnnouncement, isDigest, wordCount } = attributes;

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

    const getContent = () => {
        const decodedContent = decodeContent(contentMarkup);
        const noExtraSpacesContent = decodedContent.replace(/\s+/g, ' ');
        const imgUrl = getImageUrl(decodedContent);
        let textContent = '';

        if (imgURL !== null ) {
            textContent = removeAllTags(noExtraSpacesContent).slice(0, 700) + '...';
        } else {
            textContent = removeAllTags(noExtraSpacesContent).slice(0, 1000) + '...';
        }

        console.log(removeAllTags(decodedContent))

        setDocText(textContent);
        setImgURL(imgUrl);
    }

    useEffect(() => {
        getContent();

    }, [contentMarkup]);

    const openURL = () => {
        window.open(url, '_blank');
    }

    return (
        <div className="document-entry_container">
            <div className="document-entry_header">
                <p className="document-entry_date">
                    {new Date(issueDate).toLocaleDateString()}
                </p>
                <a className="document-entry_source-link" href={url}>
                    {sourceName}
                </a>
            </div>
            <h4 className="document-entry_title">
                {titleText}
            </h4>
            <div className="document-entry_tags-wrapper">
                {isTechNews && <div className="document-entry_tag tech-tag">Технические новости</div>}
                {isDigest && <div className="document-entry_tag digest-tag">Сводка новостей</div>}
                {isAnnouncement && <div className="document-entry_tag announcement-tag">Анонс</div>}
            </div>
            {imgURL !== null ?
                <div className="document-entry_image-wrapper">
                    <img src={imgURL} alt="news thumbnail" />
                </div>
            : ""
            }
            <div className="document-entry_text-wrapper">
                    {docText}
            </div>
            <div className="document-entry_footer">
                <Button text={'Читать в источнике'} className={'document-entry_button'} onClick={openURL} />
                <div className="document-entry_word-count">
                    {wordCount} слова
                </div>
            </div>
        </div>
    )
}

export default ScanDocumentsEntry;

