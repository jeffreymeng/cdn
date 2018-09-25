/* Clipboard.js Tooltipper utility by Jeffrey Meng. Requires bootstrap 4.0.0 and clipboard.js. | MIT License | archive.jeffkmeng.com/programming/library/clipboardtooltipper/ */
window.clipboardTooltipper = {
    init: function (selector) {
        var clipboard = new ClipboardJS(selector, {
            target: function (trigger) {
                //console.log(trigger);
                return trigger;
            }
        });
        $(selector).each(function () {
            $(this).tooltip({
                trigger: "hover",
                title: "Copy to clipboard"
            });
        });
        function clearTooltip(e) {
            console.log(e.currentTarget);
            $(e.currentTarget).tooltip("hide");
            //$(e.currentTarget).removeAttr("aria-label");
            /*
            $(this).attr("data-toggle", "tooltip")
            $(this).attr("data-trigger", "hover")
            $(this).attr("title", "Copy to clipboard")
            $(this).on("mouseleave", clearTooltip);
            $(this).on("blur", clearTooltip);
            $(this).tooltip()
            */
        }

        function showTooltip(elem, msg) {
            console.log("showTooltip");
            console.log($(elem));
            console.log(elem);
            $(elem).tooltip("dispose");
            $(elem).tooltip({
                title: msg
            });
            $(elem).tooltip("show");
            setTimeout(function () {
                $(elem).tooltip("hide");
                $(elem).tooltip("dispose");
                $(elem).tooltip({
                    trigger: "hover",
                    title: "Copy to clipboard"
                });
            }, 1000)
        }

        function fallbackMessage(action) {
            var actionMsg = "";
            var actionKey = (action === "cut" ? "X" : "C");

            if (/iPhone|iPad/i.test(navigator.userAgent)) {
                actionMsg = "No support :(";
            }
            else if (/Mac/i.test(navigator.userAgent)) {
                actionMsg = "Press ⌘-" + actionKey + " to " + action;
            }
            else {
                actionMsg = "Press Ctrl-" + actionKey + " to " + action;
            }

            return actionMsg;
        }
        clipboard.on("success", function (e) {
            console.log("success")
            e.clearSelection();

            showTooltip(e.trigger, "Copied!");
        });

        clipboard.on("error", function (e) {
            showTooltip(e.trigger, fallbackMessage(e.action));
        });
    }
};