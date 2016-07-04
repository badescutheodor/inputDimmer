/**
 * ========================================
 * @name    Input Dimmer Js
 * @creator Badescu Theodor<theo@btheo.com>
 * @version 0.1b
 * @license http://www.apache.org/licenses/LICENSE-2.0
 * ========================================
 */ 'use strict';

(function($) {
    function gInputDimmer(aOpts) {
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
        function bindEvents()
        {
            t.each(function() {
                var $e = $(this);

                $e.addClass("id-dimmable");

                $e.find("input, textarea").addBack("input, textarea").focusin(function() {
                    dim("open", $e);
                });

                $e.click(function(aEvent) {
                    aEvent.stopPropagation();
                });
            });


            $(window).click(function() {
                dim("close");
            });
        }

        /**
         * The method that deals with
         * the screen dimming
         * @param aMode
         * @param aElement
         */
        function dim(aMode, aElement)
        {
            switch(aMode)
            {
                case "open":
                {
                    $("body").removeClass("id-off").addClass("id-on");
                    aElement.addClass("id-dimmed");
                    ( "opened" in fOpts && typeof(fOpts.opened) === "function" ) && fOpts.opened(aElement);
                } break;

                case "close":
                {
                    if ( $("body").hasClass("id-on") )
                    {
                        $("body").removeClass("id-on").addClass("id-off");
                        $(".id-dimmed").removeClass("id-dimmed");
                        t.fIsDimmed = false;
                        ( "closed" in fOpts && typeof(fOpts.closed) === "function" ) && fOpts.closed();
                    }
                } break;
            }
        }

        /**
         * Checks if an element was initialized
         * @param aElement
         * @returns {boolean}
         */
        function isInit(aElement)
        {
            return aElement.hasClass("id-dimmable");
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
                bindEvents();
            } break;

            case "string":
            {
                switch( aOpts ) {
                    case "close":
                    case "open":
                    {
                        if ( isInit(t) )
                        {
                            dim(aOpts, t);
                        } else
                        {
                            console.error("[inputDimmer]: Dimmer not initialized on element.");
                        }
                    } break;

                    default:
                    {
                        console.error("[inputDimmer]: No option with name '%s' found.", aOpts)
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
})(jQuery);