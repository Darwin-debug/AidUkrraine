import React from 'react';
import { useIntl } from 'react-intl';

const Proposal = ({ proposal }) => {
    const intl = useIntl();
    
    return (
        <div className="card mb-3">
            <div className="card-body">
                <div className="row">
                    <div className="col">
                        <h5 className="card-title"> {proposal.country}, {proposal.city} </h5>
                        <div className="mb-2"> {proposal.full_name} </div>
                    </div>
                    <div className="col text-center position-relative">
                        <span className="position-absolute top-50 start-50 translate-middle">{proposal.date}</span>
                    </div>
                    <div className="col position-relative">
                        <a className="position-absolute top-50 start-50 translate-middle text-dark" href={`aid_proposals/${proposal.id}`} >
                            {intl.formatMessage({
                                id: 'aid_proposals.index.proposal_details'
                            })}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proposal;