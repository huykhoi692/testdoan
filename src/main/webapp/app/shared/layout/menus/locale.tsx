import React from 'react';
import { NavDropdown } from './menu-components';
import { locales, languages } from 'app/config/translation';

export const LocaleMenu = ({ currentLocale }: { currentLocale: string }) =>
  Object.keys(languages).length > 1 ? (
    <NavDropdown icon="flag" name={currentLocale ? languages[currentLocale].name : undefined}>
      {locales.map(locale => (
        <div key={locale} className="dropdown-item" onClick={() => handleLocaleChange(locale)}>
          {languages[locale].name}
        </div>
      ))}
    </NavDropdown>
  ) : null;

const handleLocaleChange = (langKey: string) => {
  // TODO: Implement locale change
  console.log('Change locale to:', langKey);
};

export default LocaleMenu;
