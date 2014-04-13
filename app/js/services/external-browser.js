(function (_, S, WS) {



    WS.ExternalBrowser = ["config", function (config) {

        function openBrowser(url, options) {
            if (!options.url) {
                throw new Error("Must specify url");
            }
            var target = options.externalBrowser ? "_system" : "_blank",
                location = options.displayAddress ? "yes" : "no",
                win, CloseWindowURN = "guide://closeWindow";

            function attachClose() {
                var html = "<h1 id=\"guide-header\"><button type=\"button\" id=\"guide-close\">" + (M.Shell.getResource("Cancel")) + "</button></h1>";
                try {
                    win.insertCSS({
                        code: ".guide-header-container{ " +
                            "       position: fixed;" +
                            "       top: 0;" +
                            "       left: 0;" +
                            "       right: 0;" +
                            "       height: 48px;" +
                            "       border-bottom: solid 1px #444;" +
                            "       background-color: #EEE;" +
                            "       color: #333;" +
                            "       z-index: 1000;" +
                            "   }" +
                            "   .guide-header-container button {" +
                            "       border-radius: 4px;" +
                            "       background-color: #5489b9;" +
                            "       color: white;" +
                            "       border:none;" +
                            "       display:block;" +
                            "       position: absolute;" +
                            "       left:4px; top: 4px; bottom: 4px; " +
                            "   }"
                    });
                } catch (e) {
                    console.log("Error installing css ");
                }
                var script = "(function(){" +
                    " var headerElement = document.createElement('div');" +
                    " headerElement.className = 'guide-header-container';" +
                    " headerElement.innerHTML = '" + html + "';" +
                    " document.body.appendChild(headerElement);" +
                    " var closeButton = document.getElementById('guide-close');" +
                    " closeButton.onclick = function(event){ location.href = '" + CloseWindowURN + "'; };" +
                    " var headerText = document.getElementById('guide-header');" +
                    " var text = document.createTextNode(" + (options.header ? "'" + options.header.replace("'", "\\'") + "'" : "document.title") + ");" +
                    " headerText.appendChild(text);" +
                    "})()";
                try {
                    win.executeScript({
                        code: script
                    });
                } catch (e) {
                    console.log("Error installing js ");
                }
            }

            function openTheBrowser() {
                var result = new $q.defer();

                win = window.open(options.url, target, "location=" + location);
                win.addEventListener("loaderror", function onLoadError(event) {
                    result.reject(event.message);
                });

                win.addEventListener("loadstart", function onLoadStart(event) {
                    var urlInfo = event.url.splitUrl();
                    if (urlInfo.url === CloseWindowURN ||
                        urlInfo.url === "http://" + CloseWindowURN ||
                        urlInfo.url === "https://" + CloseWindowURN) {
                        close();
                        var args = urlInfo.queryString.extractQueryParameters();
                        result.resolve(args);
                        return false;
                    }
                });

                win.addEventListener("loadstop", function onLoadStop(event) {
                    if (!options.displayAddress) {

                        attachClose();
                    }
                });



                return result.promise;
            }

            function close() {
                if (win) {
                    win.close();
                    win = null;
                }
            }

            function isOpen() {
                return !!win;
            }

            return {
                open: open,
                close: close,
                isOpen: isOpen
            };

        }

        var wsUrl = config.wsUrl;



        function open(relativeUrl) {
            var url = encodeURI(wsUrl + relativeUrl);
            url += (url.indexOf("?") >= 0 ? "&" : "?") + "tablet=1";

            window.open(url, '_blank', 'location=yes');

            return openBrowser(url);
        };

        return {
            open: open
        };
    }];

})(_, Simple, WallaShops);


