import React from 'react'
import ReactDOM from 'react-dom'

import EditProposal from '../components/edit-proposal/EditProposal';
import LocaleProvider from '../components/LocaleProvider';

const editContainer = document.body.querySelector("#editContainer");

ReactDOM.render(
    <LocaleProvider locale={editContainer.dataset.locale} >
        <EditProposal
            id={editContainer?.dataset?.id}
            action={editContainer.dataset.action}
            method={editContainer.dataset.method}
        />
    </LocaleProvider>,
    editContainer
);
