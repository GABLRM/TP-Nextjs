export type SponsoredProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  price: { amount: string; currencyCode: string };
  images: { url: string; altText: string | null }[];
};

// ── Internal GraphQL response shapes ────────────────────────────────────────

type RawImage = { url: string; altText: string | null };

type RawProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  vendor: string;
  tags: string[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: { node: RawImage }[] };
};

type ProductsResponse = {
  data: { products: { edges: { node: RawProduct }[] } };
};

type ProductResponse = {
  data: { productByHandle: RawProduct | null };
};

// ── Helpers ──────────────────────────────────────────────────────────────────

const ENDPOINT = "https://mock.shop/api/2024-01/graphql.json";

function mapProduct(raw: RawProduct): SponsoredProduct {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    productType: raw.productType,
    vendor: raw.vendor,
    tags: raw.tags,
    price: raw.priceRange.minVariantPrice,
    images: raw.images.edges.map((e) => e.node),
  };
}

// ── Public fetch functions ───────────────────────────────────────────────────

export async function fetchSponsoredProducts(
  count = 6
): Promise<SponsoredProduct[]> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        products(first: ${count}) {
          edges {
            node {
              id handle title description productType vendor tags
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 5) { edges { node { url altText } } }
            }
          }
        }
      }`,
    }),
    next: { revalidate: 300 },
  });

  const json = (await res.json()) as ProductsResponse;
  return json.data.products.edges.map((e) => mapProduct(e.node));
}

export async function fetchSponsoredProductByHandle(
  handle: string
): Promise<SponsoredProduct | null> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        productByHandle(handle: "${handle}") {
          id handle title description productType vendor tags
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 10) { edges { node { url altText } } }
        }
      }`,
    }),
    next: { revalidate: 300 },
  });

  const json = (await res.json()) as ProductResponse;
  const raw = json.data.productByHandle;
  return raw ? mapProduct(raw) : null;
}
