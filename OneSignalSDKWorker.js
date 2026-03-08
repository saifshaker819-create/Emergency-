// OneSignal Service Worker — نجدة Emergency App
// الموقع: https://papaya-cocada-0aa915.netlify.app
// يجب أن يكون هذا الملف في الجذر / بالاسم: OneSignalSDKWorker.js

// OneSignal Service Worker - يجب رفع هذا الملف في جذر الموقع
// الاسم المطلوب بالضبط: OneSignalSDKWorker.js

importScripts('https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js');

// ── استقبال إشعار في الخلفية ─────────────────────────
self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const payload = data?.custom?.a || data || {};

  const isSOSAlert = payload.type === 'sos';

  const title   = data?.title   || (isSOSAlert ? '🆘 نداء طوارئ!' : 'نجدة');
  const body    = data?.alert   || data?.body   || '';
  const icon    = 'https://img.icons8.com/emoji/96/sos-button.png';
  const badge   = 'https://img.icons8.com/emoji/32/sos-button.png';

  const options = {
    body,
    icon,
    badge,
    tag:     isSOSAlert ? 'sos-alert' : 'najda-msg',
    renotify: true,
    requireInteraction: isSOSAlert,   // إشعار SOS يبقى حتى يُغلق يدوياً
    vibrate:  isSOSAlert ? [0,500,200,500,200,500,200,500] : [0,300,100,300],
    data:     payload,
    actions:  isSOSAlert
      ? [{ action:'open', title:'فتح التطبيق' }, { action:'call', title:'اتصال 911' }]
      : [{ action:'open', title:'قراءة الرسالة' }],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ── الضغط على الإشعار ────────────────────────────────
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const d = event.notification.data || {};

  if (event.action === 'call') {
    event.waitUntil(clients.openWindow('tel:911'));
    return;
  }

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      if (list.length > 0) {
        list[0].focus();
        list[0].postMessage({ type: 'notif_click', data: d });
      } else {
        clients.openWindow('/');
      }
    })
  );
});
