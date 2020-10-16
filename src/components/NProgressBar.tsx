import { useUi } from 'context/ui';
import React, { useEffect } from 'react';
import './NProgressBar.css';
const NProgress = require('nprogress/nprogress')

export const NProgressBar = () => {
  const { isLoading } = useUi();
  useEffect(() => {
    isLoading ? NProgress.start() : NProgress.done();
  }, [isLoading])
  return <></>;
}
