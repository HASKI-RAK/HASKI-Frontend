import React from 'react';
import PropTypes from 'prop-types';
import './ProjectTeamImageCollection.css';

/**
 * @props img1Url - Image location for left picture.
 * @props img1Url - Image location for center picture.
 * @props img1Url - Image location for right picture.
 * @interface
 */
interface ImageCollectionProps {
    img1Url: string;
    img2Url: string;
    img3Url: string;
}

/**
 * ImageCollection component.
 *
 * @param props - Props containing image locations for three pictures.
 *
 * @remarks
 * ImageCollection presents a component that displays an image collection of three, split by a tilted vertical separator line.
 * Just used as visual effect, nothing useful to find here.
 *
 * @category Components
 */
const ImageCollection: React.FC<ImageCollectionProps> = ({ img1Url, img2Url, img3Url }) => {
    return (
        <div className="container">
            <div className="view">
                <div className="left">
                    <div className="img1" style={{backgroundImage: `url(${img1Url})`}}></div>
                </div>
                <div className="divider2"></div>
                <div className="middle">
                    <div className="img2" style={{backgroundImage: `url(${img2Url})`}}></div>
                </div>
                <div className="divider"></div>
                <div className="right">
                    <div className="img3" style={{backgroundImage: `url(${img3Url})`}}></div>
                </div>
            </div>
        </div>
    );
}

ImageCollection.propTypes = {
    img1Url: PropTypes.string.isRequired,
    img2Url: PropTypes.string.isRequired,
    img3Url: PropTypes.string.isRequired,
};

export default ImageCollection;