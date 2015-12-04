(function ( $ ) {
   "use strict";
    /**
     * Jquery Plugin to filter rows of a table.
     * Filter type available:
     *     <input type="text" />
     *     <select></select>
     */
    $.fn.tableFilterable = function(options) {
        var settings = $.extend({}, options);

        var warn;
        if ( window.console && window.console.warn ) {
            warn = function() {
                console.warn.apply(this, arguments);
            };
        } else {
            warn = function() {};
        }

        return this.each(function() {
            var $table = $(this);

            if ($table.prop("tagName") !== "TABLE") {
                warn("tableFilterable: "+$table.prop("tagName")+ " is not a table element" );
                return;
            }
            var $rows = $table.find('tbody>tr');
            var filters = [];

            var filterTable;
            var getFilterValue;

            /**
             * Register filters.
             */
            $.each(settings.filters, function() {
                var $filterElem = $(this.selector);
                if ($filterElem.length===0) {
                    warn("tableFilterable: the selector "+this.selector+ ' return no element');
                    return;
                }
                if (typeof this.callback !== 'function') {
                    warn('tableFilterable: callback of the filter with selector '+this.selector+' is not callable');
                    return;
                }
                filters.push({
                    filter: this,
                    filterElem: $filterElem
                });
                $filterElem.on(this.event, function(e) {filterTable();});
            });

            /**
             * Return value of a filter depending of its type.
             */
            getFilterValue = function($elem) {
                var filterValue;
                var tagName = $elem.prop('tagName');
                if (tagName == 'INPUT') {
                    filterValue = $elem.val();
                } else if (tagName == 'SELECT') {
                    filterValue = $elem.find("option:selected").val();
                } else {
                    warn("tableFilterable: Can't get value's filter of type "+$elem);
                }

                return filterValue;
            };

            /**
             * Show or hide rows
             */
            filterTable = function(e) {
                $rows.each(function(i) {
                    var $tr = $(this);
                    var show = true;
                    $.each(filters, function() {
                        var filterValue = getFilterValue(this.filterElem);
                        show = show  && this.filter.callback($tr, filterValue);
                    });
                    $tr.toggle(show);
                });
            };
        });
    };
})(jQuery);
