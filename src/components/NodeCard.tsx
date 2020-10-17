import config from 'config';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter, CardImg } from 'reactstrap';
import { LinkedAssets, Post } from 'types/entities';

declare interface NodeCardProps {
  node: Post;
  isIndex?: boolean;
  loading?: boolean;
}

/**
 * Gets poster for node
 *
 * @param post Post
 */
export function getPoster(post: Post): string | undefined {

  const getAsset = (linkedAssets: LinkedAssets, name: string) => {
    if (!Array.isArray(linkedAssets) && typeof linkedAssets[name][0] !== undefined) {
      const path = linkedAssets[name][0].path;
      return path.startsWith('/') ? config.site.baseUrl + path : path;
    }
  }

  const postPoster = getAsset(post.linkedAssets, 'FeaturedImage');
  if (postPoster) {
    return postPoster;
  }

  const posterList = post?.taxonomies?.filter(taxonomy => {
    // when linkedAssets is empty, it return an empty array (otherwise it's an Object)
    return !Array.isArray(taxonomy.term?.linkedAssets);
  });

  if (posterList && typeof(posterList[0]) !== undefined) {
    if (posterList && posterList.length > 0) {
      return getAsset(posterList[0].term.linkedAssets, 'FeaturedImage');
    }
  }
}

const NodeCard = (props: NodeCardProps) => {
  const { node, isIndex } = props;

  const terms = node?.taxonomies?.filter(t => t.term)?.map(taxonomy => {
    const to = `/${node.nodeType.alias}/term/${taxonomy.term.slug}`;
    return (
      <Link key={`nc-link-${node.id}-${taxonomy?.term.slug }`} to={to} className='mx-1 badge badge-success no-decoration'>
        { taxonomy?.term.title}
      </Link>
    );
  })

  const poster = getPoster(node);

  return (
    <Card className='mb-5 no-hover'>
      { poster && !isIndex
        ? <CardImg className='card-img-top' src={ poster } />
        : null }

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
