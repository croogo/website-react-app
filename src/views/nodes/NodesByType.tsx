import React, { FunctionComponent, useEffect, useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useApi } from "../../context/api";
import NodeCard from "../../components/NodeCard";
import { Container } from "reactstrap";
import PaginationLinks from "../../components/PaginationLinks";
import qs from 'qs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from '../../config';
import { NodesSearchParams } from '../../types/entities';

const NodesByType: FunctionComponent = props => {
  const { type }= useParams<NodesSearchParams>();
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
        if (data.data[0]) {
          document.title = config.site.title + ' | ' + data.data[0].attributes.title;
        }
        setTypes(data)
      });

    Promise.all([p1, p2])
      .finally(() => setLoading(false));

  }, [Nodes, Types, type, params, setNodes, setTypes, setLoading]), [ location ]);

  return (
    <Container>
      { types && types.data
        ? <h1>{ types.data[0].attributes.title }
            { loading ? <>&nbsp;<FontAwesomeIcon size='sm' icon='spinner' className='fa-spin' /></> : null }
          </h1>
        : null
      }
      { nodes && nodes.data && nodes.data.map((node: any) => {
        return <NodeCard key={`nodecard-${node.id}`} node={ node } isIndex/>
      })}

      { nodes && nodes.data && nodes.data.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodes.meta }/>
        : loading ? null : <>No { type } entry found </>
      }
    </Container>
  )
}

export default NodesByType;
