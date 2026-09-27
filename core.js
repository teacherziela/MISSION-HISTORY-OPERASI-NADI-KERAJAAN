(function(root){
  'use strict';
  const normalize=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
  function shuffle(items,rng=Math.random){const a=items.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
  function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function award(s,id,max){if(Object.hasOwn(s.earned,id))return false;s.earned[id]=Math.max(0,max-(s.errors[id]?1:0));return true;}
  function markError(s,id){s.errors[id]=true;}
  function factGrade(answers){
    const rule={a_funan:s=>/\bmekong\b/.test(s),a_majapahit:s=>/\bbrantas\b/.test(s),a_srivijaya:s=>/\bmusi\b/.test(s),b_champa:s=>/\bindrapura\b/.test(s),b_angkor:s=>/\bhariharalaya\b/.test(s),b_gangga:s=>s==='pangkalan'};
    return Object.fromEntries(Object.entries(rule).map(([id,fn])=>{const n=normalize(answers[id]);return[id,!/\b(tidak|bukan|tiada)\b/.test(n)&&fn(n)?1:0];}));
  }
  function essayGrade(value){
    const clauses=String(value||'').split(/[.!?;\n]+/).map(normalize).filter(s=>s.split(' ').length>=3&&!/\b(tidak|bukan|tiada|tak)\b/.test(s));
    const rules={air:s=>/\bair\b/.test(s)&&/(bekal|sumber|minum|harian|pengairan|mengairi)/.test(s),subur:s=>/subur/.test(s)&&/(tanah|pertanian|tanaman|bercucuk)/.test(s),angkutan:s=>/(pengangkutan|mengangkut|perhubungan|hubungan|laluan)/.test(s)&&/(sungai|barang|penduduk|perahu|jalan|angkut|hubung)/.test(s),dagang:s=>/(perdagangan|berdagang|perniagaan|jual beli|pelabuhan)/.test(s),makanan:s=>/(ikan|makanan)/.test(s)&&/(sumber|tangkap|bekal|membekal)/.test(s)};
    const matched=Object.entries(rules).filter(([,fn])=>clauses.some(fn)).map(([k])=>k);
    return {matched,suggested:Math.min(4,matched.length)};
  }
  const api={normalize,shuffle,esc,award,markError,factGrade,essayGrade};
  if(typeof module!=='undefined')module.exports=api;else root.NadiCore=api;
})(typeof globalThis!=='undefined'?globalThis:this);
