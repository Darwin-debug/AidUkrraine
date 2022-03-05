import React from 'react';
import { useIntl } from 'react-intl'
import Errors from './Errors';
import MapInput from './MapInput';

import useEditAidProposal from './hooks/useEditAidProposal';

const EditProposal = ({ action, method, id }) => {
    const { aidProposal, errors, loading, updateLoading, setAidProposal, saveAidProposal } = useEditAidProposal({ id, action, method });
    const intl = useIntl();
    if (loading) return (
        <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    const onChange = (e) => {
        setAidProposal({
            ...aidProposal,
            [e.target.id]: e.target.value,
        });
    }

    return (
        <>
            <form id="editAidProposal" action={action} method="post" onSubmit={saveAidProposal} hidden >
                <input name="aid_proposal[lat]" value={aidProposal.lat || ''} hidden readOnly />
                <input name="aid_proposal[lng]" value={aidProposal.lng || ''} hidden readOnly />
            </form>
            <div>
                <Errors errors={errors.common} />
                <div className="mb-3">
                    <label htmlFor="full_name" className="form-label required">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.full_name'
                        })}
                    </label>
                    <input
                        form="editAidProposal"
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[full_name]"
                        id="full_name"
                        type="text"
                        value={aidProposal.full_name || ''}
                    />
                    <Errors errors={errors.full_name} />
                </div>
                <MapInput
                    id={id}
                    aidProposal={aidProposal}
                    setAidProposal={setAidProposal}
                    intl={intl}
                />
                <div className="mb-3">
                    <label htmlFor="country" className="form-label required">
                    {intl.formatMessage({
                        id: 'aid_proposals.edit.form.country'
                    })}
                    </label>
                    <input
                        form="editAidProposal"
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[country]"
                        id="country"
                        type="text"
                        value={aidProposal.country || ''}
                    />
                    <Errors errors={errors.country} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label required">
                    {intl.formatMessage({
                        id: 'aid_proposals.edit.form.city'
                    })}
                    </label>
                    <input
                        form="editAidProposal"
                        className="form-control"
                        onChange={onChange}
                        name="aid_proposal[city]"
                        id="city" type="text"
                        value={aidProposal.city || ''}
                    />
                    <Errors errors={errors.city} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.description'
                        })}
                    </label>
                    <textarea form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[description]" id="description" value={aidProposal.description || ''} />
                    <Errors errors={errors.description} />
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label required">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.url'
                        })}
                    </label>
                    <input form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[url]" id="url" type="url" value={aidProposal.url || ''} />
                    <Errors errors={errors.url} />
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label required">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.date'
                        })}
                    </label>
                    <input form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[date]" id="date" type="date" value={aidProposal.date || ''} />
                    <Errors errors={errors.date} />
                </div>
                <div className="mb-3">
                    <label htmlFor="contact" className="form-label required">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.contact'
                        })}
                    </label>
                    <textarea form="editAidProposal" className="form-control" onChange={onChange} name="aid_proposal[contact]" id="contact" value={aidProposal.contact || ''} />
                    <Errors errors={errors.contact} />
                </div>
                <div className="mb-3">
                    <button form="editAidProposal" type="submit" className="btn btn-dark me-3">
                        {
                            updateLoading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="visually-hidden">Saving...</span>
                                </>
                            ) : (
                                id ? intl.formatMessage({
                                    id: 'aid_proposals.edit.form.update'
                                }) : intl.formatMessage({
                                    id: 'aid_proposals.edit.form.register'
                                })
                            )
                        }
                    </button>
                    <a className="btn btn-outline-dark" href="/aid_proposals">
                        {intl.formatMessage({
                            id: 'aid_proposals.edit.form.back'
                        })}
                    </a>
                </div>
            </div>
        </>
    );
};

export default EditProposal;