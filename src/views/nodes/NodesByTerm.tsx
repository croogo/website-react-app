import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../../context/api";
import NodeCard from "../../components/NodeCard";
import { Container } from "reactstrap";
import PaginationLinks from "../../components/PaginationLinks";
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NodesByTerm: FunctionComponent = props => {
  const { type, term }= useParams();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const { Nodes, Types } = useApi();
  const [ nodes, setNodes ] = useState({} as any);
  const [ types, setTypes ] = useState({} as any);
  const [ loading, setLoading ] = useState(false);

  const params = {
    page,
    type,
    term,
    limit: 5,
    sort: '-publish_start',
    include: 'users',
  }

  useEffect(useCallback(() => {
    setLoading(true);
    const p1 = Nodes
      .index({
        params,
      })
      .then(res => res.data)
      .then(data => {
        setNodes(data)
      });

    const p2 = Types
      .index({
        params: {
          alias: type,
        },
      })
      .then(res => res.data)
      .then(data => {
        setTypes(data)
      });

    Promise.all([p1, p2])
      .finally(() => setLoading(false));

  }, [Nodes, Types, type, params, setNodes, setTypes]), [ location ]);

  return (
    <Container>
      { types && types.data
        ? <h1>{ types.data[0].attributes.title }

          </h1>
        : null
      }

      { loading ? <FontAwesomeIcon size='3x' icon='spinner' className='fa-spin' /> : null }

      { nodes && nodes.data && nodes.data.map((node: any) => {
        return <NodeCard node={ node } isIndex/>
      })}

      { nodes && nodes.data && nodes.data.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodes.meta }/>
        : loading ? null : <>No { type } with { term } entry found </>
      }
    </Container>
  )
}

export default NodesByTerm;
