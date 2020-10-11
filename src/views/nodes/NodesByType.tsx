import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Jsona, { SwitchCaseJsonMapper, SwitchCaseModelMapper } from 'jsona';
import qs from 'qs';
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import NodeCard from "../../components/NodeCard";
import PaginationLinks from "../../components/PaginationLinks";
import config from '../../config';
import { useApi } from "../../context/api";
import { ApiMeta, NodesSearchParams, Post, Type } from '../../types/entities';

const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

const NodesByType: FunctionComponent = props => {
  const { type }= useParams<NodesSearchParams>();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const { Nodes, Types } = useApi();
  const [ nodes, setNodes ] = useState([] as Post[]);
  const [ nodesMeta, setNodesMeta ] = useState({} as ApiMeta);
  const [ types, setTypes ] = useState([] as Type[]);
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
      .then(json => {
        const nodes = dataFormatter.deserialize(json) as Post[];
        setNodesMeta(json.meta);
        setNodes(nodes);
      });

    const p2 = Types
      .index({
        params: {
          alias: type,
        },
      })
      .then(res => res.data)
      .then(json => {
        const types = dataFormatter.deserialize(json) as Type[];
        if (types[0]) {
          document.title = config.site.title + ' | ' + types[0].title;
        }
        setTypes(types)
      });

    Promise.all([p1, p2])
      .finally(() => setLoading(false));

  }, [Nodes, Types, type, params, setNodes, setTypes, setLoading]), [ location ]);

  return (
    <Container>
      { types && types.length > 0
        ? <h1>{ types[0].title }
            { loading ? <>&nbsp;<FontAwesomeIcon size='sm' icon='spinner' className='fa-spin' /></> : null }
          </h1>
        : null
      }
      { nodes && nodes.map(node => {
        return <NodeCard key={`nodecard-${node.id}`} node={ node } isIndex/>
      })}

      { nodes && nodes.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodesMeta }/>
        : loading ? null : <>No { type } entry found </>
      }
    </Container>
  )
}

export default NodesByType;
