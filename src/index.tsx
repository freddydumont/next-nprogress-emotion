import React, { useRef, useEffect } from 'react';
import NProgress from 'nprogress';
import Router from 'next/router';
import { Global } from '@emotion/core';

interface NProgressContainerProps {
  /**
   * Refers to a color found in the theme eg. 'primary', 'secondary',
   * or any valid css color eg. "#fff"
   */
  color: string;
  /** Number of miliseconds to wait before showing loading bar */
  showAfterMs: number;
  /** Display a spinner with the loading bar */
  spinner: boolean;
  /** nprogress [configuration object](https://github.com/rstacruz/nprogress#configuration) */
  options?: NProgress.NProgressOptions;
}

/**
 * Theme aware drop in NProgress component.
 */
const NProgressContainer = ({
  color,
  spinner,
  showAfterMs,
  options,
}: NProgressContainerProps) => {
  const timer: React.MutableRefObject<number | undefined> = useRef();

  const routeChangeStart = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(NProgress.start, showAfterMs);
  };

  const routeChangeEnd = () => {
    window.clearTimeout(timer.current);
    NProgress.done();
  };

  useEffect(() => {
    if (options) {
      NProgress.configure(options);
    }

    Router.events.on('routeChangeStart', routeChangeStart);
    Router.events.on('routeChangeComplete', routeChangeEnd);
    Router.events.on('routeChangeError', routeChangeEnd);

    return () => {
      clearTimeout(timer.current);
      Router.events.off('routeChangeStart', routeChangeStart);
      Router.events.off('routeChangeComplete', routeChangeEnd);
      Router.events.off('routeChangeError', routeChangeEnd);
    };
  });

  return (
    <Global
      styles={theme => {
        // tries to find a corresponding color in the theme but falls back
        // to whatever color is supplied
        const themeColor: string = theme?.colors?.[color] || color;

        return {
          '#nprogress': {
            pointerEvents: 'none',
          },
          '#nprogress .bar': {
            background: themeColor,
            position: 'fixed',
            zIndex: 1031,
            top: 0,
            left: 0,
            width: '100%',
            height: '2px',
          },
          '#nprogress .peg': {
            display: 'block',
            position: 'absolute',
            right: '0px',
            width: '100px',
            height: '100%',
            boxShadow: `0 0 10px ${themeColor}, 0 0 5px ${themeColor}`,
            opacity: 1,
            transform: 'rotate(3deg) translate(0px, -4px)',
          },
          '#nprogress .spinner': {
            display: spinner ? 'block' : 'none',
            position: 'fixed',
            zIndex: 1031,
            top: '15px',
            right: '15px',
          },
          '#nprogress .spinner-icon': {
            width: '18px',
            height: '18px',
            boxSizing: 'border-box',

            border: 'solid 2px transparent',
            borderTopColor: themeColor,
            borderLeftColor: themeColor,
            borderRadius: '50%',

            animation: 'nprogress-spinner 400ms linear infinite',
          },
          '.nprogress-custom-parent': {
            overflow: 'hidden',
            position: 'relative',
          },

          '.nprogress-custom-parent #nprogress .spinner': {
            position: 'absolute',
          },

          '.nprogress-custom-parent #nprogress .bar': {
            position: 'absolute',
          },

          '@keyframes nprogress-spinner': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        };
      }}
    />
  );
};

NProgressContainer.defaultProps = {
  color: 'primary',
  showAfterMs: 300,
  spinner: true,
};

export default NProgressContainer;
