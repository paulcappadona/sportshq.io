/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "unknown";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}

function isDeeplinkPath() {
  var paths = [ '/event', '/venue' ];
  var l = window.location;
  // alert(l.pathname);
  for (var i = 0; i < paths.length; i++) {
    if (l.pathname.startsWith(paths[i])) {
      return true;
    }
  }
  return false;
}

const os = getMobileOperatingSystem();
// alert(os);

if (isDeeplinkPath()) {
  if (os === "iOS") {
    // Just replace `https://` with `itms://` on your app's AppStore link.
    window.location.href = "https://apps.apple.com/us/app/sportacleio/id6444780403";
  }

  if (os === "Android") {
    // Just replace `https://` with `market://` on your app's PlayStore link.
    window.location.href = "https://play.google.com/store/apps/details?id=io.sportacle.app";
  }

  if (os === "unknown") {
    // Just replace `https://` with `market://` on your app's PlayStore link.
    window.location.href = "https://www.sportshq.io";
  }
}
