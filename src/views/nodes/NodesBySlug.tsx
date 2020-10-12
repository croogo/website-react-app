import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container } from "reactstrap";
import NodeCard from "../../components/NodeCard";
import { dataFormatter, useApi } from "../../context/api";
import { useUi } from '../../context/ui';
import { NodesSearchParams, Post } from "../../types/entities";

const NodesBySlug = () => {
  const { setLoading } = useUi();
  const { type, slug } = useParams<NodesSearchParams>();
  const { Nodes } = useApi();
  const [ nodes, setNodes ] = useState([] as Post[]);

  useEffect(useCallback(() => {
    setLoading(true);
    Nodes
      .index({
        params: {
          type,
          slug,
          limit: 1,
          sort: '-publish_start',
          include: 'users',
        },
      })
      .then(res => res.data)
      .then(json => {
        const nodes = dataFormatter.deserialize(json) as Post[];
        document.title = nodes[0].title;
        setNodes(nodes);
      })
      .finally(() => setLoading(false));

  }, [Nodes, type, slug, setNodes, setLoading]), [type, slug]);

  return (
    <Container>
      { nodes && nodes.map((node) => {
        return <NodeCard key={ `nodecard-${node.id}` } node={ node } author={ node.user } />
      })}
    </Container>
  )
}

export default NodesBySlug;
