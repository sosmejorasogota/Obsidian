import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
  Component.PageTitle(),

  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
    ],
  }),

  Component.ConditionalRender({
    component: Component.Breadcrumbs(),
    condition: (page) => page.fileData.slug !== "index",
  }),

  Component.ArticleTitle(),
  Component.TagList(),
],
  left: [ ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
  Component.PageTitle(),

  Component.Flex({
    components: [
      {
        Component: Component.Search(),
        grow: true,
      },
    ],
  }),

  Component.Breadcrumbs(),
  Component.ArticleTitle(),
],
  left: [],
  right: [],
}
