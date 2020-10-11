import parse, { attributesToProps, HTMLReactParserOptions } from 'html-react-parser';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { dataFormatter, useApi } from '../context/api';
import { Block } from '../types/entities';

declare interface RegionProps {
  name: string,
}

const Region = (props: RegionProps) => {
  const { name } = props;
  const { Blocks } = useApi();
  const [blocks, setBlocks] = useState([] as Block[]);
  const location = useLocation();

  useEffect(useCallback(() => {
    Blocks
      .index({
        params: {
          regionAlias: name,
        }
      })
      .then(res => res.data)
      .then(json => {
        const blocks = dataFormatter.deserialize(json) as Block[];
        setBlocks(blocks);
      });
  }, [Blocks, name, setBlocks]), [location])

  return (
    <div className='mt-5'>
      { blocks && blocks.map(block => {
        const options: HTMLReactParserOptions = {
          replace: node => {
            // replace anchors with relative targets with Link
            if (node.attribs && node.name === 'a' && node.attribs.href[0] === '/' && !node.attribs.href.startsWith('/admin')) {
              let linkProps = attributesToProps(node.attribs)
              delete linkProps['href'];
              const linkData = node.children?.shift()?.data;
              return linkData
                ? <Link to={node.attribs.href} {...linkProps}>{linkData}</Link>
                : null;
            } else {
              return node;
            }
          }
        };
        const parsedHtml = parse(block.rendered ?? block.body, options);
        return (
          <div key={`block-${block.id}`}>{parsedHtml}</div>
        );
      })}
    </div>
  );
}

export default Region;
