export {};

declare global {
  interface Window {
    Pusher: any;
    Echo: any;
  }
}

declare module 'animejs' {
  export default anime;
}
