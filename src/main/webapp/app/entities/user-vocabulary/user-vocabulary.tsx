import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, TextFormat, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/utils/pagination.constants';
import { getPaginationState, overridePaginationStateWithQueryParams } from 'app/shared/utils/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './user-vocabulary.reducer';

export const UserVocabulary = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const userVocabularyList = useAppSelector(state => state.userVocabulary.entities);
  const loading = useAppSelector(state => state.userVocabulary.loading);
  const totalItems = useAppSelector(state => state.userVocabulary.totalItems);

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
    navigate,
    pageLocation.pathname,
    pageLocation.search,
    paginationState.activePage,
    paginationState.sort,
    paginationState.order,
  ]);

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort, sortEntities]);

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
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    }));
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

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
      <h2 id="user-vocabulary-heading" data-cy="UserVocabularyHeading">
        <Translate contentKey="langleagueApp.userVocabulary.home.title">User Vocabularies</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.userVocabulary.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user-vocabulary/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.userVocabulary.home.createLabel">Create new User Vocabulary</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userVocabularyList && userVocabularyList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.userVocabulary.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('remembered')}>
                  <Translate contentKey="langleagueApp.userVocabulary.remembered">Remembered</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('remembered')} />
                </th>
                <th className="hand" onClick={sort('isMemorized')}>
                  <Translate contentKey="langleagueApp.userVocabulary.isMemorized">Is Memorized</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('isMemorized')} />
                </th>
                <th className="hand" onClick={sort('lastReviewed')}>
                  <Translate contentKey="langleagueApp.userVocabulary.lastReviewed">Last Reviewed</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastReviewed')} />
                </th>
                <th className="hand" onClick={sort('reviewCount')}>
                  <Translate contentKey="langleagueApp.userVocabulary.reviewCount">Review Count</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('reviewCount')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userVocabulary.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userVocabulary.word">Word</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userVocabularyList.map((userVocabulary, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-vocabulary/${userVocabulary.id}`} color="link" size="sm">
                      {userVocabulary.id}
                    </Button>
                  </td>
                  <td>{userVocabulary.remembered ? 'true' : 'false'}</td>
                  <td>{userVocabulary.isMemorized ? 'true' : 'false'}</td>
                  <td>
                    {userVocabulary.lastReviewed ? (
                      <TextFormat type="date" value={userVocabulary.lastReviewed} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{userVocabulary.reviewCount}</td>
                  <td>
                    {userVocabulary.appUser ? <Link to={`/app-user/${userVocabulary.appUser.id}`}>{userVocabulary.appUser.id}</Link> : ''}
                  </td>
                  <td>{userVocabulary.word ? <Link to={`/word/${userVocabulary.word.id}`}>{userVocabulary.word.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user-vocabulary/${userVocabulary.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/user-vocabulary/${userVocabulary.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/user-vocabulary/${userVocabulary.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.userVocabulary.home.notFound">No User Vocabularies found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={userVocabularyList && userVocabularyList.length > 0 ? '' : 'd-none'}>
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

export default UserVocabulary;
