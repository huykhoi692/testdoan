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

import { getEntities } from './user-achievement.reducer';

export const UserAchievement = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const userAchievementList = useAppSelector(state => state.userAchievement.entities);
  const loading = useAppSelector(state => state.userAchievement.loading);
  const totalItems = useAppSelector(state => state.userAchievement.totalItems);

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
      <h2 id="user-achievement-heading" data-cy="UserAchievementHeading">
        <Translate contentKey="langleagueApp.userAchievement.home.title">User Achievements</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.userAchievement.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/user-achievement/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.userAchievement.home.createLabel">Create new User Achievement</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userAchievementList && userAchievementList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.userAchievement.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('awardedTo')}>
                  <Translate contentKey="langleagueApp.userAchievement.awardedTo">Awarded To</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('awardedTo')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userAchievement.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.userAchievement.achievement">Achievement</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userAchievementList.map((userAchievement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-achievement/${userAchievement.id}`} color="link" size="sm">
                      {userAchievement.id}
                    </Button>
                  </td>
                  <td>
                    {userAchievement.awardedTo ? (
                      <TextFormat type="date" value={userAchievement.awardedTo} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {userAchievement.appUser ? (
                      <Link to={`/app-user/${userAchievement.appUser.id}`}>{userAchievement.appUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {userAchievement.achievement ? (
                      <Link to={`/achievement/${userAchievement.achievement.id}`}>{userAchievement.achievement.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/user-achievement/${userAchievement.id}`}
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
                        to={`/user-achievement/${userAchievement.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/user-achievement/${userAchievement.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.userAchievement.home.notFound">No User Achievements found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={userAchievementList && userAchievementList.length > 0 ? '' : 'd-none'}>
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

export default UserAchievement;
