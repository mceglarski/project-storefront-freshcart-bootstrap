export interface StoreWithTagsQueryModel {
  readonly id: string;
  readonly name: string;
  readonly logoUrl: string;
  readonly distance: number;
  readonly storeTags: string[];
}
