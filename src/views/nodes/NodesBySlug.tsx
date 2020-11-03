import NodeCard, { getPoster } from 'components/NodeCard';
import { OpenGraph } from 'components/OpenGraph';
import { dataFormatter } from "context/api";
import { useUi } from 'context/ui';
import React, { useCallback, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { useApi } from 'react-use-api';
import { Container } from 'reactstrap';
import { NodesSearchParams, Post } from 'types/entities';

declare interface NodesBySlugProps extends RouteComponentProps {
  useCache: boolean;
}

const NodesBySlug = (props: NodesBySlugProps) => {
  const { match, useCache } = props;
  const { setLoading } = useUi();
  const { type, slug } = useParams<NodesSearchParams>();
  const pageSlug = match.path.slice(1); // fallback path
  const locale = (match.params as any)?.locale;

  const [data, { loading }] = useApi({
    url: '/nodes',
    params: {
      locale,
      type: type ?? 'page',
      slug: slug ?? pageSlug,
      limit: 1,
      sort: '-publish_start',
      include: 'users,types,taxonomies.terms,taxonomies.vocabularies',
    }
  }, { useCache })

  const nodes: Post[] = data ? dataFormatter.deserialize(data) as Post[] : [];
  const poster = nodes.length > 0 ? getPoster(nodes[0]) : undefined;

  useEffect(useCallback(() => {
    setLoading(loading);
  }, [loading, setLoading]), []);

  return (<>
    { nodes.length > 0 ?
      <OpenGraph
        title={nodes[0].title}
        ogTitle={nodes[0].title}
        ogDescription={nodes[0].excerpt}
        ogLocale={locale}
        ogUrl={nodes[0].path}
        metaDescription={nodes[0].excerpt}
        linkCanonical={nodes[0].path}
        ogImage={ poster }
        twitterCard={ poster ? 'summary_large_image' : 'summary' }
      />
      : null}
    <Container>
      {nodes && nodes.map((node) => {
        return <NodeCard key={`nodecard-${node.id}`} node={node} />
      })}
    </Container>
  </>)
}

NodesBySlug.defaultProps = {
  useCache: true,
}

export default NodesBySlug;
