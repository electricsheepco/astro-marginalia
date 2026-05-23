import { defineCollection, z } from 'astro:content';

const layerBase = z.object({
  label: z.string().optional(),
  word: z.string(),
  transliteration: z.string().optional().default(''),
  notes: z.string().optional(),
});

const sourceItem = z.object({
  backs: z.string(),
  verified: z.boolean().default(false),
  notes: z.string().optional(),
});

const primaryCitation = sourceItem.extend({
  work: z.string(),
  section: z.union([z.string(), z.number()]).optional(),
  lines: z.string().optional(),
  author: z.string().optional(),
  edition: z.string().optional(),
  url: z.string().url().optional(),
});

const referenceCitation = sourceItem.extend({
  work: z.string(),
  entry: z.union([z.string(), z.number()]).optional(),
  headword: z.string().optional(),
  volume: z.number().optional(),
  page: z.string().optional(),
  url: z.string().url().optional(),
});

const frameworkCitation = sourceItem.extend({
  work: z.string(),
  section: z.string().optional(),
  subsection: z.string().optional(),
  rule: z.union([z.string(), z.number()]).optional(),
  edition: z.string().optional(),
  url: z.string().url().optional(),
});

const scholarshipCitation = sourceItem.extend({
  author: z.string(),
  title: z.string(),
  publisher: z.string().optional(),
  year: z.number().optional(),
  pages: z.string().optional(),
  doi: z.string().optional(),
  url: z.string().url().optional(),
});

const phylogenyQuadrant = z.object({
  word: z.string(),
  context: z.string().optional(),
});

const phylogeny = z.object({
  modern: z.object({
    literary: phylogenyQuadrant,
    colloquial: phylogenyQuadrant,
    faded_form: phylogenyQuadrant.optional(),
    faded_register: phylogenyQuadrant.optional(),
  }),
  contact_lane: z.object({
    source: z.string(),
    source_gloss: z.string().optional(),
    adapted: z.string().optional(),
    parallel: phylogenyQuadrant.optional(),
  }).optional(),
});

const entryImage = z.object({
  src: z.string(),
  alt: z.string(),
  credit: z.string(),
  credit_url: z.string().optional(),
});

const entryInput = z.object({
  title: z.string(),
  display: z.string(),
  transliteration: z.string().optional().default(''),
  category: z.string(),
  status: z.enum(['draft', 'sourced', 'complete']).default('draft'),
  layers: z.object({
    origin: layerBase.extend({
      gloss: z.string().optional().default(''),
      era: z.string(),
      worldview: z.string().optional(),
    }).optional(),
    classical: layerBase.extend({
      register: z.string(),
      example: z.object({
        text: z.string(),
        source: z.string(),
        translation: z.string(),
      }).optional(),
    }).optional(),
    contact: layerBase.extend({
      source: z.string(),
      arrived: z.string(),
      influence: z.string(),
      relationship: z.enum(['displaced', 'coexists', 'specialized', 'literary-only']).default('coexists'),
    }).optional(),
    other: layerBase.extend({
      source_language: z.string(),
      source_word: z.string(),
      route: z.string().optional(),
    }).optional(),
    modern: z.object({
      colloquial: z.string(),
      literary: z.string().optional(),
      lost: z.array(z.string()).optional(),
      notes: z.string(),
    }),
  }),
  related: z.array(z.string()).optional(),
  image: entryImage.optional(),
  sources: z.object({
    primary: z.array(primaryCitation).optional(),
    references: z.array(referenceCitation).optional(),
    frameworks: z.array(frameworkCitation).optional(),
    scholarship: z.array(scholarshipCitation).optional(),
  }).optional(),
  unverified_claims: z.array(z.object({
    claim: z.string(),
    status: z.string(),
    needs: z.string(),
  })).optional(),
  phylogeny: phylogeny.optional(),
  marginalia: z.string().optional(),
});

const entries = defineCollection({
  type: 'content',
  schema: entryInput.transform((entry) => ({
    concept: entry.title,
    concept_tamil: entry.display,
    transliteration: entry.transliteration,
    thematic_cluster: entry.category,
    status: entry.status,
    layers: {
      proto_tamil: entry.layers.origin && {
        ...entry.layers.origin,
        literal_meaning: entry.layers.origin.gloss,
      },
      classical: entry.layers.classical && {
        ...entry.layers.classical,
        literary_register: entry.layers.classical.register,
      },
      sanskrit_influenced: entry.layers.contact && {
        ...entry.layers.contact,
        sanskrit_root: entry.layers.contact.source,
        what_it_brought: entry.layers.contact.influence,
      },
      other_language: entry.layers.other,
      modern: entry.layers.modern,
    },
    related: entry.related,
    image: entry.image,
    sources: entry.sources && {
      sangam: entry.sources.primary,
      dictionaries: entry.sources.references,
      grammar: entry.sources.frameworks,
      scholarship: entry.sources.scholarship,
    },
    unverified_claims: entry.unverified_claims,
    phylogeny: entry.phylogeny && {
      modern: entry.phylogeny.modern,
      sanskrit_lane: entry.phylogeny.contact_lane && {
        source: entry.phylogeny.contact_lane.source,
        source_gloss: entry.phylogeny.contact_lane.source_gloss,
        tamilised: entry.phylogeny.contact_lane.adapted,
        parallel: entry.phylogeny.contact_lane.parallel,
      },
    },
    editorial_note: entry.marginalia,
  })),
});

const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { entries, pages };
