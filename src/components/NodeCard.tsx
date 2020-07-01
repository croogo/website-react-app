import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from 'reactstrap';

const NodeCard = (props: any) => {
  const { node, isIndex, author } = props;

  return (
    <Card className='mb-5 no-hover'>
      <CardBody>

        <h4 className={ isIndex ? '' : 'display-4 ' + 'card-title' }>
          { node.attributes.title }
        </h4>

        <h6 className="card-subtitle text-muted">
          { author
            ? <><small>By: </small>{ author.attributes.name } </>
            : null
          }
          <small>{ new Date(node.attributes['publish-start']).toDateString() }</small>
        </h6>

        {
          isIndex
            ? <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.attributes.excerpt }} />
            : <div className="card-text my-4" dangerouslySetInnerHTML={{ __html: node.attributes.body }} />
        }
      </CardBody>
      { isIndex ?
        <CardFooter className='text-right'>
          <Link className='btn btn-small btn-light' to={node.attributes.path } >read more</Link>
        </CardFooter>
        : null
      }
    </Card>
  )
}

export default NodeCard;
