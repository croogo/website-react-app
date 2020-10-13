import qs from 'qs';
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import NodeCard from "../../components/NodeCard";
import PaginationLinks from "../../components/PaginationLinks";
import config from '../../config';
import { dataFormatter, useApi } from "../../context/api";
import { useUi } from '../../context/ui';
import { ApiMeta, NodesSearchParams, Post, Term } from "../../types/entities";

const NodesByTerm: FunctionComponent = props => {
  const { isLoading, setLoading } = useUi();
  const { type, term } = useParams<NodesSearchParams>();
  const location = useLocation()
  const queryString = qs.parse(location.search.slice(1))
  const { page } = queryString;
  const { Nodes, Terms } = useApi();
  const [ nodes, setNodes ] = useState([] as Post[]);
  const [ nodesMeta, setNodesMeta ] = useState({} as ApiMeta);
  const [ terms, setTerms ] = useState({} as Term[]);

  const params = {
    page,
    type,
    term,
    limit: 5,
    sort: '-publish_start',
    include: 'users,types,taxonomies.terms,taxonomies.vocabularies',
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
        const terms = dataFormatter.deserialize(data) as Term[];
        if (terms.length > 0) {
          document.title = config.site.title + ' | ' + terms[0].title;
        }
        setTerms(terms)
      });

    Promise.all([p1, p2])
      .catch(e => console.error)
      .finally(() => setLoading(false));

  }, [Nodes, Terms, term, params, setNodes, setTerms, setLoading]), [ location ]);

  return (
    <Container>
      { terms && terms.length > 0
        ? <h1>{ terms[0].title }

          </h1>
        : null
      }

      { nodes && nodes.map(node => {
        return <NodeCard key={`nodecard-${node.id}`} node={ node } isIndex/>
      })}

      { nodes && nodes.length > 0
        ? <PaginationLinks location={ location } params={ params } meta={ nodesMeta }/>
        : isLoading ? null : <>No { type } with { term } entry found </>
      }
    </Container>
  )
}

export default NodesByTerm;
