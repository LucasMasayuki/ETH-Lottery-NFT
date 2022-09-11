export {};

declare global {
  interface Window {
    ethereum: any
  }
}

import 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    tsx?: boolean;
    global?: boolean;
  }
}