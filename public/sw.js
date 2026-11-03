/* Service worker do MJPix: recebe notificações push (pagamento, saque) e avisa as abas abertas. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("push", (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch {
    data = { title: "MJPix", body: event.data ? event.data.text() : "" };
  }
  const title = data.title || "Pix recebido";
  const options = {
    body: data.body || "",
    icon: "/apple-icon",
    badge: "/icon",
    tag: data.tag || "mjpix-push",
    renotify: true,
    vibrate: [120, 60, 120, 60, 240],
    data: { url: data.url || "/app", chargeId: data.chargeId, amountCents: data.amountCents },
  };
  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const w of windows) w.postMessage({ source: "mjpix-sw", ...data });
      await self.registration.showNotification(title, options);
    })(),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/app";
  event.waitUntil(
    (async () => {
      const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
      for (const w of windows) {
        if ("focus" in w) {
          await w.focus();
          if ("navigate" in w) await w.navigate(url).catch(() => {});
          return;
        }
      }
      await self.clients.openWindow(url);
    })(),
  );
});
