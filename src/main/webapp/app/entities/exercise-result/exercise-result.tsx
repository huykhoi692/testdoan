import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/utils/pagination.constants';
import { getPaginationState, overridePaginationStateWithQueryParams } from 'app/shared/utils/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './exercise-result.reducer';

export const ExerciseResult = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const exerciseResultList = useAppSelector(state => state.exerciseResult.entities);
  const loading = useAppSelector(state => state.exerciseResult.loading);
  const totalItems = useAppSelector(state => state.exerciseResult.totalItems);

  const getAllEntities = useCallback(() => {
    dispatch(
      getEntities({
        page: paginationState.activePage - 1,
        size: paginationState.itemsPerPage,
        sort: `${paginationState.sort},${paginationState.order}`,
      }),
    );
  }, [dispatch, paginationState.activePage, paginationState.itemsPerPage, paginationState.sort, paginationState.order]);

  const sortEntities = useCallback(() => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  }, [
    getAllEntities,
    paginationState.activePage,
    paginationState.sort,
    paginationState.order,
    pageLocation.search,
    pageLocation.pathname,
    navigate,
  ]);

  useEffect(() => {
    sortEntities();
  }, [sortEntities]);

  useEffect(() => {
    const params = new URLSearchParams(pageLocation.search);
    const page = params.get('page');
    const sort = params.get(SORT);
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState(prevState => ({
        ...prevState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      }));
    }
  }, [pageLocation.search]);

  const sort = p => () => {
    setPaginationState(prevState => ({
      ...prevState,
      order: prevState.order === ASC ? DESC : ASC,
      sort: p,
    }));
  };

  const handlePagination = currentPage =>
    setPaginationState(prevState => ({
      ...prevState,
      activePage: currentPage,
    }));

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = paginationState.sort;
    const order = paginationState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    }
    return order === ASC ? faSortUp : faSortDown;
  };

  return (
    <div>
      <h2 id="exercise-result-heading" data-cy="ExerciseResultHeading">
        <Translate contentKey="langleagueApp.exerciseResult.home.title">Exercise Results</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.exerciseResult.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/exercise-result/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.exerciseResult.home.createLabel">Create new Exercise Result</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {exerciseResultList && exerciseResultList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.exerciseResult.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('exerciseType')}>
                  <Translate contentKey="langleagueApp.exerciseResult.exerciseType">Exercise Type</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('exerciseType')} />
                </th>
                <th className="hand" onClick={sort('score')}>
                  <Translate contentKey="langleagueApp.exerciseResult.score">Score</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('score')} />
                </th>
                <th className="hand" onClick={sort('userAnswer')}>
                  <Translate contentKey="langleagueApp.exerciseResult.userAnswer">User Answer</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('userAnswer')} />
                </th>
                <th className="hand" onClick={sort('submittedAt')}>
                  <Translate contentKey="langleagueApp.exerciseResult.submittedAt">Submitted At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('submittedAt')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.exerciseResult.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.exerciseResult.listeningExercise">Listening Exercise</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.exerciseResult.speakingExercise">Speaking Exercise</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.exerciseResult.readingExercise">Reading Exercise</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.exerciseResult.writingExercise">Writing Exercise</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {exerciseResultList.map((exerciseResult, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/exercise-result/${exerciseResult.id}`} color="link" size="sm">
                      {exerciseResult.id}
                    </Button>
                  </td>
                  <td>
                    <Translate contentKey={`langleagueApp.ExerciseType.${exerciseResult.exerciseType}`} />
                  </td>
                  <td>{exerciseResult.score}</td>
                  <td>{exerciseResult.userAnswer}</td>
                  <td>
                    {exerciseResult.submittedAt ? (
                      <TextFormat type="date" value={exerciseResult.submittedAt} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {exerciseResult.appUser ? <Link to={`/app-user/${exerciseResult.appUser.id}`}>{exerciseResult.appUser.id}</Link> : ''}
                  </td>
                  <td>
                    {exerciseResult.listeningExercise ? (
                      <Link to={`/listening-exercise/${exerciseResult.listeningExercise.id}`}>{exerciseResult.listeningExercise.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {exerciseResult.speakingExercise ? (
                      <Link to={`/speaking-exercise/${exerciseResult.speakingExercise.id}`}>{exerciseResult.speakingExercise.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {exerciseResult.readingExercise ? (
                      <Link to={`/reading-exercise/${exerciseResult.readingExercise.id}`}>{exerciseResult.readingExercise.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {exerciseResult.writingExercise ? (
                      <Link to={`/writing-exercise/${exerciseResult.writingExercise.id}`}>{exerciseResult.writingExercise.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/exercise-result/${exerciseResult.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/exercise-result/${exerciseResult.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() =>
                          (window.location.href = `/exercise-result/${exerciseResult.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
                        }
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="langleagueApp.exerciseResult.home.notFound">No Exercise Results found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={exerciseResultList && exerciseResultList.length > 0 ? '' : 'd-none'}>
          <div className="justify-content-center d-flex">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </div>
          <div className="justify-content-center d-flex">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={totalItems}
            />
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ExerciseResult;
