import React from 'react';
import SearchField from './SearchField';
import ProposalsList from './ProposalsList';

import useAidProposals from './hooks/useAidProposals';

const AidProposals = ({ action, field }) => {
    const { proposals, findProposals, loading } = useAidProposals({ action, field })

    return (
        <>
            <div className="row mb-3">
                <div className="col" ></div>
                <div className="col" ></div>
                <div className="col align-self-end">
                    <SearchField field={field} findProposals={findProposals} />
                </div>
            </div>
            <div>
                <ProposalsList proposals={proposals} loading={loading} />
            </div>
        </>
    )
}

export default AidProposals;