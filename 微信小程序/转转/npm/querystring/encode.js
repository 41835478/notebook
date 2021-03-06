var stringifyPrimitive = function(e) {
    switch (typeof e) {
      case "string":
        return e;

      case "boolean":
        return e ? "true" : "false";

      case "number":
        return isFinite(e) ? e : "";

      default:
        return "";
    }
};

module.exports = function(e, i, n, t) {
    return i = i || "&", n = n || "=", null === e && (e = void 0), "object" == typeof e ? Object.keys(e).map(function(t) {
        var r = encodeURIComponent(stringifyPrimitive(t)) + n;
        return Array.isArray(e[t]) ? e[t].map(function(e) {
            return r + encodeURIComponent(stringifyPrimitive(e));
        }).join(i) : r + encodeURIComponent(stringifyPrimitive(e[t]));
    }).join(i) : t ? encodeURIComponent(stringifyPrimitive(t)) + n + encodeURIComponent(stringifyPrimitive(e)) : "";
};