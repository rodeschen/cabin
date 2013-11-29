/* pagging */
// pagging service, provide a hook
// 1. (count current page * record per page + 1), and next record per page
// 2. client: fetch next range record from dataSource
// 3. Server: emit a request to service, to fetch record from server
//		3.1 service need: url, params, record-range, method


/* filter */
// filtering data from dataSource iterator
//	1. ref: http://plnkr.co/edit/PHdBhF?p=preview



/* search */
// searching service, re-create dataSource
// triggered from other element and give a dataSource, then done.


/* client sort */
// customize comparator, re-arrange dataSource
// 


/* server sort */
// sort service, re-create dataSource
// triggered from other element and give a dataSource, then done.


/* freeze */
// click table header to freeze one column
// cound multiple column 
// freezed column will move to leftest of table


/* drag and drop */
// drag column header and drop to specific position (horizontal shift)


/* editing */
// one click or double click to enter edit mode
// a method trigger save action, or focus-out auto save editing data


/* api */
// ?
