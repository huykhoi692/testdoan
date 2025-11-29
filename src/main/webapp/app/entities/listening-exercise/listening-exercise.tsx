import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/utils/pagination.constants';
import { getPaginationState, overridePaginationStateWithQueryParams } from 'app/shared/utils/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './listening-exercise.reducer';

export const ListeningExercise = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const listeningExerciseList = useAppSelector(state => state.listeningExercise.entities);
  const loading = useAppSelector(state => state.listeningExercise.loading);
  const totalItems = useAppSelector(state => state.listeningExercise.totalItems);

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
      <h2 id="listening-exercise-heading" data-cy="ListeningExerciseHeading">
        <Translate contentKey="langleagueApp.listeningExercise.home.title">Listening Exercises</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.listeningExercise.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/listening-exercise/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.listeningExercise.home.createLabel">Create new Listening Exercise</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {listeningExerciseList && listeningExerciseList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.listeningExercise.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('audioPath')}>
                  <Translate contentKey="langleagueApp.listeningExercise.audioPath">Audio Path</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('audioPath')} />
                </th>
                <th className="hand" onClick={sort('imageUrl')}>
                  <Translate contentKey="langleagueApp.listeningExercise.imageUrl">Image Url</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('imageUrl')} />
                </th>
                <th className="hand" onClick={sort('transcript')}>
                  <Translate contentKey="langleagueApp.listeningExercise.transcript">Transcript</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('transcript')} />
                </th>
                <th className="hand" onClick={sort('question')}>
                  <Translate contentKey="langleagueApp.listeningExercise.question">Question</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('question')} />
                </th>
                <th className="hand" onClick={sort('correctAnswer')}>
                  <Translate contentKey="langleagueApp.listeningExercise.correctAnswer">Correct Answer</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('correctAnswer')} />
                </th>
                <th className="hand" onClick={sort('maxScore')}>
                  <Translate contentKey="langleagueApp.listeningExercise.maxScore">Max Score</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('maxScore')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.listeningExercise.chapter">Chapter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {listeningExerciseList.map((listeningExercise, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/listening-exercise/${listeningExercise.id}`} color="link" size="sm">
                      {listeningExercise.id}
                    </Button>
                  </td>
                  <td>{listeningExercise.audioPath}</td>
                  <td>{listeningExercise.imageUrl}</td>
                  <td>{listeningExercise.transcript}</td>
                  <td>{listeningExercise.question}</td>
                  <td>{listeningExercise.correctAnswer}</td>
                  <td>{listeningExercise.maxScore}</td>
                  <td>
                    {listeningExercise.chapter ? (
                      <Link to={`/chapter/${listeningExercise.chapter.id}`}>{listeningExercise.chapter.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/listening-exercise/${listeningExercise.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/listening-exercise/${listeningExercise.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/listening-exercise/${listeningExercise.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.listeningExercise.home.notFound">No Listening Exercises found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={listeningExerciseList && listeningExerciseList.length > 0 ? '' : 'd-none'}>
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

export default ListeningExercise;
