import React from 'react';
import { CollapsibleText } from '@components'

/**
 * @props content - A record list of several headers and bodies to be grouped.
 * @interface
 */
interface CollapsibleTextListProps {
    content: Record<string, string>;
}

/**
 * CollapsibleTextList component.
 *
 * @param props - Props containing the body and header texts for all entries.
 *
 * @remarks
 * CollapsibleTextList presents a component that displays a stacked list of CollapsibleText components, seperated by a small gap.
 *
 * @category Components
 */
const CollapsibleTextList: React.FC<CollapsibleTextListProps> = ({ content }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(content).map(([header, body], index) => (
                <CollapsibleText key={index} header={header} body={body} />
            ))}
        </div>
    );
};

export default CollapsibleTextList;