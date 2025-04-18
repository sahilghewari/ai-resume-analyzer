/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    // Handle canvas and PDF.js issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
        fs: false,
        path: false,
        encoding: false,
        stream: false,
      };
    }

    // Update PDF.js configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      'pdfjs-dist': require.resolve('pdfjs-dist/legacy/build/pdf'),
      'pdfjs-dist/build/pdf.worker': require.resolve('pdfjs-dist/legacy/build/pdf.worker.min'),
    };

    // Add external dependencies
    config.externals = [...(config.externals || []), { canvas: "canvas" }];

    return config;
  },
  experimental: {
    optimizeCss: true,
  },
  output: 'standalone'
}

module.exports = nextConfig
