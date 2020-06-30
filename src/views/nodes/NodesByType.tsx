import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../../context/api";
import NodeCard from "../../components/NodeCard";
import { Container } from "reactstrap";
import PaginationLinks from "../../components/PaginationLinks";
import qs from 'qs';

const NodesByType: FunctionComponent = props => {
  const { type }= useParams();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const { Nodes, Types } = useApi();
  const [ nodes, setNodes ] = useState({} as any);
  const [ types, setTypes ] = useState({} as any);

  const params = {
    page,
    type,
    limit: 5,
    sort: '-publish_start',
    include: 'users',
  }

  useEffect(useCallback(() => {
    Nodes
      .index({
        params,
      })
      .then(res => res.data)
      .then(data => {
        setNodes(data)
      });

    Types
      .index({
        params: {
          alias: type,
        },
      })
      .then(res => res.data)
      .then(data => {
        setTypes(data)
      })

  }, [Nodes, Types, type, params, setNodes, setTypes]), [ location ]);

  return (
    <Container>
      { types && types.data
        ? <h1>{ types.data[0].attributes.title }</h1>
        : null
      }
      { nodes && nodes.data && nodes.data.map((node: any) => {
        return <NodeCard node={ node } isIndex/>
      })}
      <PaginationLinks location={ location } params={ params } meta={ nodes.meta }/>
    </Container>
  )
}

export default NodesByType;
