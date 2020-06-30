import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../context/api";
import NodeCard from "../../components/NodeCard";
import { Container } from "reactstrap";

const NodesBySlug: FunctionComponent = props => {
  const { type, slug } = useParams();
  const { Nodes } = useApi();
  const [ nodes, setNodes ] = useState({} as any);

  useEffect(useCallback(() => {
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
      .then(data => {
        document.title = data.data[0].attributes.title;
        setNodes(data)
      });

  }, [Nodes, type, slug, setNodes]), []);

  let author = {};
  if (nodes && nodes.included) {
    author = nodes && nodes.included.find((x: any) => x.type === 'users');
  }

  return (
    <Container>
      { nodes && nodes.data && nodes.data.map((node: any) => {
        return <NodeCard node={ node } author={ author } />
      })}
    </Container>
  )
}

export default NodesBySlug;
