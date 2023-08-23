import React, { useState, useEffect } from "react";

import { getContent } from './Helpers';

import Button from "../ButtonComp/Button";

import './ScanDocumentsEntry.scss';

const ScanDocumentsEntry = ({newsContent, key}) => {
    const [docText, setDocText] = useState('');
    const [imgURL, setImgURL] = useState(null);
    const { issueDate, url, title, attributes, content, source } = newsContent;
    const { text: titleText } = title;
    const { markup: contentMarkup } = content;
    const { name: sourceName } = source;
    const { isTechNews, isAnnouncement, isDigest, wordCount } = attributes;

    useEffect(() => {
        const { imgUrl, textContent } = getContent(contentMarkup);
        setImgURL(imgUrl);
        setDocText(textContent);

    }, [contentMarkup]);

    const openURL = () => {
        window.open(url, '_blank');
    }

    return (
        <div key={key} className="document-entry_container">
            <div className="document-entry_header">
                <p className="document-entry_date">
                    {new Date(issueDate).toLocaleDateString()}
                </p>
                <a className="document-entry_source-link" href={url} target="_blank" rel="noreferrer">
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

