export type ID = string;

export interface ArticleDependencies {
  id: ID;
  dependsOn: Array<ID>;
}
