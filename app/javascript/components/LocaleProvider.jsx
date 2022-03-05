import React from 'react';
import { IntlProvider } from 'react-intl'

import messages from '../../../translates.json';
import { DEFAULT_LOCALE } from '../constants';

const LocaleProvider = ({ locale = DEFAULT_LOCALE, children }) => (
    <IntlProvider messages={messages[locale]} locale={locale} defaultLocale={DEFAULT_LOCALE} >
        {children}
    </IntlProvider>
);

export default LocaleProvider;