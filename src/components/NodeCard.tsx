import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Post } from '../types/entities';

declare interface NodeCardProps {
  node: Post;
  isIndex?: boolean;
  loading?: boolean;
}

const NodeCard = (props: NodeCardProps) => {
  const { node, isIndex } = props;

  const terms = node?.taxonomies?.filter(t => t.term)?.map(taxonomy => {
    const to = `/${node.nodeType.alias}/term/${taxonomy.term.slug}`;
    return (
      <Link to={to} className='mx-1 badge badge-success no-decoration'>
        { taxonomy?.term.title}
      </Link>
    );

  })

  return (
    <Card className='mb-5 no-hover'>
      <CardBody>

        <h4 className={(isIndex ? '' : 'display-4 ') + 'card-title'}>
          {node.title}
        </h4>

        <h6 className="card-subtitle text-muted">
          {node.user
            ? <><small>By: </small>{node.user.name} </>
            : null
          }
          <small>{new Date(node.publishStart).toDateString()}</small>
        </h6>

        {
          isIndex
            ? <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            : <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.body }} />
        }

        {terms && terms?.length > 0
          ? <>
            <small>Posted in:</small>
            {terms?.map(term => term)}
          </>
          : null
        }

      </CardBody>
      { isIndex ?
        <CardFooter className='text-right'>
          <Link className='btn btn-small btn-light' to={node.path} >read more</Link>
        </CardFooter>
        : null
      }
    </Card>
  )
}

export default NodeCard;
