import React from 'react';

declare interface FeatureProps {
  color: string;
  icon?: string;
  title: string;
  text: string;
  imgPath?: string | undefined;
}
export const Feature = (props: FeatureProps) => {
  const { color, imgPath, text, title } = props;
  return (
    <div className="feature text-center">
      { imgPath
        ? <img alt='' src={imgPath} className='img-fluid mb-5' style={{ maxHeight: '120px' }} />
        : null
      }
      <h5 className={`text-${color}`}>{title}</h5>
      <p className="lead">{text}</p>
    </div>
  );
};

export default Feature;
