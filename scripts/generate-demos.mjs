import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const demosDir = path.join(__dirname, "..", "public", "demos");

const sharedCss = `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#09090b;--panel:#18181b;--border:#27272a;--text:#e4e4e7;--muted:#a1a1aa;--accent:#6366f1;--accent2:#818cf8;--ok:#34d399}
body{font-family:Inter,system-ui,-apple-system,sans-serif;background:var(--bg);color:var(--text);min-height:100vh;line-height:1.5}
a{color:var(--accent2);text-decoration:none}
.topbar{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 1.25rem;border-bottom:1px solid var(--border);background:rgba(9,9,11,.92);position:sticky;top:0;z-index:10;backdrop-filter:blur(8px)}
.brand{font-weight:700;letter-spacing:-.03em}
.badge{font-size:.7rem;text-transform:uppercase;letter-spacing:.12em;color:#a5b4fc;background:rgba(99,102,241,.15);border:1px solid rgba(99,102,241,.35);padding:.25rem .6rem;border-radius:999px}
.wrap{max-width:960px;margin:0 auto;padding:1.5rem}
.hero{margin-bottom:1.25rem}
.hero h1{font-size:clamp(1.6rem,4vw,2.2rem);letter-spacing:-.04em;margin-bottom:.35rem}
.hero p{color:var(--muted);max-width:60ch}
.panel{background:var(--panel);border:1px solid var(--border);border-radius:1rem;padding:1rem}
.grid{display:grid;gap:.75rem}
.row{display:flex;gap:.6rem;flex-wrap:wrap}
input,textarea,select,button{font:inherit}
input,textarea,select{width:100%;background:#0f0f12;border:1px solid var(--border);color:var(--text);border-radius:.75rem;padding:.7rem .85rem}
input:focus,textarea:focus,select:focus{outline:2px solid rgba(99,102,241,.45);border-color:var(--accent)}
button{cursor:pointer;border:none;border-radius:.75rem;padding:.65rem 1rem;font-weight:600}
.btn-primary{background:linear-gradient(135deg,#6366f1,#4f46e5);color:#fff}
.btn-secondary{background:#27272a;color:#e4e4e7;border:1px solid #3f3f46}
.btn-ghost{background:transparent;color:var(--muted);border:1px solid var(--border)}
.item{display:flex;align-items:center;justify-content:space-between;gap:.75rem;padding:.8rem .9rem;border:1px solid var(--border);border-radius:.85rem;background:#111114}
.item h3{font-size:1rem}
.item p,.meta{color:var(--muted);font-size:.86rem}
.tag{display:inline-block;font-size:.72rem;padding:.15rem .5rem;border-radius:999px;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);color:#c7d2fe;margin-right:.35rem}
.stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem;margin-bottom:1rem}
.stat{padding:.9rem;border:1px solid var(--border);border-radius:.85rem;background:#111114}
.stat strong{display:block;font-size:1.35rem}
.chat{max-height:360px;overflow:auto;display:flex;flex-direction:column;gap:.55rem;margin-bottom:.75rem}
.bubble{max-width:78%;padding:.65rem .8rem;border-radius:1rem;font-size:.92rem}
.bubble.me{align-self:flex-end;background:#312e81}
.bubble.them{align-self:flex-start;background:#27272a;border:1px solid var(--border)}
.footer-note{margin-top:1rem;color:var(--muted);font-size:.8rem;text-align:center}
.empty{color:var(--muted);text-align:center;padding:1.25rem}
@media (max-width:640px){.row>*{flex:1 1 100%}}
`;

const demos = [
  {
    slug: "mern-task-manager",
    title: "MERN Task Manager",
    subtitle: "Create, complete, and delete tasks in this interactive demo.",
    script: `
      const key='tasks-demo';
      const seed=[{id:1,t:'Setup MongoDB Atlas',done:true},{id:2,t:'Build Express REST API',done:true},{id:3,t:'Connect React frontend',done:false}];
      let items=JSON.parse(localStorage.getItem(key)||'null')||seed;
      const list=document.getElementById('list');
      const input=document.getElementById('taskInput');
      const save=()=>localStorage.setItem(key,JSON.stringify(items));
      const render=()=>{list.innerHTML=items.map(i=>\`<div class="item"><label style="display:flex;gap:.6rem;align-items:center"><input type="checkbox" \${i.done?'checked':''} data-id="\${i.id}"/><span style="\${i.done?'text-decoration:line-through;color:#71717a':''}">\${i.t}</span></label><button class="btn-ghost" data-del="\${i.id}">Delete</button></div>\`).join('')||'<div class="empty">No tasks yet</div>';document.getElementById('count').textContent=items.filter(i=>!i.done).length};
      document.getElementById('addBtn').onclick=()=>{const t=input.value.trim();if(!t)return;items.unshift({id:Date.now(),t,done:false});input.value='';save();render();};
      list.onclick=e=>{const id=Number(e.target.dataset.id||e.target.dataset.del);if(e.target.dataset.id){items=items.map(i=>i.id===id?{...i,done:e.target.checked}:i);save();render();}if(e.target.dataset.del){items=items.filter(i=>i.id!==id);save();render();}};
      render();
    `,
    body: `<div class="row" style="margin-bottom:.75rem"><input id="taskInput" placeholder="Add a new task..." /><button class="btn-primary" id="addBtn">Add Task</button></div><div class="stat" style="margin-bottom:.75rem"><strong id="count">0</strong><span class="meta"> open tasks</span></div><div id="list" class="grid"></div>`,
  },
  {
    slug: "mern-notes-api",
    title: "MERN Notes API",
    subtitle: "Write and save notes locally in this notes dashboard demo.",
    script: `
      const key='notes-demo';let notes=JSON.parse(localStorage.getItem(key)||'[]');
      const list=document.getElementById('list');const title=document.getElementById('title');const body=document.getElementById('body');
      const save=()=>localStorage.setItem(key,JSON.stringify(notes));
      const render=()=>{list.innerHTML=notes.map(n=>\`<div class="item"><div><h3>\${n.title}</h3><p>\${n.body}</p><p class="meta">\${n.date}</p></div><button class="btn-ghost" data-del="\${n.id}">Delete</button></div>\`).join('')||'<div class="empty">No notes yet</div>'};
      document.getElementById('saveBtn').onclick=()=>{if(!title.value.trim())return;notes.unshift({id:Date.now(),title:title.value.trim(),body:body.value.trim()||'No content',date:new Date().toLocaleString()});title.value='';body.value='';save();render();};
      list.onclick=e=>{if(e.target.dataset.del){notes=notes.filter(n=>n.id!==Number(e.target.dataset.del));save();render();}};
      render();
    `,
    body: `<div class="grid" style="margin-bottom:.75rem"><input id="title" placeholder="Note title" /><textarea id="body" rows="3" placeholder="Note content"></textarea><button class="btn-primary" id="saveBtn">Save Note</button></div><div id="list" class="grid"></div>`,
  },
  {
    slug: "mern-ecommerce-store",
    title: "MERN E-Commerce Store",
    subtitle: "Browse products and add items to cart.",
    script: `
      const products=[{id:1,n:'Wireless Headphones',p:89,c:'Audio'},{id:2,n:'Mechanical Keyboard',p:129,c:'Tech'},{id:3,n:'Smart Watch',p:199,c:'Wearables'},{id:4,n:'USB-C Hub',p:49,c:'Accessories'}];
      let cart=[];const grid=document.getElementById('grid');
      const render=()=>{grid.innerHTML=products.map(p=>\`<div class="item" style="flex-direction:column;align-items:flex-start"><span class="tag">\${p.c}</span><h3>\${p.n}</h3><p class="meta">$ \${p.p}</p><button class="btn-primary" data-add="\${p.id}">Add to cart</button></div>\`).join('');document.getElementById('cartCount').textContent=cart.length;document.getElementById('cartTotal').textContent='$ '+cart.reduce((s,i)=>s+i.p,0);};
      grid.onclick=e=>{const id=Number(e.target.dataset.add);if(!id)return;const p=products.find(x=>x.id===id);cart.push(p);render();};
      render();
    `,
    body: `<div class="stats"><div class="stat"><strong id="cartCount">0</strong><span class="meta">items in cart</span></div><div class="stat"><strong id="cartTotal">$ 0</strong><span class="meta">cart total</span></div></div><div id="grid" class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))"></div>`,
  },
  {
    slug: "mern-social-dashboard",
    title: "MERN Social Dashboard",
    subtitle: "Post updates and browse a live social feed.",
    script: `
      const key='feed-demo';let posts=JSON.parse(localStorage.getItem(key)||'null')||[{id:1,u:'MuDasssR',t:'Just shipped a new MERN dashboard!',time:'2h ago'},{id:2,u:'DevClient',t:'Love the real-time feed UI.',time:'4h ago'}];
      const feed=document.getElementById('feed');const input=document.getElementById('post');
      const save=()=>localStorage.setItem(key,JSON.stringify(posts));
      const render=()=>{feed.innerHTML=posts.map(p=>\`<div class="item" style="flex-direction:column;align-items:flex-start"><h3>\${p.u}</h3><p>\${p.t}</p><p class="meta">\${p.time}</p></div>\`).join('')};
      document.getElementById('publish').onclick=()=>{const t=input.value.trim();if(!t)return;posts.unshift({id:Date.now(),u:'You',t,time:'now'});input.value='';save();render();};
      render();
    `,
    body: `<div class="row" style="margin-bottom:.75rem"><input id="post" placeholder="What's on your mind?" /><button class="btn-primary" id="publish">Post</button></div><div id="feed" class="grid"></div>`,
  },
  {
    slug: "mern-blog-platform",
    title: "MERN Blog Platform",
    subtitle: "Read and publish blog posts in this CMS-style demo.",
    script: `
      const posts=[{t:'Getting Started with MERN',a:'MuDasssR',c:'Tutorial',ex:'Learn how MongoDB, Express, React and Node work together.'},{t:'Deploying Node APIs',a:'MuDasssR',c:'DevOps',ex:'A practical guide to deploying Express apps on cloud platforms.'},{t:'React State Patterns',a:'MuDasssR',c:'React',ex:'Hooks, context, and scalable state management tips.'}];
      document.getElementById('posts').innerHTML=posts.map(p=>\`<article class="item" style="flex-direction:column;align-items:flex-start"><span class="tag">\${p.c}</span><h3>\${p.t}</h3><p>\${p.ex}</p><p class="meta">by \${p.a}</p></article>\`).join('');
    `,
    body: `<div id="posts" class="grid"></div>`,
  },
  {
    slug: "mern-chat-app",
    title: "MERN Chat App",
    subtitle: "Send messages in a real-time style chat interface.",
    script: `
      const chat=document.getElementById('chat');const input=document.getElementById('msg');
      const add=(text,me=false)=>{const d=document.createElement('div');d.className='bubble '+(me?'me':'them');d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight;};
      add('Welcome to MERN Chat demo!');add('Try sending a message below.',false);
      document.getElementById('send').onclick=()=>{const t=input.value.trim();if(!t)return;add(t,true);input.value='';setTimeout(()=>add('Thanks! This is a live UI preview of the chat app.',false),700);};
      input.addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('send').click();});
    `,
    body: `<div id="chat" class="chat panel"></div><div class="row"><input id="msg" placeholder="Type a message..." /><button class="btn-primary" id="send">Send</button></div>`,
  },
  {
    slug: "mern-job-portal",
    title: "MERN Job Portal",
    subtitle: "Search job listings and apply with one click.",
    script: `
      const jobs=[{t:'Full Stack Developer',c:'TechNova',l:'Remote',type:'Full-time'},{t:'React Frontend Engineer',c:'PixelForge',l:'Lahore',type:'Contract'},{t:'Node.js API Developer',c:'CloudBase',l:'Remote',type:'Full-time'}];
      const list=document.getElementById('jobs');const q=document.getElementById('q');
      const render=()=>{const term=q.value.toLowerCase();list.innerHTML=jobs.filter(j=>j.t.toLowerCase().includes(term)||j.c.toLowerCase().includes(term)).map(j=>\`<div class="item"><div><h3>\${j.t}</h3><p class="meta">\${j.c} · \${j.l} · \${j.type}</p></div><button class="btn-secondary" onclick="alert('Application sent for '+'\${j.t}')">Apply</button></div>\`).join('')};
      q.oninput=render;render();
    `,
    body: `<input id="q" placeholder="Search jobs..." style="margin-bottom:.75rem" /><div id="jobs" class="grid"></div>`,
  },
  {
    slug: "mern-expense-tracker",
    title: "MERN Expense Tracker",
    subtitle: "Track income and expenses with live totals.",
    script: `
      const key='exp-demo';let rows=JSON.parse(localStorage.getItem(key)||'null')||[{id:1,t:'Freelance project',a:500,type:'income'},{id:2,t:'Hosting',a:20,type:'expense'}];
      const list=document.getElementById('list');const save=()=>localStorage.setItem(key,JSON.stringify(rows));
      const totals=()=>{const inc=rows.filter(r=>r.type==='income').reduce((s,r)=>s+r.a,0);const exp=rows.filter(r=>r.type==='expense').reduce((s,r)=>s+r.a,0);document.getElementById('inc').textContent='$ '+inc;document.getElementById('exp').textContent='$ '+exp;document.getElementById('bal').textContent='$ '+(inc-exp);};
      const render=()=>{list.innerHTML=rows.map(r=>\`<div class="item"><div><h3>\${r.t}</h3><p class="meta">\${r.type}</p></div><strong style="color:\${r.type==='income'?'#34d399':'#f87171'}">\${r.type==='income'?'+':'-'}$ \${r.a}</strong></div>\`).join('');totals();};
      document.getElementById('add').onclick=()=>{const t=document.getElementById('title').value.trim();const a=Number(document.getElementById('amount').value);const type=document.getElementById('type').value;if(!t||!a)return;rows.unshift({id:Date.now(),t,a,type});document.getElementById('title').value='';document.getElementById('amount').value='';save();render();};
      render();
    `,
    body: `<div class="stats"><div class="stat"><strong id="inc">$ 0</strong><span class="meta">income</span></div><div class="stat"><strong id="exp">$ 0</strong><span class="meta">expenses</span></div><div class="stat"><strong id="bal">$ 0</strong><span class="meta">balance</span></div></div><div class="row" style="margin-bottom:.75rem"><input id="title" placeholder="Description" /><input id="amount" type="number" placeholder="Amount" /><select id="type"><option value="income">Income</option><option value="expense">Expense</option></select><button class="btn-primary" id="add">Add</button></div><div id="list" class="grid"></div>`,
  },
  {
    slug: "mern-event-booker",
    title: "MERN Event Booker",
    subtitle: "Browse events and reserve tickets instantly.",
    script: `
      const events=[{t:'MERN Workshop',d:'July 15, 2026',s:50,p:0},{t:'React Summit',d:'Aug 2, 2026',s:12,p:29},{t:'Node.js Meetup',d:'Aug 20, 2026',s:80,p:0}];
      document.getElementById('events').innerHTML=events.map((e,i)=>\`<div class="item"><div><h3>\${e.t}</h3><p class="meta">\${e.d} · \${e.s} seats left · \${e.p? '$'+e.p:'Free'}</p></div><button class="btn-primary" data-i="\${i}">Book ticket</button></div>\`).join('');
      document.getElementById('events').onclick=ev=>{const i=ev.target.dataset.i;if(i===undefined)return;alert('Ticket booked for '+events[i].t+'!')};
    `,
    body: `<div id="events" class="grid"></div>`,
  },
  {
    slug: "mern-url-shortener",
    title: "MERN URL Shortener",
    subtitle: "Shorten links and preview click analytics.",
    script: `
      const key='links-demo';let links=JSON.parse(localStorage.getItem(key)||'null')||[{slug:'mern-dev',url:'https://github.com/mudassermushtaq009',clicks:12}];
      const list=document.getElementById('list');const url=document.getElementById('url');const slug=document.getElementById('slug');
      const save=()=>localStorage.setItem(key,JSON.stringify(links));
      const render=()=>{list.innerHTML=links.map(l=>\`<div class="item"><div><h3>/\${l.slug}</h3><p class="meta">\${l.url}</p><p class="meta">\${l.clicks} clicks</p></div><button class="btn-secondary" data-hit="\${l.slug}">Visit</button></div>\`).join('')};
      document.getElementById('shorten').onclick=()=>{const u=url.value.trim();const s=(slug.value.trim()||'link-'+Date.now()).replace(/\\s+/g,'-');if(!u)return;links.unshift({slug:s,url:u,clicks:0});url.value='';slug.value='';save();render();};
      list.onclick=e=>{const s=e.target.dataset.hit;if(!s)return;links=links.map(l=>l.slug===s?{...l,clicks:l.clicks+1}:l);save();render();const target=links.find(l=>l.slug===s);window.open(target.url,'_blank');};
      render();
    `,
    body: `<div class="row" style="margin-bottom:.75rem"><input id="url" placeholder="https://example.com/long-url" /><input id="slug" placeholder="custom-slug (optional)" /><button class="btn-primary" id="shorten">Shorten</button></div><div id="list" class="grid"></div>`,
  },
  {
    slug: "mern-recipe-finder",
    title: "MERN Recipe Finder",
    subtitle: "Search recipes by name, cuisine, or ingredient.",
    script: `
      const recipes=[{t:'Chicken Biryani',c:'Pakistani',i:'Rice, chicken, spices',time:'45 min'},{t:'Pasta Alfredo',c:'Italian',i:'Pasta, cream, parmesan',time:'25 min'},{t:'Veggie Stir Fry',c:'Asian',i:'Vegetables, soy sauce',time:'20 min'}];
      const grid=document.getElementById('grid');const q=document.getElementById('q');
      const render=()=>{const term=q.value.toLowerCase();grid.innerHTML=recipes.filter(r=>Object.values(r).join(' ').toLowerCase().includes(term)).map(r=>\`<div class="item" style="flex-direction:column;align-items:flex-start"><span class="tag">\${r.c}</span><h3>\${r.t}</h3><p class="meta">\${r.i}</p><p class="meta">\${r.time}</p><button class="btn-secondary" style="margin-top:.5rem" onclick="alert('Saved '+ '\${r.t}' +' to favorites')">Save favorite</button></div>\`).join('')};
      q.oninput=render;render();
    `,
    body: `<input id="q" placeholder="Search recipes..." style="margin-bottom:.75rem" /><div id="grid" class="grid" style="grid-template-columns:repeat(auto-fit,minmax(220px,1fr))"></div>`,
  },
];

function template(demo) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${demo.title} | Live Demo</title>
  <style>${sharedCss}</style>
</head>
<body>
  <header class="topbar">
    <div class="brand">${demo.title}</div>
    <div style="display:flex;gap:.5rem;align-items:center">
      <span class="badge">Live Demo</span>
      <a href="/" class="btn-ghost" style="padding:.45rem .75rem;border-radius:.65rem">← Portfolio</a>
    </div>
  </header>
  <main class="wrap">
    <section class="hero">
      <h1>${demo.title}</h1>
      <p>${demo.subtitle}</p>
    </section>
    <section class="panel">${demo.body}</section>
    <p class="footer-note">Interactive UI preview · Built with MERN stack · <a href="https://github.com/mudassermushtaq009/${demo.slug}" target="_blank" rel="noopener noreferrer">View source on GitHub</a></p>
  </main>
  <script>${demo.script}</script>
</body>
</html>`;
}

fs.mkdirSync(demosDir, { recursive: true });
fs.writeFileSync(path.join(demosDir, "shared.css"), sharedCss);

for (const demo of demos) {
  const dir = path.join(demosDir, demo.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), template(demo));
}

console.log(`Generated ${demos.length} live demo pages.`);