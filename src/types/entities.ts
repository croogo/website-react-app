import { TAnyKeyValueObject, TJsonaModel, TJsonApiBody } from "jsona/lib/JsonaTypes";

export interface NodesSearchParams {
  type?: string;
  term?: string;
  slug?: string;
}

export interface ApiMeta extends TAnyKeyValueObject {
  record_count?: number;
  page_count?: number;
  page_limit?: number;
}

export interface ApiIndex extends TJsonApiBody {
  meta: ApiMeta;
}

export interface Block extends TJsonaModel {
  id: number;
  title: string;
  alias: string;
  regionId: number;
  body: string;
  rendered: string;
}

export interface MenuItem {
  id: number;
  title: string;
  description: string;
  path: string;
  class: string;
  target: string;
  rel: string;
}

export interface Attachment {
  id: number;
  path: string;
}

export type LinkedAssets = {
  [key: string]: Attachment[],
} | [];

export interface Taxonomy {
  id: number;
  title: string;
  slug: string;
  term: Term,
}

export interface Term extends TJsonaModel {
  id: number;
  title: string;
  slug: string;
  linkedAssets: LinkedAssets;
}

export interface Type extends TJsonaModel {
  id: number;
  title: string;
  alias: string;
}

export interface Post extends TJsonaModel {
  id: number;
  title: string;
  slug: string;
  body: string;
  excerpt: string;
  publishStart: string;
  path: string;
  user?: User;
  linkedAssets: LinkedAssets;
  taxonomies?: Taxonomy[];
}

export interface User extends TJsonaModel {
  id: number;
  name: string;
}
