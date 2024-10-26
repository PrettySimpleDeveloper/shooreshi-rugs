export interface SearchResults {
  id: number;
  title: string;
  url: string;
  type: string;
  subtype: string;
}

export interface Children {
  children: React.ReactNode;
}

export interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{message: string}>;
}

export interface Menu {
  menuItems: {
    edges: [
      {
        node: {
          uri: string;
          label: string;
          databaseId: string;
        };
      }
    ];
  };
}

export interface FeaturedImage {
  node: {
    altText: string;
    sourceUrl: string;
    mediaDetails: {
      height: number;
      width: number;
    };
  };
}

export interface Menu {
  menuItems: {
    edges: [
      {
        node: {
          uri: string;
          label: string;
          databaseId: string;
        };
      }
    ];
  };
}

export interface Page {
  author: {
    node: {
      avatar: {
        url: string;
      };
      name: string;
    };
  };
  databaseId: string;
  date: string;
  modified: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: FeaturedImage;
  seo: {
    metaDesc: string;
    title: string;
  };
  blocks: Block[];
  translation: {
    id: string;
    blocks: Block[];
  };
}

export interface Post {
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  databaseId: string;
  date: string;
  modified: string;
  modified: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  commentCount: number;
  categories: {
    nodes: [
      {
        databaseId: string;
        name: string;
      }
    ];
  };
  tags: {
    nodes: [
      {
        databaseId: string;
        name: string;
      }
    ];
  };
  featuredImage: FeaturedImage;
  seo: {
    metaDesc: string;
    title: string;
  };
  comments: {
    nodes: [
      {
        databaseId: string;
        content: string;
        date: string;
        status: string;
        author: {
          node: {
            avatar: {
              url: string;
            };
            email: string;
            name: string;
            url: string;
          };
        };
      }
    ];
  };
  translation: {
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    databaseId: string;
    date: string;
    modified: string;
    modified: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    commentCount: number;
    categories: {
      nodes: [
        {
          databaseId: string;
          name: string;
        }
      ];
    };
    tags: {
      nodes: [
        {
          databaseId: string;
          name: string;
        }
      ];
    };
    featuredImage: FeaturedImage;
    seo: {
      metaDesc: string;
      title: string;
    };
    comments: {
      nodes: [
        {
          databaseId: string;
          content: string;
          date: string;
          status: string;
          author: {
            node: {
              avatar: {
                url: string;
              };
              email: string;
              name: string;
              url: string;
            };
          };
        }
      ];
    };
  };
}

export interface Book {
  bookFields: {
    affiliateUrl: string;
    isbn: string;
  };
  databaseId: string;
  date: string;
  modified: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: FeaturedImage;
  seo: {
    metaDesc: string;
    title: string;
  };
}

export interface AllPages {
  pages: {
    nodes: Page[];
  };
}

export interface AllPosts {
  posts: {
    nodes: Post[];
  };
}

/**
 * Nader added
 */

export interface navLink {
  databaseId: string;
  uri: string;
  label: string;
}

interface Block {
  name: string;
  originalContent?: string;
  dynamicContent?: string;
  attributes?: {
    metadata?: {
      name?: string;
    };
    content?: string;
    id?: number;
    sizeSlug?: string;
    linkDestination?: string;
    metadata?: {
      name?: string;
    };
    align?: string;
    url?: string;
    width?: number;
    height?: number;
    [key: string]: any; // To allow for additional properties
  };
  innerBlocks?: Block[];
  [key: string]: any; // To allow for additional properties
}

export interface Image {
  altText: string;
  sourceUrl: string;
  mediaDetails: {
    height: number;
    width: number;
  };
}

export interface RugFeatures {
  name: string;
  origin: string;
  width: number;
  length: number;
  numberOfKnots: string;
  idea: string;
  material: string;
  designer: string;
  productDesigner: string;
  numberOfWeavers: number;
  images: Image[];
  key: string;
  certificate: Image;
}

export interface Rug {
  author: {
    node: {
      name: string;
      avatar: {
        url: string;
      };
    };
  };
  databaseId: string;
  date: string;
  modified: string;
  modified: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  commentCount: number;
  categories: {
    nodes: [
      {
        databaseId: string;
        name: string;
      }
    ];
  };
  tags: {
    nodes: [
      {
        databaseId: string;
        name: string;
      }
    ];
  };
  featuredImage: FeaturedImage;
  seo: {
    metaDesc: string;
    title: string;
  };
  rugFeatures: RugFeatures;
  translation: {
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    databaseId: string;
    date: string;
    modified: string;
    modified: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    commentCount: number;
    categories: {
      nodes: [
        {
          databaseId: string;
          name: string;
        }
      ];
    };
    tags: {
      nodes: [
        {
          databaseId: string;
          name: string;
        }
      ];
    };
    featuredImage: FeaturedImage;
    rugFeatures: RugFeatures;
  };
}

export interface Review {
  name: string;
  review: string;
  rate: number;
}
