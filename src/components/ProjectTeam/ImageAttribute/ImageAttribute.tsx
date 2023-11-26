import React from 'react';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";

/**
 * @props imageAttributes - Array of dict of image text/title and url/source location.
 * @interface
 */
interface ImageAttributeProps {
    imageAttributes?: { text: string; url: string }[];
}

/**
 * ImageAttribute component.
 *
 * @param props - Props containing imageAttributes (title, url).
 *
 * @remarks
 * ImageAttribute presents a component that displays an image attribute notice as Typography element by reading a list of image entries.
 * With this component unnecessary code duplication will get lessened and resources can be stored centralized.
 *
 * @category Components
 */
const ImageAttribute: React.FC<ImageAttributeProps> = ({imageAttributes}) => {
    const {t} = useTranslation()

    // for test
    if (!Array.isArray(imageAttributes)) {
        return (
            <div data-testid="ImageAttribute"></div>
        );
    }

    return (
        <Typography sx={{pt: '1rem', pb: '1rem'}} variant="subtitle1" data-testid="ImageAttribute">
            {t('pages.ProjectDescription.imageSources')}
            {imageAttributes.map(({text, url}, index) => (
                <span key={index}>
                    {!url && (text)}
                    {url && (<a href={url}>{text}</a>)}
                    {index < imageAttributes?.length - 1 && ', '}
                </span>
            ))}
        </Typography>
    );
};

export default ImageAttribute;
