import {Fade} from '@common/components'
import React, {memo} from 'react';
import PropTypes from 'prop-types';
import './ProjectTeamImageCollection.css';
import Slide from '@mui/material/Slide';

/**
 * @props img1Url - Image location for left picture.
 * @props img1Url - Image location for center picture.
 * @props img1Url - Image location for right picture.
 * @interface
 */
interface ImageCollectionProps {
    img1Url?: string;
    img2Url?: string;
    img3Url?: string;
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
const ImageCollection: React.FC<ImageCollectionProps> = ({img1Url, img2Url, img3Url}) => {
    if (!img1Url || !img2Url || !img3Url) {
        return (<div data-testid="NoImageCollection"/>);
    }

    return (
        <Fade in={true} easing="linear" timeout={2000}>
            <Slide direction="up" in={true} mountOnEnter unmountOnExit timeout={1000}>
                <div className="container" data-testid="ImageCollection">
                    <div className="view">
                        <div className="left">
                            <div className="img1" style={{backgroundImage: `url(${img1Url})`}} role="img"></div>
                        </div>
                        <div className="divider2" data-testid="divider2"></div>
                        <div className="middle">
                            <div className="img2" style={{backgroundImage: `url(${img2Url})`}} role="img"></div>
                        </div>
                        <div className="divider" data-testid="divider1"></div>
                        <div className="right">
                            <div className="img3" style={{backgroundImage: `url(${img3Url})`}} role="img"></div>
                        </div>
                    </div>
                </div>
            </Slide>
        </Fade>
    );
}

ImageCollection.propTypes = {
    img1Url: PropTypes.string.isRequired,
    img2Url: PropTypes.string.isRequired,
    img3Url: PropTypes.string.isRequired,
};

export default memo(ImageCollection);