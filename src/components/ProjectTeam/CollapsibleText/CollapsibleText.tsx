import React, {useState, ReactNode} from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Divider,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * @props header - Header title to be displayed on collapsible component.
 * @props body - Conent to be displayed on collapsible component in expanded state.
 * @interface
 */
interface CollapsibleTextProps {
    header: string;
    body?: string;
}

/**
 * CollapsibleText component.
 *
 * @param props - Props containing the body and header texts.
 *
 * @remarks
 * CollapsibleText presents a component that displays a mui Accordion expandable item.
 * Due to nesting the component stays in place.
 * If no body text is provided it cannot be expanded and no expand icon will be shown.
 *
 * @category Components
 */
const CollapsibleText: React.FC<CollapsibleTextProps> = ({header, body}) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpansion = () => {
        if (body) {
            setExpanded(!expanded);
        }
    };

    return (
        <div>
            <Accordion expanded={expanded} onChange={toggleExpansion}>
                <div>
                    <AccordionSummary
                        expandIcon={body ? <ExpandMoreIcon/> : null}
                        aria-controls="panel-content"
                        id="panel-header"
                    >
                        <Typography variant="h6">
                            {header}
                        </Typography>
                    </AccordionSummary>
                </div>
                {body && (<div>
                    <Divider variant="middle"/>
                    <AccordionDetails>
                        <Typography>
                            {body}
                        </Typography>
                    </AccordionDetails>
                </div>)}
            </Accordion>
        </div>
    );
};

export default CollapsibleText;
