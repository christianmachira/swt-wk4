import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder polyfills
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Add other necessary polyfills
global.window = global;
global.navigator = {
  userAgent: 'node.js'
}; 