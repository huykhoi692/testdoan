import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/user-profile">
        <Translate contentKey="global.menu.entities.userProfile" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book">
        <Translate contentKey="global.menu.entities.book" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/enrollment">
        <Translate contentKey="global.menu.entities.enrollment" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/unit">
        <Translate contentKey="global.menu.entities.unit" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/vocabulary">
        <Translate contentKey="global.menu.entities.vocabulary" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/grammar">
        <Translate contentKey="global.menu.entities.grammar" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/exercise">
        <Translate contentKey="global.menu.entities.exercise" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/exercise-option">
        <Translate contentKey="global.menu.entities.exerciseOption" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/progress">
        <Translate contentKey="global.menu.entities.progress" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
