import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../context/api";
import NodeCard from "../../components/NodeCard";
import { Container } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NodesSearchParams } from "../../types/entities";

const NodesBySlug: FunctionComponent = props => {
  const { type, slug } = useParams<NodesSearchParams>();
  const { Nodes } = useApi();
  const [ nodes, setNodes ] = useState({} as any);
  const [ loading, setLoading ] = useState(false);

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
      .then(data => {
        document.title = data.data[0].attributes.title;
        setNodes(data);
      })
      .finally(() => setLoading(false));

  }, [Nodes, type, slug, setNodes]), []);

  let author = {};
  if (nodes && nodes.included) {
    author = nodes && nodes.included.find((x: any) => x.type === 'users');
  }

  return (
    <Container>
      { loading ? <div><FontAwesomeIcon size='3x' icon='spinner' className='fa-spin' /></div> : null }

      { nodes && nodes.data && nodes.data.map((node: any) => {
        return <NodeCard key={ `nodecard-${node.id}` } node={ node } author={ author } loading={ loading }/>
      })}
    </Container>
  )
}

export default NodesBySlug;
