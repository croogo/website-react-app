import React, { useCallback, useEffect } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";
import { useApi } from 'react-use-api';
import { Container } from "reactstrap";
import NodeCard from "../../components/NodeCard";
import { dataFormatter } from "../../context/api";
import { useUi } from '../../context/ui';
import { NodesSearchParams, Post } from "../../types/entities";

const NodesBySlug = (props?: RouteComponentProps) => {
  const { setLoading } = useUi();
  const { type, slug } = useParams<NodesSearchParams>();
  const pageSlug = props?.match.path.slice(1); // fallback path

  const [data, { loading }] = useApi({
    url: '/nodes',
    params: {
      type: type ?? 'page',
      slug: slug ?? pageSlug,
      limit: 1,
      sort: '-publish_start',
      include: 'users,types,taxonomies.terms,taxonomies.vocabularies',
    }
  }, { useCache: true })

  const nodes: Post[] = data ? dataFormatter.deserialize(data) as Post[] : [];

  useEffect(useCallback(() => {
    setLoading(loading);
    if (nodes.length > 0) document.title = nodes[0].title;
  }, [loading, nodes, setLoading]), []);

  return (
    <Container>
      { nodes && nodes.map((node) => {
        return <NodeCard key={ `nodecard-${node.id}` } node={ node } />
      })}
    </Container>
  )
}

export default NodesBySlug;
