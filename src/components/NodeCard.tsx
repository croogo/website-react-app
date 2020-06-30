import React from 'react';
import { Card, CardBody, CardFooter, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const NodeCard = (props: any) => {
  const { node, isIndex, author } = props;

  return (
    <Card className='mb-5 no-hover'>
      <CardBody>

        <h4 className="card-title">
          { node.attributes.title }
        </h4>

        <h6 className="card-subtitle">
          { author
            ? <><small>By: </small>{ author.attributes.name } </>
            : null
          }
          <small>{ new Date(node.attributes['publish-start']).toDateString() }</small>
        </h6>

        {
          isIndex
            ? <div className="card-text" dangerouslySetInnerHTML={{ __html: node.attributes.excerpt }} />
            : <div className="card-text" dangerouslySetInnerHTML={{ __html: node.attributes.body }} />
        }
      </CardBody>
      { isIndex ?
        <CardFooter style={{ justifyContent: 'end', display: 'flex' }}>
          <Link className='btn btn-small btn-light' to={node.attributes.path } >read more</Link>
        </CardFooter>
        : null
      }
    </Card>
  )
}

export default NodeCard;
