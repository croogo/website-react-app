import NodeCard from 'components/NodeCard';
import { OpenGraph } from 'components/OpenGraph';
import PaginationLinks from 'components/PaginationLinks';
import config from 'config';
import { dataFormatter } from 'context/api';
import { useUi } from 'context/ui';
import qs from 'qs';
import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps, useLocation, useParams } from 'react-router-dom';
import { useApi } from 'react-use-api';
import { Container } from 'reactstrap';
import { ApiMeta, NodesSearchParams, Post, Type } from 'types/entities';

export interface NodesByTypeProps extends RouteComponentProps {
  useCache: boolean;
}

const NodesByType = (props: NodesByTypeProps) => {
  const { match, useCache } = props;
  const { isLoading, setLoading } = useUi();
  const { type } = useParams<NodesSearchParams>();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const locale = (match.params as any)?.locale;

  const params = {
    locale,
    page,
    type,
    limit: 5,
    sort: '-publish_start',
    include: 'users,types,taxonomies.terms,taxonomies.vocabularies',
  }

  const [nodesPayload, { loading: nodesLoading }] = useApi({
    url: '/nodes',
    params,
  }, { useCache });

  const nodes: Post[] = nodesPayload ? dataFormatter.deserialize(nodesPayload) as Post[] : [];
  const nodesMeta: ApiMeta | undefined = nodesPayload?.meta;

  const [typesPayload, { loading: typesLoading }] = useApi({
    url: '/types',
    params: {
      alias: type,
    }
  }, { useCache })

  const types: Type[] = typesPayload ? dataFormatter.deserialize(typesPayload) as Type[] : [];

  const loading = isLoading || nodesLoading || typesLoading;

  useEffect(useCallback(() => {
    setLoading(nodesLoading || typesLoading);
  }, [nodesLoading, typesLoading, setLoading]), []);

  return (<>
    { types.length > 0 ?
      <OpenGraph
        title={`${types[0].title} | ${config.site.title}`}
        linkCanonical={location.pathname} />
      : null
    }
    <Container>
      {types && types.length > 0
        ? <h1>{types[0].title}
        </h1>
        : null
      }
      {nodes && nodes.map(node => {
        return <NodeCard key={`nodecard-${node.id}`} node={node} isIndex />
      })}

      {nodes && nodes.length > 0
        ? <PaginationLinks location={location} params={params} meta={nodesMeta} />
        : loading ? null : <>No {type} entry found </>
      }
    </Container>
  </>)
}

NodesByType.defaultProps = {
  useCache: true,
}

export default NodesByType;
