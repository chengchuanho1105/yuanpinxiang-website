export interface PageRoute {
  path: string
  name: string
  component: () => Promise<unknown>
  children?: PageRoute[]
  meta: {
    title: string
    description?: string
    layout?: string
    requiresAuth?: boolean
    roles?: string[]
    seo?: {
      sitemap?: boolean
      sitemapXml?: boolean
      robots?: boolean
    }
    ui?: {
      navbar?: boolean
      navbarOrder?: number
    }
  }
}

export interface PageConfig {
  name: string
  displayName: string
  routes: PageRoute[]
}
