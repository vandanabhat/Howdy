angular.module( "howdy" ).provider(
    "emoticons",
    function emoticonsProvider() {
        // I am the tag name that will be used to create the HTML tag that
        // represents the emoticons in the markup. For example, <i></i>.
        var tagName = "i";
        // I am the collection of tokens that can be used to identify emoticons
        // in the plain-text content. These tokens will also be used to define
        // the CSS classes in the markup. For example, "emoticon emoticon-smile".
        var tokens = [ "smile", "smiley", "frowning" ];
        // I define the RegExp patterns that are used to search for and validate
        // emoticon tokens.
        var tokenSearchPattern = /:([\w+-]+):/g;
        //var tokenValidationPattern = /^([\w+-]+)$/i;
        // I am the base CSS class used when generating the markup.
        var baseCssClass = "emoticon";
        // I am the collection of alias values that represent emoticons. So,
        // instead of having a user enter ":smile:", maybe you want to have the
        // value, ":)" automatically work. In that case, ":)" would be an alias
        // for ":smile:".
        var aliases = [];
        // Expose the public API for the provider.
        return({
            addAlias: addAlias,
            setTagName: setTagName,
            setTokens: setTokens,
            $get: emoticons
        });
        // ---
        // PUBLIC METHODS.
        // ---
        // I allow non-token patterns to be mapped to emoticons. For example,
        // you might want to allow the ":)" pattern to be automatically mapped
        // to the ":smile:" pattern.
        // --
        // CAUTION: Alias values are use to pre-treat the plain-text input using
        // a more complex pattern. As such, they are more expensive from a
        // performance standpoint.
        function addAlias( alias, token ) {
            testAlias( alias );
            //testToken( token );
            // NOTE: I am not validating the alias-token connection at this point
            // since tokens may be changed later in the configuration phase. This
            // connection will validated during service initialization.
            aliases.push({
                text: alias,
                token: token
            });
        }
        // I allow the tag name to be overridden during the configuration phase.
        function setTagName( newTagName ) {
            tagName = newTagName;
        }
        // I allow the tokens to be overridden during the configuration phase.
        function setTokens( newTokens ) {
            // Because the tokens are located in plain-text using a regular
            // expression pattern, we need to ensure that each token adheres to
            // a particular format.
            for ( var i = 0, length = newTokens.length ; i < length ; i++ ) {
                //testToken( newTokens[ i ] );
            }
            // If we made it this far, all the new tokens are valid.
            tokens = newTokens;
        }
        // ---
        // PRIVATE METHODS.
        // ---
        // I test to make sure that the given alias is valid. If the alias is not
        // valid, an error is thrown; otherwise, returns quietly.
        function testAlias( newAlias ) {
            if ( ! newAlias.length ) {
                throw( new Error( "Alias cannot be an empty string." ) );
            }
            if ( newAlias.indexOf( " " ) !== -1 ) {
                throw( new Error( "Alias [" + newAlias + "] cannot contain white space." ) );
            }
        }
        // I test the format of the given token to make sure that it conforms to
        // the pattern we will be searching for in the text. If the token is not
        // valid, an error is thrown; otherwise, returns quietly.
        function testToken( newToken ) {
            //if ( newToken.search( tokenValidationPattern ) !== 0 ) {
            //    throw( new Error( "Token [" + newToken + "] is not a valid emoticon." ) );
            //}
        }
        // ---
        // FACTORY FUNCTION.
        // ---
        // I am the actual emoticons service.
        function emoticons() {
            // I am a hash that maps the token values to pre-composed HTML tag
            // that represents the emoticon markup.
            var tokenMap = createTokenMap( tokens, baseCssClass );
            // I am a hash that maps alias values onto token values.
            var aliasMap = createAliasMap( aliases, tokenMap );
            // I am the [more] complex pattern that is used to search for both
            // standard token values and non-standard alias tokens.
            var compoundSearchPattern = createCompoundSearchPattern( aliases );
            // Return the public API.
            return({
                injectTags: injectTags
            });
            // ---
            // PUBLIC METHODS.
            // ---
            // I take plain-text content and replace the emoticon tokens with
            // actual HTML tags that represent the graphical emotions.
            function injectTags( text ) {
                // If the text is empty, or not text, just pass it through.
                if ( ! text || ! angular.isString( text ) ) {
                    return( text );
                }
                // Search for and replace emoticon markers with HTML tags.
                var emotionalText = text.replace(
                    compoundSearchPattern,
                    function replaceMatch( $0, token, alias ) {
                        // The first part of this pattern is looking for
                        // normal tokens. This is so that we don't accidentally
                        // find alias values inside of other tokens; the tokens
                        // take precedence, like a boss.
                        if ( token ) {
                            return(
                                tokenMap.hasOwnProperty( token )
                                    ? tokenMap[ token ]
                                    : $0
                            );
                        }
                        // If we didn't find a token, then by factor of
                        // elimination, we must have found an alias. Replace it
                        // with the appropriate HTML tag.
                        // --
                        // NOTE: Since we only allow alias values that map onto
                        // known tokens, we don't have to check to see if the
                        // alias maps onto a valid token.
                        return( tokenMap[ aliasMap[ alias ] ] );
                    }
                );
                return( emotionalText );
            }
            // ---
            // PRIVATE METHODS.
            // ---
            // I create an alias map that maps alias values onto token values.
            // If the alias points to a token that is not defined, an error is
            // thrown - since alias values present a more complex pattern, I
            // will not suffer unnecessary alias values.
            function createAliasMap( aliases, tokenMap ) {
                var aliasMap = {};
                for ( var i = 0, length = aliases.length ; i < length ; i++ ) {
                    var alias = aliases[ i ];
                    //if ( ! tokenMap.hasOwnProperty( alias.token ) ) {
                    //    throw( new Error( "Alias [" + alias.text + "] does not map to a known emoticon token." ) );
                    //}
                    aliasMap[ alias.text ] = alias.token;
                }
                return( aliasMap );
            }
            // I create a RegExp object that will search for the alias values
            // in a single pattern.
            // --
            // CAUTION: The pattern will preferentially search for normal token
            // values.
            function createCompoundSearchPattern( aliases ) {
                // If there are no aliases, we can just use the core token search
                // pattern.
                if ( ! aliases.length ) {
                    return( tokenSearchPattern );
                }
                // Since we do have alias values, we need to aggregate the
                // collection so that we can collapse them all down into a single
                // regular expression pattern group.
                var aliasPatterns = [];
                for ( var i = 0, length = aliases.length ; i < length ; i++ ) {
                    aliasPatterns.push( quotePatternText( aliases[ i ].text ) );
                }
                // When we create our compound pattern, we want to give precedence
                // to the standard token search. Then, only a secondary fallback
                // do we want to allow the RegExp engine to start looking for the
                // alias values. In this case, we have the following groups:
                // --
                // $0 - matched value.
                // $1 - standard token.
                // $2 - alias value.
                return(
                    new RegExp(
                        ( tokenSearchPattern.source + "|(" + aliasPatterns.join( "|" ) + ")" ),
                        "g"
                    )
                );
            }
            // Rather than having to convert tokens to tags over and over again,
            // we can pre-compose the HTML tags during service initialization.
            // This way, we only eat that cost once. Returns a hash of tokens
            // mapped to their corresponding HTML tag.
            function createTokenMap( tokens, baseCssClass ) {
                var tagMap = {};
                for ( var i = 0, length = tokens.length ; i < length ; i++ ) {
                    var token = tokens[ i ];
                    tagMap[ token ] = createTokenTag( token, baseCssClass );
                }
                return( tagMap );
            }
            // I create an HTML tag that represents the given token.
            function createTokenTag( token, baseCssClass ) {
                // Each emoticon tag has two classes - the base class plus
                // a token-specific extension. For example: "emoticon emoticon-smile".
                var className = ( baseCssClass + " " + baseCssClass + "-" + token );
                return( "<" + tagName + " title=':" + token + ":' class='" + className + "'></" + tagName + ">" );
            }
            // I return the escaped RegExp pattern text that can be used to
            // safely create a RegExp instance, regardless of whether or not the
            // text contains "special" embedded characters.
            function quotePatternText( alias ) {
                // Escape characters that are meaningful in a RegExp context.
                return( alias.replace( /([.()+*[\]{}?-])/g, "\\$1" ) );
            }
        }
    }
);