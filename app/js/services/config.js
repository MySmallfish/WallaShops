(function(S, WS) {
    WS.Configuration = function(utils){
        function getValue(name) {
            return document.querySelector("head meta[name='" + name + "']").getAttribute("content");
        }

        var config = {
            baseUrl: getValue("base-url"),
            wsUrl: getValue("ws-url"),
            version: getValue("version"),
            autoCloseAtLevel: getValue("auto-close-at-level")
        };
        
        return config;
    };
})(Simple, WallaShops);