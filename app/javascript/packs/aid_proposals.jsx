import React from 'react'
import ReactDOM from 'react-dom'
import LocaleProvider from '../components/LocaleProvider';
import AidProposals from '../components/aid-proposals/AidProposals';

const proposalsContainer = document.body.querySelector("#proposals_container");

ReactDOM.render(
    <LocaleProvider locale={proposalsContainer.dataset.locale}>
        <AidProposals
            action={proposalsContainer.dataset.action}
            field={proposalsContainer.dataset.field}
        />
    </LocaleProvider>,
    proposalsContainer
);

