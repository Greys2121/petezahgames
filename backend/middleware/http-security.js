export function createSecurityHeaders() {
  return (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');

    res.setHeader(
      'Content-Security-Policy',
      [
        "frame-ancestors *",
        "base-uri 'self'",
        "object-src 'none'",
        "form-action 'self'",
        "upgrade-insecure-requests",
      ].join('; ')
    );

    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=(self), display-capture=(self), interest-cohort=()'
    );

    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('X-DNS-Prefetch-Control', 'off');

    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );
    }

    next();
  };
}
