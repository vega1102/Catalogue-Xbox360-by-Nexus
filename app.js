const PAGE_SIZE = 30;
let games = [];
let page = 1;
const $ = id => document.getElementById(id);
const clean = value => String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");

function filteredGames(){
  const q = clean($("search").value.trim());
  const platform = $("platform").value;
  const type = $("type").value;
  return games.filter(g =>
    (!q || clean([g.title,g.description,g.genre,g.publisher,g.developer].join(" ")).includes(q)) &&
    (!platform || g.platform === platform) &&
    (!type || g.type === type)
  );
}
function render(){
  const list = filteredGames();
  const pages = Math.max(1,Math.ceil(list.length/PAGE_SIZE));
  page = Math.min(page,pages);
  $("count").textContent = `${list.length.toLocaleString("fr-FR")} jeu(x)`;
  $("status").hidden = list.length > 0;
  $("status").textContent = games.length
    ? "Aucun jeu ne correspond à ces filtres."
    : "Le modèle du catalogue est prêt. La liste complète des jeux sera ajoutée après extraction et vérification des pages source.";
  const visible = list.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
  $("grid").innerHTML = visible.map(g => {
    const cover = g.cover
      ? `<img loading="lazy" src="${escapeAttr(g.cover)}" alt="Jaquette de ${escapeAttr(g.title)}">`
      : `<span>Jaquette<br>à ajouter</span>`;
    const details = g.url ? `<a href="${escapeAttr(g.url)}" target="_blank" rel="noopener">` : "";
    const end = g.url ? "</a>" : "";
    return `<article class="card"><div class="cover">${cover}</div><div class="card-body">${details}<h3>${escapeHtml(g.title)}</h3>${end}<div class="meta">${escapeHtml(g.platform||"")} ${g.year?"· "+escapeHtml(g.year):""}<br>${escapeHtml(g.publisher||"Éditeur non renseigné")}</div><div class="badges">${g.type?`<span class="badge">${escapeHtml(g.type)}</span>`:""}${g.genre?`<span class="badge">${escapeHtml(g.genre)}</span>`:""}</div>${g.description?`<p class="meta">${escapeHtml(g.description)}</p>`:""}${g.views!=null?`<div class="meta">Vues sur le site source : ${escapeHtml(g.views)}</div>`:""}</div></article>`;
  }).join("");
  $("pagination").innerHTML = "";
  if(pages>1){
    for(let n=1;n<=pages;n++){
      if(pages>9 && Math.abs(n-page)>2 && n!==1 && n!==pages) continue;
      const b=document.createElement("button"); b.textContent=n; b.className=n===page?"active":"";
      b.onclick=()=>{page=n;render();window.scrollTo({top:0,behavior:"smooth"});};
      $("pagination").appendChild(b);
    }
  }
}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function escapeAttr(v){return escapeHtml(v);}
$("search").addEventListener("input",()=>{page=1;render()});
$("platform").addEventListener("change",()=>{page=1;render()});
$("type").addEventListener("change",()=>{page=1;render()});
fetch("data/games.json").then(r=>{if(!r.ok)throw Error("missing");return r.json()}).then(data=>{games=data;render()}).catch(()=>{games=[];render()});
