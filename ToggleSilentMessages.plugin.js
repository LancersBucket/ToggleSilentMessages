/**
 * @name ToggleSilentMessages
 * @displayName ToggleSilentMessages
 * @description Adds a button to toggle sending silent messages
 * @author LancersBucket
 * @authorId 355477882082033664
 * @version 1.0.1
 * @source https://github.com/LancersBucket/ToggleSilentMessages
 * @updateUrl https://raw.githubusercontent.com/LancersBucket/ToggleSilentMessages/refs/heads/main/ToggleSilentMessages.plugin.js
 */
/*@cc_on
@if (@_jscript)

var shell = WScript.CreateObject("WScript.Shell");
shell.Popup("It looks like you've mistakenly tried to run me directly. That's not how you install plugins. \n(So don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);

@else@*/

/* @module @api */
const BD = new BdApi("ToggleSilentMessages");
const { getByKeys } = BD.Webpack;

const MessageActions = getByKeys("sendMessage");

module.exports = class ToggleSilentMessages {
    constructor() {
        this.container = null;
        this.isEnabled = false;
    }

    start() {
        this.addButton();
    }

    stop() {
        this.removeButton();
    }

    addButton() {
        // Look for the container where the button should be added
        const observer = new MutationObserver(() => {
            const buttonContainer = document.querySelector("[class*='channelTextArea_'] [class*='inner_'] [class*='buttons_']");
    
            if (buttonContainer && !this.container) {
                console.log("Added button container.");
                this.createButton(buttonContainer);
            }
    
            // If the button disappears, add it back
            const button = document.querySelector(".silentTypingContainer");
            if (!button) {
                //console.log("Button removed, adding it back.");
                this.createButton(buttonContainer);
            }
        });
    
        // Watch for childList changes on the entire body to handle random UI updates
        observer.observe(document.body, { childList: true, subtree: true });
    
        // Add an event listener to detect when the button is removed explicitly
        document.body.addEventListener("DOMNodeRemoved", (event) => {
            if (event.target === this.container) {
                //console.log("Button manually removed from DOM.");
                this.createButton(document.querySelector("[class*='channelTextArea_'] [class*='inner_'] [class*='buttons_']"));
            }
        });
    }
    
    removeButton() {
        if (this.container) {
            this.container.remove();
            this.container = null;
            console.log("Removed");
        }
    }

    createButton(container) {
        this.container = document.createElement("div");
        this.container.style.display = "flex";
        this.container.className = "silentTypingContainer";
        this.container.style.alignItems = "center";
        this.container.style.verticalAlign = "center";

        this.button = document.createElement("button");
        this.button.setAttribute("type", "button");
        this.button.className = "silentTypingButton";
        this.button.style.background = "transparent";
        this.button.style.width = "auto"
        this.button.style.marginTop = "4px"
    
        this.contentsDiv = document.createElement("div");
        this.contentsDiv.className = "silentTypingContents";
        this.contentsDiv.style.margin = "auto"
    
        this.wrapperDiv = document.createElement("div");
        this.wrapperDiv.className = "silentTypingWrapper";
        this.wrapperDiv.style.transform = "none";
    
        this.iconContainer = document.createElement("div");
        this.iconContainer.className = "silentTypingIcon";
    
        // Add an SVG icon
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.svg.setAttribute("aria-hidden", "true");
        this.svg.setAttribute("role", "img");
        this.svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        this.svg.setAttribute("width", "24");
        this.svg.setAttribute("height", "24");
        this.svg.setAttribute("fill", "none");
        this.svg.setAttribute("viewBox", "0 0 24 24");
    
        this.zzz = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.zzz.setAttribute("fill", "var(--interactive-normal)");
        this.zzz.setAttribute("fill-rule", "evenodd");
        this.zzz.setAttribute("clip-rule", "evenodd");
        this.zzz.setAttribute(
            "d",
            "M22.07 3.29 18.68 7h2.82c.28 0 .5.23.5.5v1a.5.5 0 0 1-.5.5h-5.33a.5.5 0 0 1-.5-.5v-1a1 1 0 0 1 .21-.63l1.1-1.38 1.99-2.5H16.5a.5.5 0 0 1-.5-.5V1.5c0-.28.22-.5.5-.5h5.33c.28 0 .5.22.5.5v1.11a1 1 0 0 1-.26.68Z"
        );

        this.bellzzz = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.bellzzz.setAttribute("fill", "var(--interactive-normal)");
        this.bellzzz.setAttribute(
            "d",
            "M19 11.5a.5.5 0 0 0-.5-.5h-2.33a2.5 2.5 0 0 1-2.5-2.5v-1a3 3 0 0 1 .65-1.87l.48-.6c.18-.23.12-.57-.08-.78a2.5 2.5 0 0 1-.7-1.49.94.94 0 0 0-.07-.24 2 2 0 0 0-3.87-.07.62.62 0 0 1-.39.44A7 7 0 0 0 5 9.5v2.09a.5.5 0 0 1-.13.33l-1.1 1.22A3 3 0 0 0 3 15.15v.28c0 .67.34 1.29.95 1.56 1.31.6 4 1.51 8.05 1.51 4.05 0 6.74-.91 8.05-1.5.61-.28.95-.9.95-1.57v-.28a3 3 0 0 0-.77-2l-1.1-1.23a.5.5 0 0 1-.13-.33v-.09ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.84 24.84 0 0 1-5.64 0Z"
        );

        this.bell = document.createElementNS("http://www.w3.org/2000/svg", "path");
        this.bell.setAttribute("fill", "var(--interactive-normal)");
        this.bell.setAttribute(
            "d",
            "M9.7 2.89c.18-.07.32-.24.37-.43a2 2 0 0 1 3.86 0c.05.2.19.36.38.43A7 7 0 0 1 19 9.5v2.09c0 .12.05.24.13.33l1.1 1.22a3 3 0 0 1 .77 2.01v.28c0 .67-.34 1.29-.95 1.56-1.31.6-4 1.51-8.05 1.51-4.05 0-6.74-.91-8.05-1.5-.61-.28-.95-.9-.95-1.57v-.28a3 3 0 0 1 .77-2l1.1-1.23a.5.5 0 0 0 .13-.33V9.5a7 7 0 0 1 4.7-6.61ZM9.18 19.84A.16.16 0 0 0 9 20a3 3 0 1 0 6 0c0-.1-.09-.17-.18-.16a24.86 24.86 0 0 1-5.64 0Z"
        );
    
        if (this.isEnabled) {
            this.svg.appendChild(this.bellzzz);
            this.svg.appendChild(this.zzz);
        } else {
            this.svg.appendChild(this.bell);
        }
        this.iconContainer.appendChild(this.svg);
    
        this.wrapperDiv.appendChild(this.iconContainer);
        this.contentsDiv.appendChild(this.wrapperDiv);
        this.button.appendChild(this.contentsDiv);
        this.container.appendChild(this.button)

        this.button.addEventListener("click", () => this.toggleFeature());
        container.prepend(this.container);
    }

    toggleFeature() {
        this.isEnabled = !this.isEnabled;
        const state = this.isEnabled ? "enabled" : "disabled";
        BdApi.showToast(`Silent Messages ${state}`, { type: "info" });

        if (this.isEnabled) {
            this.svg.innerHTML = '';
            this.svg.appendChild(this.bellzzz);
            this.svg.appendChild(this.zzz);

            // Added from BiscuitCleaner's AutoSilentMessage: https://github.com/BiscuitCleaner/BetterDiscordPlugins/blob/c011b402b927bcd9d091eda4d43bd263c5207e50/AutoSilentMessage.plugin.js
            BD.Patcher.before(MessageActions, "sendMessage", (_, [, msg]) => {
                msg.content = '@silent ' + msg.content
            })
        } else {
            this.svg.innerHTML = '';
            this.svg.appendChild(this.bell);

            // Cleanup from AutoSilentMessage
            BD.Patcher.unpatchAll();
        }
    }
}