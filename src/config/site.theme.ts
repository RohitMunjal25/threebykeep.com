import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'catalog-promo',
    eyebrow: 'Social bookmarking system',
  },
  home: {
    layout: 'market-catalog',
    primaryTask: 'sbm',
    featuredTaskKeys: ['sbm', 'article', 'pdf'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'dense',
  },
  cards: {
    listing: 'catalog-grid',
    article: 'editorial-feature',
    image: 'listing-elevated',
    profile: 'listing-elevated',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'editorial-feature',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
