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

import { getEntities } from './chapter-progress.reducer';

export const ChapterProgress = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const chapterProgressList = useAppSelector(state => state.chapterProgress.entities);
  const loading = useAppSelector(state => state.chapterProgress.loading);
  const totalItems = useAppSelector(state => state.chapterProgress.totalItems);

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
      <h2 id="chapter-progress-heading" data-cy="ChapterProgressHeading">
        <Translate contentKey="langleagueApp.chapterProgress.home.title">Chapter Progresses</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.chapterProgress.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/chapter-progress/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.chapterProgress.home.createLabel">Create new Chapter Progress</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {chapterProgressList && chapterProgressList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.chapterProgress.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('percent')}>
                  <Translate contentKey="langleagueApp.chapterProgress.percent">Percent</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('percent')} />
                </th>
                <th className="hand" onClick={sort('lastAccessed')}>
                  <Translate contentKey="langleagueApp.chapterProgress.lastAccessed">Last Accessed</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('lastAccessed')} />
                </th>
                <th className="hand" onClick={sort('completed')}>
                  <Translate contentKey="langleagueApp.chapterProgress.completed">Completed</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('completed')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.chapterProgress.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.chapterProgress.chapter">Chapter</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {chapterProgressList.map((chapterProgress, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/chapter-progress/${chapterProgress.id}`} color="link" size="sm">
                      {chapterProgress.id}
                    </Button>
                  </td>
                  <td>{chapterProgress.percent}</td>
                  <td>
                    {chapterProgress.lastAccessed ? (
                      <TextFormat type="date" value={chapterProgress.lastAccessed} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{chapterProgress.completed ? 'true' : 'false'}</td>
                  <td>
                    {chapterProgress.appUser ? (
                      <Link to={`/app-user/${chapterProgress.appUser.id}`}>{chapterProgress.appUser.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {chapterProgress.chapter ? <Link to={`/chapter/${chapterProgress.chapter.id}`}>{chapterProgress.chapter.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/chapter-progress/${chapterProgress.id}`}
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
                        to={`/chapter-progress/${chapterProgress.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/chapter-progress/${chapterProgress.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.chapterProgress.home.notFound">No Chapter Progresses found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={chapterProgressList && chapterProgressList.length > 0 ? '' : 'd-none'}>
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

export default ChapterProgress;
