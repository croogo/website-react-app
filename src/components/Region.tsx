import React, { useCallback, useEffect, useState } from 'react'
import { useApi } from '../context/api';
import { useLocation } from 'react-router-dom';

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
        return (
          <div key={ `block-${block.id}` } dangerouslySetInnerHTML={{ __html: block.attributes.rendered ?? block.attributes.body }} />
        );
      }) }
    </div>
  );
}

export default Region;
