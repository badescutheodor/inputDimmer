/**
 * ========================================
 * @name    Input Dimmer Js
 * @creator Badescu Theodor<theo@btheo.com>
 * @version 1.0
 * @license http://www.apache.org/licenses/LICENSE-2.0
 * ========================================
 */ "use strict";

;(function($, window) {
    function gInputDimmer(aOpts, aCallback) {
        var t = this;

        /**
         *  Plugin options
         */ var fOpts     = {};

        /**
         * =============
         *    Methods
         * =============
         */

        /**
         * Used to bind the dimmer methods
         */
        function events()
        {
            t.each(function() {
                var $e = $(this);

                $e
                    .addClass("id-dimmable")
                    .find("input, textarea")
                    .addBack("input, textarea")
                    .bind("focusin.id-on", function() {
                        open($e, fOpts.open);
                    }).click(function(aEvent) {
                        aEvent.stopPropagation();
                    });
            });

            $(window).bind("click.id-off", function() {
                close(null, fOpts.close);
            });
        }

        /**
         * Open the dimmer
         * @param aElement
         * @param aCallback
         */
        function open(aElement, aCallback)
        {
            $("body")
                .removeClass("id-off")
                .addClass("id-on");

            aElement
                .addClass("id-dimmed" + ( aElement.css("position") === "static" ? " id-r" : "" ) );

            call(aCallback, aElement);
        }

        /**
         * Close the dimmer
         * @param aElement
         * @param aCallback
         */
        function close(aElement, aCallback)
        {
            if ( $("body").hasClass("id-on") )
            {
                $("body")
                    .removeClass("id-on")
                    .addClass("id-off");

                $(".id-dimmed")
                    .find("textarea, input")
                    .addBack("textarea, input")
                    .blur()
                    .removeClass("id-dimmed id-r");
            }

            call(aCallback);
        }

        /**
         * Destroy the inputDimmer instance
         * @param aElement
         * @param aCallback
         */
        function destroy(aElement, aCallback)
        {
            aElement.each(function() {
                var $e = $(this);

                $e
                    .removeClass("id-dimmable id-dimmed id-r")
                    .find("input, textarea")
                    .addBack("input, textarea")
                    .unbind("focusin.id-on");

                !$("body").find(".id-dimmable").length && $(window).unbind("click.id-off");
            }).promise().done(function() {
                $("body").removeClass("id-on id-off");
            });

            call(aCallback, aElement);
        }

        /**
         * Checks if an element was initialized
         * @param aElement
         * @returns {boolean}
         */
        function init(aElement)
        {
            return aElement.hasClass("id-dimmable");
        }

        /**
         * Helper function used to run callback functions
         * @param aFunction
         * @param aArgument
         * @returns {*|boolean}
         */
        function call(aFunction, aArgument)
        {
            var fArgument = aArgument || null;
            return ( aFunction && typeof(aFunction) === "function" ) && aFunction(fArgument);
        }

        /**
         * =============
         *    Options
         * =============
         */
        switch( typeof aOpts )
        {
            case "undefined":
            case "object":
            {
                fOpts = $.extend(fOpts, aOpts);
                events();
            } break;

            case "string":
            {
                switch( aOpts ) {
                    case "close":
                    case "open":
                    case "destroy":
                    {
                        init(t) ? eval(aOpts + "(t" + (aCallback ? ", aCallback)" : ")") ) : console.error("[id]: element not init.");
                    } break;

                    default:
                    {
                        console.error("[id]: invalid option %s.", aOpts)
                    } break;
                }
            } break;
        }

        return t;
    }

    /**
     *  Export as jQuery plugin
     */ $.fn.inputDimmer = gInputDimmer;

    /**
     *  Autobind plugin to objects that
     *  have class .id-dimmer
     */ $(".id-dimmer").inputDimmer();
})(jQuery, window);