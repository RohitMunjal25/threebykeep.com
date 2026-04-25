export type SiteShell = 'directory' | 'editorial' | 'studio' | 'market'
export type HeroVariant = 'search-first' | 'spotlight-split' | 'gallery-mosaic' | 'catalog-promo'
export type HomeLayout = 'directory-stack' | 'editorial-rhythm' | 'studio-showcase' | 'market-catalog'
export type NavigationVariant = 'compact' | 'editorial' | 'capsule' | 'minimal'
export type FooterVariant = 'columns' | 'editorial' | 'dense' | 'minimal'
export type TaskCardVariant = 'listing-elevated' | 'editorial-feature' | 'studio-panel' | 'catalog-grid'
export type SiteTaskKey =
  | 'listing'
  | 'classified'
  | 'article'
  | 'image'
  | 'profile'
  | 'social'
  | 'pdf'
  | 'org'
  | 'sbm'
  | 'comment'

export type SiteTheme = {
  shell: SiteShell
  hero: {
    variant: HeroVariant
    eyebrow: string
  }
  home: {
    layout: HomeLayout
    primaryTask: SiteTaskKey
    featuredTaskKeys: SiteTaskKey[]
  }
  navigation: {
    variant: NavigationVariant
  }
  footer: {
    variant: FooterVariant
  }
  cards: {
    listing: TaskCardVariant
    article: TaskCardVariant
    image: TaskCardVariant
    profile: TaskCardVariant
    classified: TaskCardVariant
    pdf: TaskCardVariant
    sbm: TaskCardVariant
    social: TaskCardVariant
    org: TaskCardVariant
    comment: TaskCardVariant
  }
}

export const DEFAULT_SITE_THEME: SiteTheme = {
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
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'studio-panel',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
}

export function defineSiteTheme(partial: Partial<SiteTheme>): SiteTheme {
  return {
    ...DEFAULT_SITE_THEME,
    ...partial,
    hero: {
      ...DEFAULT_SITE_THEME.hero,
      ...partial.hero,
    },
    home: {
      ...DEFAULT_SITE_THEME.home,
      ...partial.home,
      featuredTaskKeys: partial.home?.featuredTaskKeys || DEFAULT_SITE_THEME.home.featuredTaskKeys,
    },
    navigation: {
      ...DEFAULT_SITE_THEME.navigation,
      ...partial.navigation,
    },
    footer: {
      ...DEFAULT_SITE_THEME.footer,
      ...partial.footer,
    },
    cards: {
      ...DEFAULT_SITE_THEME.cards,
      ...partial.cards,
    },
  }
}
