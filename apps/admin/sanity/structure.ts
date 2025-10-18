// sanity/structure.ts

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .filter('_type == "post"')
        ),
      S.divider(),
      S.listItem()
        .title('Authors')
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .filter('_type == "author"')
        ),
      S.listItem()
        .title('Categories')
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .filter('_type == "category"')
        ),
      S.listItem()
        .title('Tags')
        .child(
          S.documentTypeList('tag')
            .title('Tags')
            .filter('_type == "tag"')
        ),
    ])