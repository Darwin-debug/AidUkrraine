import React from 'react'
import ReactDOM from 'react-dom'

import EditProposal from '../components/EditProposal';

const editContainer = document.body.querySelector("#editContainer");
ReactDOM.render(
    <EditProposal
        id={editContainer?.dataset?.id}
        action={editContainer.dataset.action}
        method={editContainer.dataset.method}
    />,
    editContainer
);
