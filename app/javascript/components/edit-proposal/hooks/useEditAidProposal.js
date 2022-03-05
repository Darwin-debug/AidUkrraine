import { useState, useEffect } from 'react';

const token = document.querySelector('[name=csrf-token]').content;

export default ({ id, action, method }) => {
    const [aidProposal, setAidProposal] = useState({});
    const [loading, setLoading] = useState(true);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (!id) {
            setLoading(false)
            return;
        }

        const getData = async () => {
            setLoading(true);
            await fetch(`/aid_proposals/${id}.json`)
                .then(res => res.json())
                .then(res => {
                    setAidProposal(res);
                    setErrors([]);
                })
                .catch(e => {
                    setErrors([{ full_message: e.toString() }]);
                    return {};
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        getData()
    }, [id]);

    const saveAidProposal = (e) => {
        e.preventDefault()
        const body = new FormData(e.target);
        body.set('_method', method)
        body.set('authenticity_token', token);
        setUpdateLoading(true);
        let statusCode;
        fetch(`${action}.json`, { method: 'post', body })
            .then(res => {
                statusCode = res.status;
                return res.json();
            })
            .then(body => {
                if (![200, 201].includes(statusCode)) {
                    setErrors(body);
                    return;
                }
                window.location = `/aid_proposals/${body.id}`
            })
            .catch(e => {
                setErrors({ common: [e] });
            })
            .finally(() => {
                setUpdateLoading(false);
            });
    }

    return {
        aidProposal: aidProposal,
        setAidProposal,
        errors,
        loading,
        updateLoading,
        saveAidProposal
    };
}