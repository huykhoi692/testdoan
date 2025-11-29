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

import { getEntities } from './user-grammar.reducer';

export const UserGrammar = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const userGrammarList = useAppSelector(state => state.userGrammar.entities);
  const loading = useAppSelector(state => state.userGrammar.loading);
  const totalItems = useAppSelector(state => state.userGrammar.totalItems);

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
    setPaginationState({
      ...paginationState,
      order: paginationState.order === ASC ? DESC : ASC,
      sort: p,
    });
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
      <h2 id="user-grammar-heading" data-cy="UserGrammarHeading">
        <Translate contentKey="langleagueApp.userGrammar.home.title">User Grammars</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.userGrammar.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user-grammar/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.userGrammar.home.createLabel">Create new User Grammar</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userGrammarList && userGrammarList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.userGrammar.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('remembered')}>
                  <Translate contentKey="langleagueApp.userGrammar.remembered">Remembered</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('remembered')} />
                </th>
                <th className="hand" onClick={sort('isMemorized')}>
                  <Translate contentKey="langleagueApp.userGrammar.isMemorized">Is Memorized</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('isMemorized')} />
                </th>
                <th className="hand" onClick={sort('lastReviewed')}>
                  <Translate contentKey="langleagueApp.userGrammar.lastReviewed">Last Reviewed</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastReviewed')} />
                </th>
                <th className="hand" onClick={sort('reviewCount')}>
                  <Translate contentKey="langleagueApp.userGrammar.reviewCount">Review Count</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('reviewCount')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userGrammar.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userGrammar.grammar">Grammar</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userGrammarList.map((userGrammar, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-grammar/${userGrammar.id}`} color="link" size="sm">
                      {userGrammar.id}
                    </Button>
                  </td>
                  <td>{userGrammar.remembered ? 'true' : 'false'}</td>
                  <td>{userGrammar.isMemorized ? 'true' : 'false'}</td>
                  <td>
                    {userGrammar.lastReviewed ? <TextFormat type="date" value={userGrammar.lastReviewed} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{userGrammar.reviewCount}</td>
                  <td>{userGrammar.appUser ? <Link to={`/app-user/${userGrammar.appUser.id}`}>{userGrammar.appUser.id}</Link> : ''}</td>
                  <td>{userGrammar.grammar ? <Link to={`/grammar/${userGrammar.grammar.id}`}>{userGrammar.grammar.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user-grammar/${userGrammar.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/user-grammar/${userGrammar.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/user-grammar/${userGrammar.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.userGrammar.home.notFound">No User Grammars found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={userGrammarList && userGrammarList.length > 0 ? '' : 'd-none'}>
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

export default UserGrammar;
