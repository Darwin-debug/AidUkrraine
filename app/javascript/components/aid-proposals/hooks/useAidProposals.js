import { useState, useEffect } from 'react';
import debounce from 'lodash/debounce';

export default ({ action, field }) => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const findProposals = (value = '') => {
        setLoading(true);
        const url = `${action}?${field}=${encodeURIComponent(value)}`;
        fetch(url)
            .then((response) => response.json())
            .then(result => setProposals(result))
            .finally(() => {
                setLoading(false)
            });
    }

    useEffect(() => {
        findProposals();
    }, [])
    
    return {
        loading, proposals, findProposals: debounce(findProposals, 300),
    }
}