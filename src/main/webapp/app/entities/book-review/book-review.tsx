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

import { getEntities } from './book-review.reducer';

export const BookReview = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getPaginationState(pageLocation, ITEMS_PER_PAGE, 'id'), pageLocation.search),
  );

  const bookReviewList = useAppSelector(state => state.bookReview.entities);
  const loading = useAppSelector(state => state.bookReview.loading);
  const totalItems = useAppSelector(state => state.bookReview.totalItems);

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
      <h2 id="book-review-heading" data-cy="BookReviewHeading">
        <Translate contentKey="langleagueApp.bookReview.home.title">Book Reviews</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="langleagueApp.bookReview.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/book-review/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="langleagueApp.bookReview.home.createLabel">Create new Book Review</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {bookReviewList && bookReviewList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="langleagueApp.bookReview.id">ID</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('rating')}>
                  <Translate contentKey="langleagueApp.bookReview.rating">Rating</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('rating')} />
                </th>
                <th className="hand" onClick={sort('title')}>
                  <Translate contentKey="langleagueApp.bookReview.title">Title</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('title')} />
                </th>
                <th className="hand" onClick={sort('content')}>
                  <Translate contentKey="langleagueApp.bookReview.content">Content</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('content')} />
                </th>
                <th className="hand" onClick={sort('createdAt')}>
                  <Translate contentKey="langleagueApp.bookReview.createdAt">Created At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('createdAt')} />
                </th>
                <th className="hand" onClick={sort('updatedAt')}>
                  <Translate contentKey="langleagueApp.bookReview.updatedAt">Updated At</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('updatedAt')} />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.bookReview.appUser">App User</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="langleagueApp.bookReview.book">Book</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookReviewList.map((bookReview, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/book-review/${bookReview.id}`} color="link" size="sm">
                      {bookReview.id}
                    </Button>
                  </td>
                  <td>{bookReview.rating}</td>
                  <td>{bookReview.title}</td>
                  <td>{bookReview.content}</td>
                  <td>{bookReview.createdAt ? <TextFormat type="date" value={bookReview.createdAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{bookReview.updatedAt ? <TextFormat type="date" value={bookReview.updatedAt} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{bookReview.appUser ? <Link to={`/app-user/${bookReview.appUser.id}`}>{bookReview.appUser.id}</Link> : ''}</td>
                  <td>{bookReview.book ? <Link to={`/book/${bookReview.book.id}`}>{bookReview.book.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/book-review/${bookReview.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/book-review/${bookReview.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
                          (window.location.href = `/book-review/${bookReview.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`)
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
              <Translate contentKey="langleagueApp.bookReview.home.notFound">No Book Reviews found</Translate>
            </div>
          )
        )}
      </div>
      {totalItems ? (
        <div className={bookReviewList && bookReviewList.length > 0 ? '' : 'd-none'}>
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

export default BookReview;
