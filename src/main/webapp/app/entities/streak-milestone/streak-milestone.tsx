import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { JhiItemCount, JhiPagination, Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, ITEMS_PER_PAGE, SORT } from 'app/shared/utils/pagination.constants';
import { getPaginationState, overridePaginationStateWithQueryParams } from 'app/shared/utils/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { IStreakMilestone } from 'app/shared/model/streak-milestone.model';
import { getEntities } from './streak-milestone.reducer';

export const StreakMilestone = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const streakMilestoneList = useAppSelector(state => state.streakMilestone.entities as IStreakMilestone[]);
  const loading = useAppSelector(state => state.streakMilestone.loading);
  const totalItems = useAppSelector(state => state.streakMilestone.totalItems);

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
      <h2 id="streak-milestone-heading" data-cy="StreakMilestoneHeading">
        <Translate contentKey="langleagueApp.streakMilestone.home.title">Streak Milestones</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.streakMilestone.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/streak-milestone/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.streakMilestone.home.createLabel">Create new Streak Milestone</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {streakMilestoneList && streakMilestoneList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.streakMilestone.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('milestoneDays')}>
                  <Translate contentKey="langleagueApp.streakMilestone.milestoneDays">Milestone Days</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('milestoneDays')} />
                </th>
                <th className="hand" onClick={sort('rewardName')}>
                  <Translate contentKey="langleagueApp.streakMilestone.rewardName">Reward Name</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('rewardName')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.streakMilestone.studySession">Study Session</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {streakMilestoneList.map(streakMilestone => (
                <tr key={streakMilestone.id} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/streak-milestone/${streakMilestone.id}`} color="link" size="sm">
                      {streakMilestone.id}
                    </Button>
                  </td>
                  <td>{streakMilestone.milestoneDays}</td>
                  <td>{streakMilestone.rewardName}</td>
                  <td>
                    {streakMilestone.studySession ? (
                      <Link to={`/study-session/${streakMilestone.studySession.id}`}>{streakMilestone.studySession.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/streak-milestone/${streakMilestone.id}`}
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
                        to={`/streak-milestone/${streakMilestone.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/streak-milestone/${streakMilestone.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.streakMilestone.home.notFound">No Streak Milestones found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={streakMilestoneList && streakMilestoneList.length > 0 ? '' : 'd-none'}>
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

export default StreakMilestone;
