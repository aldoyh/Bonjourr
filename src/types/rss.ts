declare namespace Rss {
    interface Sync {
        url: string
        refresh: number
        provider?: string
    }

    interface Local {
        title: string
        description: string
        link: string
        pubDate: string
        creator: string
        content: string
        image: string
    }

    interface API {
        title: string
        description: string
        link: string
        pubDate: string
        creator: string
        content: string
        image: string
    }

    type Provider = 'baidu' | 'custom'

    type Refresh = 5 | 10 | 15 | 30 | 60 | 120
}
