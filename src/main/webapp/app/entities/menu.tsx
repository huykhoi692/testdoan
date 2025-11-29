import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/app-user">
        <Translate contentKey="global.menu.entities.appUser" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book">
        <Translate contentKey="global.menu.entities.book" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/chapter">
        <Translate contentKey="global.menu.entities.chapter" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/word">
        <Translate contentKey="global.menu.entities.word" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/word-example">
        <Translate contentKey="global.menu.entities.wordExample" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/user-vocabulary">
        <Translate contentKey="global.menu.entities.userVocabulary" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/user-grammar">
        <Translate contentKey="global.menu.entities.userGrammar" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/grammar">
        <Translate contentKey="global.menu.entities.grammar" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/grammar-example">
        <Translate contentKey="global.menu.entities.grammarExample" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-review">
        <Translate contentKey="global.menu.entities.bookReview" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/listening-exercise">
        <Translate contentKey="global.menu.entities.listeningExercise" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/speaking-exercise">
        <Translate contentKey="global.menu.entities.speakingExercise" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/reading-exercise">
        <Translate contentKey="global.menu.entities.readingExercise" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/writing-exercise">
        <Translate contentKey="global.menu.entities.writingExercise" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/listening-option">
        <Translate contentKey="global.menu.entities.listeningOption" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/reading-option">
        <Translate contentKey="global.menu.entities.readingOption" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/comment">
        <Translate contentKey="global.menu.entities.comment" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/exercise-result">
        <Translate contentKey="global.menu.entities.exerciseResult" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/chapter-progress">
        <Translate contentKey="global.menu.entities.chapterProgress" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/book-progress">
        <Translate contentKey="global.menu.entities.bookProgress" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/achievement">
        <Translate contentKey="global.menu.entities.achievement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/user-achievement">
        <Translate contentKey="global.menu.entities.userAchievement" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/learning-streak">
        <Translate contentKey="global.menu.entities.learningStreak" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/study-session">
        <Translate contentKey="global.menu.entities.studySession" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/streak-icon">
        <Translate contentKey="global.menu.entities.streakIcon" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/streak-milestone">
        <Translate contentKey="global.menu.entities.streakMilestone" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
