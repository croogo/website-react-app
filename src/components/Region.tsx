import parse, { attributesToProps, HTMLReactParserOptions } from 'html-react-parser';
import React, { useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApi } from 'react-use-api';
import { dataFormatter } from '../context/api';
import { useUi } from '../context/ui';
import { Block } from '../types/entities';

declare interface RegionProps {
  name: string,
}

const Region = (props: RegionProps) => {
  const { name } = props;
  const { setLoading } = useUi();
  const location = useLocation();

  const [blocksPayload, {loading: blocksLoading}, request] = useApi({
    url: '/blocks',
    params: {
      regionAlias: name,
    },
  });

  const blocks: Block[] = blocksPayload ? dataFormatter.deserialize(blocksPayload) as Block[] : [];

  useEffect(() => {
    setLoading(blocksLoading);
  });

  useEffect(useCallback(() => {
    request();
  }, [request]), [location.pathname]);

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
