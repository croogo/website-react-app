import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from 'reactstrap';
import { Post, User } from '../types/entities';

declare interface NodeCardProps {
  author?: User,
  node: Post;
  isIndex?: boolean;
  loading?: boolean;
}

const NodeCard = (props: NodeCardProps) => {
  const { node, isIndex, author } = props;

  return (
    <Card className='mb-5 no-hover'>
      <CardBody>

        <h4 className={ (isIndex ? '' : 'display-4 ') + 'card-title' }>
          { node.title }
        </h4>

        <h6 className="card-subtitle text-muted">
          { author
            ? <><small>By: </small>{ author.name } </>
            : null
          }
          <small>{ new Date(node.publishStart).toDateString() }</small>
        </h6>

        {
          isIndex
            ? <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            : <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.body }} />
        }
      </CardBody>
      { isIndex ?
        <CardFooter className='text-right'>
          <Link className='btn btn-small btn-light' to={node.path } >read more</Link>
        </CardFooter>
        : null
      }
    </Card>
  )
}

export default NodeCard;
