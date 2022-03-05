import React from 'react';
import { useIntl } from 'react-intl'

const SearchField = ({ findProposals, field }) => {
    const intl = useIntl()
    return (
        <input
            id={field}
            className="search-input"
            placeholder={
                intl.formatMessage({
                    id: 'aid_proposals.index.search'
                })
            }
            onChange={(e) => { findProposals(e.target.value) }}
            type="text"
        />
    )
};

export default SearchField;