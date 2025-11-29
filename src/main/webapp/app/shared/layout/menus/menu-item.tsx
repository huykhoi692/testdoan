import React from 'react';
import { DropdownItem } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IMenuItem {
  icon: IconProp;
  to: string;
  id?: string;
  'data-cy'?: string;
  children?: React.ReactNode;
}

export default ({ icon, to, id, children, ...props }: IMenuItem) => (
  <DropdownItem tag={Link} to={to} id={id} {...props}>
    <FontAwesomeIcon icon={icon} fixedWidth /> {children}
  </DropdownItem>
);
