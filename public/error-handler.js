// Error handler to suppress SES_UNCAUGHT_EXCEPTION errors
(function() {
  'use strict';
  
  // Suppress SES_UNCAUGHT_EXCEPTION errors in development
  if (typeof window !== 'undefined') {
    const originalConsoleError = console.error;
    console.error = function(...args) {
      // Filter out SES_UNCAUGHT_EXCEPTION errors
      if (args.some(arg => typeof arg === 'string' && arg.includes('SES_UNCAUGHT_EXCEPTION'))) {
        return;
      }
      originalConsoleError.apply(console, args);
    };

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
      if (event.reason === null || event.reason === undefined) {
        event.preventDefault();
      }
    });

    // Handle general errors
    window.addEventListener('error', function(event) {
      if (event.error === null || event.error === undefined) {
        event.preventDefault();
      }
    });
  }
})();
