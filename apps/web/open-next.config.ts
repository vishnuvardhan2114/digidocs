const config = {
  default: {
    override: {
      wrapper: 'cloudflare',
      converter: 'edge',
    },
  },
  middleware: {
    external: true,
    override: {
      wrapper: 'cloudflare',
      converter: 'edge',
    },
  },
}

export default config

