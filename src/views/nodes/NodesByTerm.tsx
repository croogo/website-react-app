import qs from 'qs';
import React, { FunctionComponent, useCallback, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useApi } from 'react-use-api';
import { Container } from "reactstrap";
import NodeCard from "../../components/NodeCard";
import PaginationLinks from "../../components/PaginationLinks";
import config from '../../config';
import { dataFormatter } from "../../context/api";
import { useUi } from '../../context/ui';
import { ApiMeta, NodesSearchParams, Post, Term } from "../../types/entities";

const NodesByTerm: FunctionComponent = props => {
  const { isLoading, setLoading } = useUi();
  const { type, term } = useParams<NodesSearchParams>();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;

  const params = {
    page,
    type,
    term,
    limit: 5,
    sort: '-publish_start',
    include: 'users,types,taxonomies.terms,taxonomies.vocabularies',
  }

  const [nodesPayload, { loading: nodesLoading}] = useApi({
    url: '/nodes',
    params
  });

  const nodes: Post[] = nodesPayload ? dataFormatter.deserialize(nodesPayload) as Post[]: [];
  const nodesMeta: ApiMeta | undefined = nodesPayload?.meta;

  const [termsPayload, { loading: termsLoading}] = useApi({
    url: '/terms',
    params: {
    slug: term,
    },
  });

  const terms: Term[] = termsPayload ? dataFormatter.deserialize(termsPayload) as Term[]: [];

  useEffect(useCallback(() => {
    if (terms.length > 0) {
      document.title = config.site.title + ' | ' + terms[0].title;
    }
    setLoading(nodesLoading || termsLoading);
  }, [nodesLoading, terms, termsLoading, setLoading]), []);

  return (
    <Container>
      { terms && terms.length > 0
        ? <h1>{ terms[0].title }

          </h1>
        : null
      }

      { nodes && nodes.map(node => {
        return <NodeCard key={`nodecard-${node.id}`} node={ node } isIndex/>
      })}

      { nodes && nodes.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodesMeta }/>
        : isLoading ? null : <>No { type } with { term } entry found </>
      }
    </Container>
  )
}

export default NodesByTerm;
