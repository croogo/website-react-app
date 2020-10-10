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
import { ApiMeta, NodesSearchParams, Post } from "../../types/entities";

const dataFormatter = new Jsona({
  modelPropertiesMapper: new SwitchCaseModelMapper(),
  jsonPropertiesMapper: new SwitchCaseJsonMapper(),
})

const NodesByTerm: FunctionComponent = props => {
  const { type, term } = useParams<NodesSearchParams>();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const { Nodes, Terms } = useApi();
  const [ nodes, setNodes ] = useState([] as Post[]);
  const [ nodesMeta, setNodesMeta ] = useState({} as ApiMeta);
  const [ terms, setTerms ] = useState({} as any);
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
        const nodes = dataFormatter.deserialize(data) as Post[];
        setNodesMeta(data.meta);
        setNodes(nodes)
      });

    const p2 = Terms
      .index({
        params: {
          slug: term,
        },
      })
      .then(res => res.data)
      .then(data => {
        if (data.data[0]) {
          document.title = config.site.title + ' | ' + data.data[0].attributes.title;
        }
        setTerms(data)
      });

    Promise.all([p1, p2])
      .finally(() => setLoading(false));

  }, [Nodes, Terms, term, params, setNodes, setTerms]), [ location ]);

  return (
    <Container>
      { terms && terms.data
        ? <h1>{ terms.data[0].attributes.title }

          </h1>
        : null
      }

      { loading ? <FontAwesomeIcon size='3x' icon='spinner' className='fa-spin' /> : null }

      { nodes && nodes.map(node => {
        return <NodeCard key={`nodecard-${node.id}`} node={ node } isIndex/>
      })}

      { nodes && nodes.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodesMeta }/>
        : loading ? null : <>No { type } with { term } entry found </>
      }
    </Container>
  )
}

export default NodesByTerm;
