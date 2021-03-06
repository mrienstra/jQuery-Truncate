/*
  JQuery Truncate (http://www.reindel.com/truncate/ | https://github.com/gravis/jQuery-Truncate/tree)
  v2.3.1 release
  Tested with jQuery 1.3
  Author : Brian Reindel
*/

jQuery.fn.truncate = function( max, settings ) {
    settings = jQuery.extend( {
        chars: /\s/,
        trail: [ "...", "" ]
    }, settings );
    var myResults = {};
    var ie = jQuery.browser.msie;
    function fixIE( o ) {
        if ( ie ) {
            o.style.removeAttribute( "filter" );
        }
    }
    var original_max = max;
    return this.each( function() {
        var $this = jQuery(this);
        var myStrOrig = $this.html().replace( /\r\n/gim, "" );
        var myStr = myStrOrig;
        var myRegEx = /<\/?[^<>]*\/?>/gim;
        var myRegExArray;
        var myRegExHash = {};
        var myResultsKey = jQuery("*").index( this );
        while ( ( myRegExArray = myRegEx.exec( myStr ) ) != null ) {
            myRegExHash[ myRegExArray.index ] = myRegExArray[ 0 ];
        }
        myStr = jQuery.trim( myStr.split( myRegEx ).join( "" ) );

        if ( myStr.length > original_max ) {
            var c;
            max = original_max;
            while (( max < myStr.length ) && ( max > 0)) {
                c = myStr.charAt( max );
                if ( c.match( settings.chars ) ) {
                    myStr = myStr.substring( 0, max );
                    break;
                }
                max--;
            }
            if ( max == 0 ) {
              myStr = myStr.substring( 0, original_max );
            }

            if ( myStrOrig.search( myRegEx ) != -1 ) {
                var endCap = 0;
                for ( eachEl in myRegExHash ) {
                    myStr = [ myStr.substring( 0, eachEl ), myRegExHash[ eachEl ], myStr.substring( eachEl, myStr.length ) ].join( "" );
                    if ( eachEl < myStr.length ) {
                        endCap = myStr.length;
                    }
                }
                $this.html( [ myStr.substring( 0, endCap ), myStr.substring( endCap, myStr.length ).replace( /<(\w+)[^>]*>.*<\/\1>/gim, "" ).replace( /<(br|hr|img|input)[^<>]*\/?>/gim, "" ) ].join( "" ) );
            } else {
                $this.html( myStr );
            }
            myResults[ myResultsKey ] = myStrOrig;
            $this.html( [ "<div class='truncate_less'>", $this.html(), settings.trail[ 0 ], "</div>" ].join( "" ) )
            .find(".truncate_show",this).click( function() {
                if ( $this.find( ".truncate_more" ).length == 0 ) {
                    $this.append( [ "<div class='truncate_more' style='display: none;'>", myResults[ myResultsKey ], settings.trail[ 1 ], "</div>" ].join( "" ) )
                    .find( ".truncate_hide" ).click( function() {
                        $this.find( ".truncate_more" ).css( "background", "#fff" ).fadeOut( "normal", function() {
                            $this.find( ".truncate_less" ).css( "background", "#fff" ).fadeIn( "normal", function() {
                                fixIE( this );
                                $(this).css( "background", "none" );
                            });
                            fixIE( this );
                        });
                        return false;
                    });
                }
                $this.find( ".truncate_less" ).fadeOut( "normal", function() {
                    $this.find( ".truncate_more" ).fadeIn( "normal", function() {
                        fixIE( this );
                    });
                    fixIE( this );
                });
                jQuery(".truncate_show",$this).click( function() {
                    $this.find( ".truncate_less" ).css( "background", "#fff" ).fadeOut( "normal", function() {
                        $this.find( ".truncate_more" ).css( "background", "#fff" ).fadeIn( "normal", function() {
                            fixIE( this );
                            $(this).css( "background", "none" );
                        });
                        fixIE( this );
                    });
                    return false;
                });
                return false;
            });
        }
    });
};
