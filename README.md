# tableFilterable
A simple jQuery plugin to filter rows of a html table element.

## Quickstart
Insert javascript file in your html.

```html
<script type="text/javascript" src="jquery.table-filterable.js"></script>
```

Define your filter:

```javascript
$(function() {
    $('#table_id').tableFilterable({
        filters: [{
            filterSelector: '#input_id',  // selector of the filter controle (may be an input element)
            event: 'keyup',            // event that fire the filter
            filterCallback: function($tr, filterValue) { // callback wich determine if a row is shown or not
                return $tr.hasClass("show");
            },
            delay: 100 // Optional, delay in ms after which the event is fire.
        }],
        onFilterFinished: function(nbRowShown, nbRowsTotal) { //Optional, callback called at the end of filter process
            $('#num_media').text(nbRowShown+"/"+nbRowsTotal); // display the number of rows shown and the total
        }
    });
});
```

As you can see, you can filter the table with several filters.

For each filter, you have to define:

- `selector` : This is the jQuery selector of the filter controle, eg the id of an input element
- `event` : The name of the event which *fire* the filter of the table
- `callback`: function that determine if a row have to be displayed. This function must return a boolean, `true` if the row shown, `false` if the row is hidden. It takes `$tr` parameter which is the jQuery element of the row, and `filterValue` which is the value of the filter.
- `delay`: Delay in milliseconds after wich the filtering occur. Usefull if you have a huge number of rows and/or complex filters. If for examle, you filter is a `<input type="text">` and the event is `onkeypress`, filtering will block while your are typing your value. With a `delay` of 500ms, the filtering process will occur after 500ms.

When the filtering of the table is done, it calls the `onFilterFinished` callback
with the number of rows hidden and the number of total rows.


## Exemples
Exemples available at <http://wonzbak.github.io/jquery.table-filterable/>
