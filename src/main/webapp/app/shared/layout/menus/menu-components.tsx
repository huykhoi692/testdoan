import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const NavDropdown = (props: any) => (
  <UncontrolledDropdown nav inNavbar id={props.id} data-cy={props['data-cy']}>
    <DropdownToggle nav caret className="d-flex align-items-center">
      <FontAwesomeIcon icon={props.icon} />
      <span>{props.name}</span>
    </DropdownToggle>
    <DropdownMenu end>{props.children}</DropdownMenu>
  </UncontrolledDropdown>
);
