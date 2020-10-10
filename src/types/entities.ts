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

export interface Post extends TJsonaModel {
  id: number;
  title: string;
  slug: string;
  body: string;
  publishStart: string;
  path: string;
  user?: User;
}

export interface User extends TJsonaModel {
  id: number;
  name: string;
}
