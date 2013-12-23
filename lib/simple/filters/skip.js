(function (S) {
    S.SkipFilter = function () {
        return function (input, skipCount) {
            return input.slice(skipCount);
        };
    };

})(Simple);

