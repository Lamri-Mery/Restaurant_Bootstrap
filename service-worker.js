/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["README.md","97ce6b4be326e30e32579e2b1dd5773d"],["assets/css/reset.css","58e6ef93e3add71473c828e001df2042"],["assets/css/styles.css","280ee44be270d233f4ec41cd7c498957"],["assets/img/17164.jpg","88d89239d86eee725e7dc0323d55c698"],["assets/img/408_24.jpg","317df8e87ecdc3a8836d05ff742d9cb3"],["assets/img/Gyoza_2.jpg","a917fc2921dceefbdfc82f5f15b5822b"],["assets/img/Mango_sticy_rice_(3859549574).jpg","c7af54ce36820ec99664538f43148627"],["assets/img/bun-bo-hue.jpg","14736d2c9e5f93276428c1b1b2037abf"],["assets/img/bun-thang-hanoi.jpg","d34a3a192b4016c757718d7f7f52ddf2"],["assets/img/cach-lam-bun-cuon-tom-thit-ngon-mat-cuc-hap-dan-dai-ca-nha-ngay-he-1.jpg","614b23564eb3643562917ba532ed54bb"],["assets/img/crevettes-marinees-sautees-a-l-asiatique.jpg","147608e1cef209d3473140b9043d3e2f"],["assets/img/icons/icon-128x128.png","b1b0f7b8adb5bb5568c370b1c8af29e9"],["assets/img/icons/icon-144x144.png","928538579a59f24888281462ce75ef7a"],["assets/img/icons/icon-152x152.png","300cd90366750e4abbab2205d219624e"],["assets/img/icons/icon-192x192.png","ac65b2a8d6e7ad80fdab29f76edd91c7"],["assets/img/icons/icon-256x256.png","827577d4371bd0c83789fac7a2fe1546"],["assets/img/icons/icon-32x32.png","940d8b2f15cc3bee9e6997f9408bbea7"],["assets/img/indochine-brussels-by-nettah-yoeli-rimmer.jpg","455b158766f38f6574adcb267455c206"],["assets/img/indochine-entree-platter.png","94b603f02adbc3756ba9369f01649456"],["assets/img/indochine-interior.png","2bd2fec99baba15b268a0bbe13dc8152"],["assets/img/indochine-pork-curry.png","4b5efae5e9f6c20a1097f35a861a64b3"],["assets/img/indochine-skewers.png","8dceb6e0c42a6c5d685eddcccd7b52ad"],["assets/img/lau-mam.jpg","9915f20703054c6f94317ca495511198"],["assets/img/logo.jpg","459162cad755504937ffad8ef611cc2a"],["assets/img/logo.png","485fbc05a89ea1f81fcb7661463bfa89"],["assets/img/logo2.png","1431e8eb9ffc1d92c95176a4956654a3"],["assets/img/logo3.png","918180e848c8a0e16a41215f306f77c5"],["assets/img/logo4.png","b8f54f5b1a1a9b4f6e84772b9f691faf"],["assets/img/logo5.png","82bb678397d721766ebb5ed544023bcc"],["assets/img/pho.jpg","3c901a7443b17156410c826e8a94aac3"],["assets/js/app.js","43240a0523ed80ad111e02817c4a7e35"],["assets/js/name.js","9fdd0cef9d33564025a29cfd064203fe"],["assets/js/pagination.js","be783b28d629ca132474b290ba55e1ba"],["carte.html","40ed206b3ca22d7ae2f0d24ac288b597"],["contact.html","d646e89bb7324be0fadedcbfa8b68376"],["index.html","ef92ce8611f6a71a4fb83961ba53da98"],["libraries/bootstrap.min.css","a7022c6fa83d91db67738d6e3cd3252d"],["libraries/bootstrap.min.js","eb5fac582a82f296aeb74900b01a2fa3"],["libraries/jquery-3.3.1.min.js","a09e13ee94d51c524b7e2a728c7d4039"],["libraries/popper.min.js","83fb8c4d9199dce0224da0206423106f"],["manifest.json","d0a87f9c041052262a7f4bc5befff985"],["photos.html","f25da7f813a6ca7c4955eb2f14ac1862"],["restaurant.html","abe17170097c8b37c7096eeb175ac5d5"]];
var cacheName = 'sw-precache-v3-sw-precache-' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







