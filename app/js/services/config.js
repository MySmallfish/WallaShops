(function(S, WS) {
    WS.Configuration = function(utils){
        function getValue(name){
            return $("head meta[name='" + name + "']").attr("content");
        }

        var config = {
            baseUrl: getValue("base-url"),
            wsUrl: getValue("ws-url"),
            version: getValue("version")
        };
        
        return config;
    };
})(Simple, WallaShops);