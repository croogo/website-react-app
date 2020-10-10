import React, { useCallback, useEffect, useState } from 'react'
import { useApi } from '../context/api';
import { Link, useLocation } from 'react-router-dom';
import parse, { attributesToProps } from 'html-react-parser';

declare interface RegionProps {
  name: string,
}

const Region = (props: RegionProps) => {
  const { name } = props;
  const { Blocks } = useApi();
  const [ json, setJson ] = useState([] as any);
  const location = useLocation();

  useEffect(useCallback(() => {
    Blocks
      .index({
        params: {
          regionAlias: name,
        }
      })
      .then(res => res.data)
      .then(data => {
        setJson(data);
      });
  }, [Blocks, name, setJson]), [location])

  return (
    <div className='mt-5'>
      { json.data && json.data.map((block: any) => {
        const options = {
          replace: (node: any) => {
            // replace anchors with relative targets with Link
            if (node.attribs && node.name === 'a' && node.attribs.href[0] === '/' && !node.attribs.href.startsWith('/admin')) {
              let linkProps = attributesToProps(node.attribs)
              delete linkProps['href'];
              return <Link to={ node.attribs.href } {...linkProps}>{ node.children[0].data }</Link>
            } else {
              return node;
            }
          }
        };
        const parsedHtml = parse(block.attributes.rendered ?? block.attributes.body, options);
        return (
          <div key={ `block-${block.id}` }>{ parsedHtml }</div>
        );
      }) }
    </div>
  );
}

export default Region;
