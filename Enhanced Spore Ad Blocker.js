// ==UserScript==
// @name         Enhanced Spore Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Enhanced ad blocking for www.spore.com
// @author       You
// @match        http://www.spore.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Add your ad blocking rules here
    const adSelectors = [
        '#ad-unit-id',
        '.ad-container',
        '[data-ad-slot]'
    ];

    // Function to hide ads
    const hideAds = (ads) => {
        ads.forEach(ad => {
            ad.style.display = 'none';
        });
    };

    // Get all ads and hide them
    adSelectors.forEach(selector => {
        const ads = document.querySelectorAll(selector);
        hideAds(ads);
    });

    // Extra feature: prevent ads from being shown again after hiding them
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList) {
            if(mutation.addedNodes) {
                for(const node of mutation.addedNodes) {
                    if(node.querySelectorAll) {
                        const ads = node.querySelectorAll(adSelectors.join(', '));
                        hideAds(ads);
                    }
                }
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

})();