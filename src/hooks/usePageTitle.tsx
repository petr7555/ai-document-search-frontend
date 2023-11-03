import { useEffect } from 'react';
import { APP_NAME } from '../utils/constants';

const usePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = `${title} | ${APP_NAME}`;
  }, [title]);
};

export default usePageTitle;
