// ==UserScript==
// @name         Instagram Video Controls Improvement
// @namespace    https://github.com/NabiKAZ/Instagram-Video-Controls-Improvement
// @version      0.1
// @description  Adds video playback controls to Instagram videos embedded in web pages (seek bar, volume, play/pause video button), And also you can change speed rate video.
// @author       Nabi K.A.Z. <nabikaz@gmail.com>
// @match        https://www.instagram.com/p/*
// @match        https://www.instagram.com/tv/*
// ==/UserScript==

(function() {
    var loaded_interval = setInterval(function() {
        var article = document.getElementsByTagName("article")[0];

        //check page loaded complete
        if (!article) {
            return;
        } else {
            clearInterval(loaded_interval);
        }

        setInterval(function() {
            var videos = document.getElementsByTagName("video");
            if (!videos.length) return;

            Array.from(videos).forEach(function(video) {

                var videoParent = video.parentNode.parentNode.parentNode.parentNode.parentNode;
                video.controls = true;
                video.muted = false;

                var el;
                el = videoParent.querySelector("div[aria-label=Control]");
                if (el) el.style.visibility = 'hidden';

                el = videoParent.querySelector("span[aria-label=Play]");
                if (el) el.parentNode.style.visibility = 'hidden';

                el = videoParent.querySelector("button[label='Toggle audio']");
                if (el) el.parentNode.style.visibility = 'hidden';
            });

            updateRate(0);

        }, 1000);

        var divControl = document.createElement("div");
        divControl.style.display = "block";
        divControl.style.textAlign = "center";

        var spnRate = document.createElement("span");
        spnRate.id = 'spn-rate';
        spnRate.innerText = '1.0';
        spnRate.style.marginLeft = '10px';

        var spnX = document.createElement("span");
        spnX.innerText = 'x';
        spnX.style.marginRight = '10px';
        spnX.style.marginLeft = '2px';

        var btnIncrease = document.createElement("button");
        btnIncrease.id = 'btn-increase';
        btnIncrease.innerText = '>>';
        btnIncrease.addEventListener("click", function() {
            updateRate(+0.5);
        });

        var btnDecrease = document.createElement("button");
        btnDecrease.id = 'btn-decrease';
        btnDecrease.innerText = '<<';
        btnDecrease.addEventListener("click", function() {
            updateRate(-0.5);
        });

        divControl.appendChild(btnDecrease);
        divControl.appendChild(spnRate);
        divControl.appendChild(spnX);
        divControl.appendChild(btnIncrease);

        var divContainer = document.querySelector('article > div > div');
        divContainer.appendChild(divControl);

    }, 1000);

    function updateRate(n) {
        var el = document.getElementById("spn-rate");
        if (!el) return;
        var rate = el.innerText;
        rate = Number(rate);
        rate += n;
        rate = rate.toFixed(1);
        el.innerText = rate;
        var videos = document.getElementsByTagName("video");
        Array.from(videos).forEach(function(video) {
            video.playbackRate = rate;
        });
    }

})();
