import React, {memo} from 'react';
import {CollapsibleText} from '@components'

/**
 * @props content - A record list of several headers and bodies to be grouped.
 * @interface
 */
interface CollapsibleTextListProps {
    content: Record<string, string>;
    animate?: boolean;
    offset?: number;
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
const CollapsibleTextList: React.FC<CollapsibleTextListProps> = ({content, animate, offset = 0}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}
             className="CollapsibleTextList" data-testid="CollapsibleTextList">
            {Object.entries(content).map(([header, body], index) => (
                <CollapsibleText key={index} header={header} body={body} animate={animate ?? false}
                                 offset={(offset + 1) * (index + 1)}/>
            ))}
        </div>
    );
};

export default memo(CollapsibleTextList);