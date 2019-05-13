/* This is a mst-sql generated file */
import { types } from "mobx-state-tree"

/* #region type-def */
/**
* TodoOrderBy
*/
const TodoOrderBy = types.enumeration("TodoOrderBy", [
        "createdAt_ASC",
  "createdAt_DESC",
  "done_ASC",
  "done_DESC",
  "id_ASC",
  "id_DESC",
  "isPublished_ASC",
  "isPublished_DESC",
  "title_ASC",
  "title_DESC",
  "updatedAt_ASC",
  "updatedAt_DESC",
      ])
/* #endregion */

export { TodoOrderBy }