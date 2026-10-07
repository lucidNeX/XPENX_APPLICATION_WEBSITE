document.getElementById('yr').textContent = new Date().getFullYear();

// scroll reveal (content stays visible if JS or IntersectionObserver is unavailable)
if ('IntersectionObserver' in window) {
  const els = document.querySelectorAll('.feat, .steps li, .sec-head, .notif-in, .reports-in, details');
  els.forEach(e => e.classList.add('rv'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(e => io.observe(e));
}

// warn gracefully if the APK has not been placed on the server yet
document.querySelectorAll('a[href$="xpenx.apk"]').forEach(a => {
  a.addEventListener('click', async (ev) => {
    try {
      const r = await fetch(a.getAttribute('href'), { method: 'HEAD' });
      if (r.status === 404) { ev.preventDefault(); alert('The APK is not available yet. Please check back soon.'); }
    } catch (e) { /* offline / file:// — let the browser handle it */ }
  });
});
