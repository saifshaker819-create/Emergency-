/**
 * MedLab Pro — Main JavaScript
 * Version: 2.0 (Optimized)
 * Blocks: 8 combined script sections
 * Performance: debounce, throttle, DOM cache, modal manager
 */
// ═══ BLOCK 1 ═══
// ═══════════════════════════════════════════════════════════════
// PERFORMANCE UTILITIES — Debounce, Throttle, DOM Cache
// ═══════════════════════════════════════════════════════════════

/**
 * Debounce: تأخير تنفيذ الدالة حتى توقف الحدث
 * @param {Function} fn - الدالة المراد تأخيرها
 * @param {number} delay - التأخير بالمللي ثانية
 */
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Throttle: تحديد معدل تنفيذ الدالة
 * @param {Function} fn - الدالة المراد تقييدها
 * @param {number} limit - الحد الأدنى بين كل تنفيذ
 */
function throttle(fn, limit) {
  let lastRun = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastRun >= limit) {
      lastRun = now;
      return fn.apply(this, args);
    }
  };
}

/**
 * DOM Cache: تخزين مؤقت لعناصر DOM بدلاً من الاستعلام المتكرر
 */
const _domCache = new Map();
function getEl(id) {
  if (!_domCache.has(id)) _domCache.set(id, document.getElementById(id));
  return _domCache.get(id);
}
function clearDomCache() { _domCache.clear(); }

/**
 * Lazy Library Loader: تحميل المكتبات عند الحاجة فقط
 */
const _libLoaded = {};
function loadLib(url) {
  if (_libLoaded[url]) return _libLoaded[url];
  _libLoaded[url] = new Promise((resolve, reject) => {
    // Check if already loaded globally
    const existing = document.querySelector(\`script[src="\${url}"]\`);
    if (existing) { resolve(); return; }
    const s = document.createElement('script');
    s.src = url;
    s.onload = resolve;
    s.onerror = () => { console.warn('Failed to load lib:', url); resolve(); };
    document.head.appendChild(s);
  });
  return _libLoaded[url];
}

// ── مفاتيح المكتبات المتأخرة التحميل ──
const _LIB_URLS = {
  jsQR: 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js',
};

// ═══════════════════════════════════════════════════════════════
// Z-INDEX LAYER CONSTANTS — طبقات z-index الموحدة
// ═══════════════════════════════════════════════════════════════
const Z = {
  DROPDOWN : 10,
  STICKY   : 100,
  MODAL    : 1000,
  TOAST    : 10000,
  CRITICAL : 100000,
};
window.Z = Z;

// ============================================================
// AUTO CHARACTER CONVERSION — تحويل الحروف تلقائياً
// يعمل عبر keydown مع preventDefault لضمان دقة التحويل
// يدعم كامل الحروف العربية بما فيها Shift+حرف
// ============================================================
(function _autoCharConvert(){

  // ══════════════════════════════════════════════════
  // خريطة QWERTY → عربي (بدون Shift)
  // ══════════════════════════════════════════════════
  // الخريطة مطابقة للكيبورد الفيزيائي في الصورة
  // الحرف السفلي (بدون Shift) ← الحرف العربي الصغير على الزر
  // ══════════════════════════════════════════════════
  var EN_TO_AR = {
    // صف الأرقام — الحرف السفلي
    '`':'\u0630',                                   // ` / ذ
    '1':'\u0661','2':'\u0662','3':'\u0663','4':'\u0664','5':'\u0665',
    '6':'\u0666','7':'\u0667','8':'\u0668','9':'\u0669','0':'\u0660',
    '-':'\u002d',                                   // - (نفسه)
    // صف QWERTY — الحرف السفلي
    'q':'\u0636','w':'\u0635','e':'\u062b','r':'\u0642',
    't':'\u0641','y':'\u063a','u':'\u0639',
    'i':'\u0647','o':'\u062e','p':'\u062d',
    '[':'\u062c',']':'\u062f',                      // [ = ج  ] = د 
    // صف ASDF — الحرف السفلي
    'a':'\u0634','s':'\u0633','d':'\u064a','f':'\u0628',
    'g':'\u0644','h':'\u0627','j':'\u062a',
    'k':'\u0646','l':'\u0645',
    ';':'\u0643',                                   // ; = ك
    "'":'\u0637',                                   // ' = ط
    // صف ZXCV — الحرف السفلي
    'z':'\u0626','x':'\u0621','c':'\u0648',         // z=ئ  x=ء 
    'v':'\u0631','b':'\u0644\u0627',                // v=ر  b=لا
    'n':'\u0649','m':'\u0629',                      // n=ى  m=ة
    ',':'\u0648','>':'\u0632',                      // .=و=,  ز 
    '.':'\u0632','/':'\u0638'                       // /=ظ
  };

  // خريطة Shift + مفتاح → عربي (الحرف العلوي على الزر)
  var EN_TO_AR_SHIFT = {
    // صف الأرقام — الحرف العلوي (Shift)
    '~':'\u0651',                                   // Shift+` = شدّة
    '!':'\u0021','@':'\u0040','#':'\u0023','$':'\u0024','%':'\u0025',
    '^':'\u005e','&':'\u0026','*':'\u002a','(':'\u0028',')':'\u0029',
    // صف QWERTY — الحرف العلوي
    'Q':'\u0636','W':'\u0635','E':'\u062b','R':'\u0642',
    'T':'\u0644\u0627',                             // T = لا (Shift)
    'Y':'\u063a','U':'\u0639',
    'I':'\u00f7',                                   // I = ÷
    'O':'\u00d7',                                   // O = ×
    'P':'\u061b',                                   // P = ؛
    '{':'\u003e','}':'\u003c',                      // { = >  } = <
    // صف ASDF — الحرف العلوي
    'A':'\u0634','S':'\u0633',
    'D':'\u005b',                                   // D = [
    'F':'\u005d',                                   // F = ]
    'G':'\u0644\u0623',                             // G = لأ
    'H':'\u0623',                                   // H = أ
    'J':'\u0640',                                   // J = ـ (تطويل)
    'K':'\u060c',                                   // K = ،
    'L':'\u002f',                                   // L = /
    ':':'\u0643',                                   // : = ك
    '"':'\u0637',                                   // " = ط
    // صف ZXCV — الحرف العلوي
    'Z':'\u007e',                                   // Z = ~
    'X':'\u0625',                                   // X = إ
    'C':'\u007b',                                   // C = {
    'V':'\u007d',                                   // V = }
    'B':'\u0644\u0623',                             // B = لأ
    'N':'\u0622',                                   // N = آ
    'M':'\u0027',                                   // M = '
    '<':'\u060c',                                   // < = ،
    '>':'\u002e',                                   // > = .
    '?':'\u061f'                                    // ? = ؟
  };

  // خريطة عكسية: عربي → إنجليزي
  var AR_TO_EN = {};
  Object.keys(EN_TO_AR).forEach(function(en){
    var ar = EN_TO_AR[en];
    if(ar.length===1 && /[\u0600-\u06FF]/.test(ar) && !AR_TO_EN[ar]) AR_TO_EN[ar] = en;
  });
  Object.keys(EN_TO_AR_SHIFT).forEach(function(en){
    var ar = EN_TO_AR_SHIFT[en];
    if(ar.length===1 && /[\u0600-\u06FF]/.test(ar) && !AR_TO_EN[ar]) AR_TO_EN[ar] = en.toLowerCase();
  });

  // جدول override من زر التبديل
  window._charConvOverrides = {};

  function getFieldLang(el){
    if(!el || !el.id) return null;
    var ov = window._charConvOverrides[el.id];
    if(ov) return ov;
    var attr = el.getAttribute('lang');
    if(attr === 'en') return 'en';
    if(attr === 'ar') return 'ar';
    return null;
  }

  // إدراج نص في موضع cursor الحالي
  function insertAtCursor(el, text){
    var start = el.selectionStart;
    var end   = el.selectionEnd;
    var val   = el.value;
    el.value  = val.substring(0, start) + text + val.substring(end);
    var newPos = start + text.length;
    try{ el.setSelectionRange(newPos, newPos); }catch(e){}
    el.dispatchEvent(new Event('input', {bubbles:true}));
  }

  // معالج keydown المركزي
  function onKeyDown(e){
    var el = e.target;
    if(!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA')) return;
    if(el.type === 'password' || el.type === 'number' || el.type === 'date' ||
       el.type === 'hidden'   || el.type === 'color'  || el.type === 'file') return;

    // تجاهل مفاتيح التحكم (Ctrl, Alt, Meta)
    if(e.ctrlKey || e.altKey || e.metaKey) return;

    var lang = getFieldLang(el);
    if(!lang) return;

    var key = e.key;
    // تجاهل مفاتيح وظيفية وخاصة
    if(!key || key.length > 1) return; // Backspace, Enter, Arrow… لها length > 1

    if(lang === 'ar'){
      // ابحث في الجدول المناسب (Shift أو عادي)
      var arChar = e.shiftKey ? EN_TO_AR_SHIFT[key] : EN_TO_AR[key.toLowerCase()];
      if(arChar !== undefined){
        e.preventDefault();
        insertAtCursor(el, arChar);
      }
      // إذا لم نجد تحويلاً: اتركه يمر كما هو (أرقام، علامات...)
    } else if(lang === 'en'){
      // إذا كان الحرف عربياً → حوّله لإنجليزي
      if(/[\u0600-\u06FF]/.test(key)){
        var enChar = AR_TO_EN[key];
        if(enChar){
          e.preventDefault();
          insertAtCursor(el, enChar);
        }
      }
    }
  }

  // ربط listener واحد على document لكل الحقول (event delegation)
  document.addEventListener('keydown', onKeyDown, true);

  // ══════════════════════════════════════════════════
  // حقول AR_FIELDS / EN_FIELDS: ضبط lang attribute
  // ══════════════════════════════════════════════════
  var AR_FIELDS = [
    'wp-name','wp-fname','wp-mname','wp-lname','inline-dr-name',
    'global-search','print-search-inp','del-pt-srch','ps-search',
    'cult-pt-search','ua-pt-search',
    'stool-pt-search','semen-pt-search','chat-input-text',
    'chat-search-inp','chat-result-search'
  ];
  var EN_FIELDS = [
    'wiz-test-srch','res-add-test-srch','tests-srch',
    'billing-test-srch'
  ];

  function applyAll(){
    AR_FIELDS.forEach(function(id){
      var el = document.getElementById(id);
      if(el && !el.getAttribute('lang')) el.setAttribute('lang','ar');
    });
    EN_FIELDS.forEach(function(id){
      var el = document.getElementById(id);
      if(el && !el.getAttribute('lang')) el.setAttribute('lang','en');
    });
    document.querySelectorAll('.srch-inp').forEach(function(el){
      if(!el.getAttribute('lang')) el.setAttribute('lang','ar');
    });
  }

  document.addEventListener('DOMContentLoaded', applyAll);
  setTimeout(applyAll, 600);
  setTimeout(applyAll, 2000);

  if(window.MutationObserver){
    var mo = new MutationObserver(function(muts){
      var hasNew = muts.some(function(m){ return m.addedNodes.length>0; });
      if(hasNew) setTimeout(applyAll, 50);
    });
    document.addEventListener('DOMContentLoaded', function(){
      mo.observe(document.body, {childList:true, subtree:true});
    });
  }

  window._applyCharConvert = applyAll;
})();

// ============================================================
// AUTO KEYBOARD LANGUAGE — التحكم بلغة الكيبورد تلقائياً
// الآلية: lang attribute + onfocus يغير html lang
// يعمل على Android/Chrome/Samsung Browser
// ============================================================
(function(){
  var AR_IDS=[
    'wp-name','wp-fname','wp-mname','wp-lname',
    'st-name','st-addr','st-dir','st-footer',
    'sig-doctor-name','dr-name',
    'print-search-inp',
    'cult-pt-search','ua-pt-search','stool-pt-search',
    'adm-labname','adm-labaddr','inline-dr-name',
    'chat-result-search','global-search',
    'ii-name','pkg-name','pkg-desc','ftr-txt-address','ftr-txt-note',
    'res-notes','hdr-lab-name'
  ];
  var EN_IDS=[
    'tests-srch','et-name-en','et-code','et-unit','et-ref','et-price',
    'res-tech','adm-uname','adm-pass',
    'st-lic','st-email','st-phone','ftr-email','ftr-website','ftr-txt-phone',
    'login-pass',
    'ii-qty','ii-exp','ii-sup','ii-unit',
    'custom-abx-code','custom-abx-name',
    'wp-phone','wp-age-y','wp-age-m','wp-age-d','res-add-test-srch'
  ];

  function _apply(el, lang){
    if(!el) return;
    if(el.tagName==='SELECT'||el.type==='hidden'||el.type==='number'||el.type==='date'||el.type==='color'||el.type==='file') return;
    el.setAttribute('lang', lang);
    // إزالة أي listener قديم وإضافة جديد
    if(el._kbFocusBound) el.removeEventListener('focus', el._kbFocusBound);
    if(el._kbBlurBound)  el.removeEventListener('blur',  el._kbBlurBound);
    el._kbFocusBound = function(){ document.documentElement.setAttribute('lang', lang); };
    el._kbBlurBound  = function(){ document.documentElement.setAttribute('lang', 'ar'); };
    el.addEventListener('focus', el._kbFocusBound);
    el.addEventListener('blur',  el._kbBlurBound);
  }

  function _run(){
    AR_IDS.forEach(function(id){ _apply(document.getElementById(id), 'ar'); });
    EN_IDS.forEach(function(id){ _apply(document.getElementById(id), 'en'); });

    // باقي الحقول — اكتشاف تلقائي من lang attribute أو placeholder
    document.querySelectorAll('input, textarea').forEach(function(el){
      if(el._kbFocusBound) return; // مُعالَج مسبقاً
      if(el.tagName==='SELECT'||el.type==='hidden'||el.type==='number'||el.type==='date'||el.type==='color'||el.type==='file') return;
      var existLang = el.getAttribute('lang')||'';
      var ph = el.getAttribute('placeholder')||'';
      var lang='';
      if(existLang==='en') lang='en';
      else if(existLang==='ar') lang='ar';
      else if(/[\u0600-\u06FF]/.test(ph)) lang='ar';
      else if(ph.length>2) lang='en';
      if(lang) _apply(el, lang);
    });
  }

  // تشغيل فوري وبعد تحميل الصفحة وبعد بناء المودالات
  _run();
  document.addEventListener('DOMContentLoaded', _run);
  setTimeout(_run, 600);
  setTimeout(_run, 2000);
  // مراقبة إضافة عناصر جديدة للـ DOM (مودالات ديناميكية)
  if(window.MutationObserver){
    var _mo = new MutationObserver(function(muts){
      var hasNew = muts.some(function(m){ return m.addedNodes.length>0; });
      if(hasNew) setTimeout(_run, 50);
    });
    document.addEventListener('DOMContentLoaded', function(){
      _mo.observe(document.body, {childList:true, subtree:true});
    });
  }
  window._applyAutoLang = _run;
})();

// ============================================================
// DATABASE
// ============================================================
// ══════════════════════════════════════════════════════════════
// LZ-String — ضغط البيانات (يقلل الحجم 60-70%)
// ══════════════════════════════════════════════════════════════
const LZS=(()=>{
  function compress(s){
    try{
      return '\x01'+btoa(encodeURIComponent(s).replace(/%([0-9A-F]{2})/g,
        (_,p1)=>String.fromCharCode(parseInt(p1,16))));
    }catch(e){return s;}
  }
  function decompress(s){
    try{
      if(s&&s[0]==='\x01'){
        return decodeURIComponent(atob(s.slice(1)).split('').map(
          c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join(''));
      }
      return s;
    }catch(e){return s;}
  }
  return{compress,decompress};
})();

// ══════════════════════════════════════════════════════════════
// IDB — قاعدة بيانات IndexedDB للأرشيف (500MB+)
// ══════════════════════════════════════════════════════════════
const IDB=(()=>{
  const DB_NAME='medlab_idb';
  const DB_VER=1;
  const STORE='kv';
  let _db=null;

  function open(){
    return new Promise((res,rej)=>{
      if(_db){res(_db);return;}
      const req=indexedDB.open(DB_NAME,DB_VER);
      req.onupgradeneeded=e=>{
        const db=e.target.result;
        if(!db.objectStoreNames.contains(STORE))
          db.createObjectStore(STORE,{keyPath:'k'});
      };
      req.onsuccess=e=>{_db=e.target.result;res(_db);};
      req.onerror=e=>rej(e);
    });
  }

  async function get(key){
    try{
      const db=await open();
      return new Promise((res,rej)=>{
        const tx=db.transaction(STORE,'readonly');
        const req=tx.objectStore(STORE).get(key);
        req.onsuccess=()=>{
          const row=req.result;
          if(!row){res(null);return;}
          try{
            const text=(row.v&&row.v[0]==='\x01')?LZS.decompress(row.v):row.v;
            res(JSON.parse(text||'null'));
          }catch{res(null);}
        };
        req.onerror=()=>res(null);
      });
    }catch{return null;}
  }

  async function set(key,value){
    try{
      const db=await open();
      const json=JSON.stringify(value);
      const compressed=LZS.compress(json);
      return new Promise((res,rej)=>{
        const tx=db.transaction(STORE,'readwrite');
        tx.objectStore(STORE).put({k:key,v:compressed});
        tx.oncomplete=()=>res(true);
        tx.onerror=()=>res(false);
      });
    }catch{return false;}
  }

  async function del(key){
    try{
      const db=await open();
      return new Promise((res)=>{
        const tx=db.transaction(STORE,'readwrite');
        tx.objectStore(STORE).delete(key);
        tx.oncomplete=()=>res(true);
        tx.onerror=()=>res(false);
      });
    }catch{return false;}
  }

  async function getAllKeys(){
    try{
      const db=await open();
      return new Promise((res)=>{
        const tx=db.transaction(STORE,'readonly');
        const req=tx.objectStore(STORE).getAllKeys();
        req.onsuccess=()=>res(req.result||[]);
        req.onerror=()=>res([]);
      });
    }catch{return[];}
  }

  async function getAll(){
    try{
      const db=await open();
      return new Promise((res)=>{
        const tx=db.transaction(STORE,'readonly');
        const req=tx.objectStore(STORE).getAll();
        req.onsuccess=()=>res(req.result||[]);
        req.onerror=()=>res([]);
      });
    }catch{return[];}
  }

  // حجم IDB الحقيقي من navigator.storage.estimate()
  async function usedMB(){
    try{
      if(navigator.storage&&navigator.storage.estimate){
        const est=await navigator.storage.estimate();
        return ((est.usage||0)/1024/1024).toFixed(2);
      }
      // fallback: حساب تقديري من البيانات المخزنة
      const all=await getAll();
      let total=all.reduce((s,r)=>(s+(r.v||'').length*2),0);
      return (total/1024/1024).toFixed(2);
    }catch{return '0';}
  }

  // الحصول على الحصة الإجمالية الحقيقية للتخزين بالـ MB
  async function quotaMB(){
    try{
      if(navigator.storage&&navigator.storage.estimate){
        const est=await navigator.storage.estimate();
        if(est.quota&&est.quota>0) return (est.quota/1024/1024).toFixed(0);
      }
    }catch{}
    return '500'; // fallback افتراضي
  }

  return{get,set,del,getAllKeys,getAll,usedMB,quotaMB};
})();

// ══════════════════════════════════════════════════════════════
// DB — IDB-First: البيانات الكبيرة تُحفظ على IDB مباشرة
//      الإعدادات الخفيفة تبقى على localStorage
// ══════════════════════════════════════════════════════════════

// البيانات الكبيرة — تذهب لـ IDB مباشرة ولا تُخزَّن في localStorage
const _IDB_KEYS=new Set(['patients','requests','invoices','doctors','packages',
  'inventory','qc','tests','testGroups','billing',
  'cultureRecords','uaRecords','stoolExamRecords','semenRecords']);

// كاش الذاكرة — يُحدَّث عند كل قراءة/كتابة لتفادي أي تأخير
const _MC={};

const DB={
  _user:'',
  _pfx(){ return 'mlab2_'+(this._user?this._user+'_':''); },

  get(k){
    try{
      const pk=this._pfx()+k;
      if(_MC[pk]!==undefined) return _MC[pk]; // من الكاش فوراً
      const raw=localStorage.getItem(pk);
      if(raw===null) return null;
      const text=(raw&&raw[0]==='\x01')?LZS.decompress(raw):raw;
      const val=JSON.parse(text||'null');
      _MC[pk]=val;
      return val;
    }catch{ return null; }
  },

  set(k,v){
    try{
      const pk=this._pfx()+k;
      _MC[pk]=v; // حفظ في الكاش فوراً (بدون تأخير)
      if(_IDB_KEYS.has(k)){
        // بيانات كبيرة: IDB فقط — امسح من localStorage فوراً
        localStorage.removeItem(pk);
        IDB.set(pk,v).catch(e=>console.warn('[DB] IDB set error',k,e));
      } else {
        // إعدادات خفيفة: localStorage
        const compressed=LZS.compress(JSON.stringify(v));
        localStorage.setItem(pk,compressed);
      }
    }catch(e){ console.warn('[DB] set error',k,e); }
  },

  del(k){
    const pk=this._pfx()+k;
    delete _MC[pk];
    localStorage.removeItem(pk);
    if(_IDB_KEYS.has(k)) IDB.del(pk).catch(()=>{});
  },

  setUser(u){
    this._user=u||'';
    // امسح الكاش عند تغيير المستخدم
    Object.keys(_MC).forEach(k=>delete _MC[k]);
  },

  usedMB(){
    let total=0;
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&k.startsWith('mlab2_')) total+=(localStorage.getItem(k)||'').length*2;
    }
    return (total/1024/1024).toFixed(2);
  }
};

// load/save — نفس الواجهة القديمة بالضبط (لا يتغير باقي الكود)
function load(k,def){r