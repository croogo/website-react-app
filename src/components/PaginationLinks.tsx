import qs from 'qs';
import React from 'react';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { ApiMeta } from 'types/entities';

const PaginationLinks = (props: ApiMeta) => {
  const { location, params, meta } = props;
  const current = params.page ? parseInt(params.page, 10) : 1;
  const firstParam = JSON.parse(JSON.stringify(params));
  delete firstParam.type;
  firstParam.page = 1;

  const pageCount = meta && meta.page_count ? meta.page_count : 9999;

  const prevParam = JSON.parse(JSON.stringify(params));
  delete prevParam.type;
  prevParam.page = current - 1 ? current - 1 : 1;

  const nextParam = JSON.parse(JSON.stringify(params));
  delete nextParam.type;
  nextParam.page = current + 1 < pageCount ? current + 1 : pageCount;

  const lastParam = JSON.parse(JSON.stringify(params));
  delete lastParam.type;
  lastParam.page = pageCount;

  const first = location.pathname + '?' + qs.stringify(firstParam);
  const prev = location.pathname + '?' + qs.stringify(prevParam);
  const next = location.pathname + '?' + qs.stringify(nextParam);
  const last = location.pathname + '?' + qs.stringify(lastParam);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>

      <Pagination size='lg'>
        <PaginationItem>
          <PaginationLink first to={first} tag={Link} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink previous to={prev} tag={Link} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink next to={next} tag={Link} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink last to={last} tag={Link} />
        </PaginationItem>
      </Pagination>

    </div>
  )
}

export default PaginationLinks;
