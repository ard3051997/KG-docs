"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([["37165"],{58398(e,r,a){a.r(r),a.d(r,{default:()=>s});var t=a(62540),o=a(63696),i=a(1419);function s(){let[e,r]=(0,o.useState)(null),[a,s]=(0,o.useState)(null),[n,l]=(0,o.useState)(""),[d,c]=(0,o.useState)({type:"idle",message:""}),[p,m]=(0,o.useState)("human");(0,o.useEffect)(()=>{g()},[]);let g=async()=>{try{c({type:"loading",message:"Loading documentation structure..."});let e=await fetch("http://localhost:3002/api/files"),a=await e.json();if(a.success){r(a.files),c({type:"idle",message:""});let e=a.files.human_org;e&&e.length>0&&(s(e[0]),l(e[0].content))}else throw Error(a.error||"Failed to fetch documentation metadata.")}catch(e){console.error(e),c({type:"error",message:"Could not connect to Docusaurus Docs Editor local server. Make sure node editor-server.js is running."})}},b=e=>{s(e),l(e.content),c({type:"idle",message:""})},h=async()=>{if(a)try{c({type:"loading",message:"Saving document changes..."});let t=await fetch("http://localhost:3002/api/save",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({relativePath:a.path,content:n})}),o=await t.json();if(o.success){if(c({type:"success",message:"Document saved and synced successfully!"}),e){let t={...e},o=a.path.startsWith("human_org")?"human_org":"agent_org";t[o]=t[o].map(e=>e.path===a.path?{...e,content:n}:e),r(t)}setTimeout(()=>{c({type:"idle",message:""})},3e3)}else throw Error(o.error||"Failed to save document.")}catch(e){c({type:"error",message:e.message||"Error occurred during save."})}};return(0,t.jsx)(i.A,{title:"Interactive Docs Editor",description:"Visual Markdown editor for KalaGato Human and Agentic organization documentation",children:(0,t.jsxs)("main",{className:"editor-page-container",children:[(0,t.jsx)("style",{dangerouslySetInnerHTML:{__html:`
          .editor-page-container {
            min-height: 100vh;
            background: radial-gradient(circle at top left, #0D0E12 0%, #030406 100%);
            color: #E2E8F0;
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            padding: 2rem;
            display: flex;
            flex-direction: column;
          }
          
          .editor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            padding-bottom: 1.5rem;
            margin-bottom: 2rem;
          }

          .editor-title-area h1 {
            color: #D4AF37;
            font-size: 2.2rem;
            font-weight: 800;
            margin: 0;
            background: linear-gradient(135deg, #FFDF73 0%, #D4AF37 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-shadow: 0 0 30px rgba(212, 175, 55, 0.15);
          }

          .editor-title-area p {
            color: #8A8F98;
            margin: 0.5rem 0 0 0;
            font-size: 1rem;
          }

          .status-bar {
            padding: 0.8rem 1.5rem;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: fadeIn 0.3s ease;
          }

          .status-idle { display: none; }
          .status-loading { background: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); color: #60A5FA; }
          .status-success { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); color: #34D399; }
          .status-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); color: #F87171; }

          .editor-layout {
            display: grid;
            grid-template-columns: 280px 1fr 1fr;
            gap: 1.5rem;
            flex-grow: 1;
            min-height: 70vh;
          }

          .file-sidebar {
            background: rgba(13, 14, 18, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 1.2rem;
            backdrop-filter: blur(10px);
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .sidebar-tabs {
            display: flex;
            gap: 0.5rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.8rem;
          }

          .tab-btn {
            background: none;
            border: none;
            color: #6C7281;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            padding: 0.4rem 0.8rem;
            border-radius: 6px;
            transition: all 0.2s ease;
          }

          .tab-btn.active {
            background: rgba(212, 175, 55, 0.15);
            color: #D4AF37;
            border: 1px solid rgba(212, 175, 55, 0.3);
          }

          .file-list {
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
            overflow-y: auto;
            max-height: 60vh;
          }

          .file-item {
            text-align: left;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid transparent;
            color: #94A3B8;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.85rem;
            font-weight: 500;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .file-item:hover {
            background: rgba(255, 255, 255, 0.05);
            color: #E2E8F0;
          }

          .file-item.selected {
            background: linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(212, 175, 55, 0.02) 100%);
            border: 1px solid rgba(212, 175, 55, 0.4);
            color: #D4AF37;
            box-shadow: 0 4px 15px rgba(212, 175, 55, 0.05);
          }

          .editor-workspace {
            display: flex;
            flex-direction: column;
            background: rgba(13, 14, 18, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            overflow: hidden;
          }

          .workspace-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: rgba(0, 0, 0, 0.3);
            padding: 0.8rem 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .current-file-info {
            font-size: 0.9rem;
            font-weight: 600;
            color: #D4AF37;
          }

          .save-btn {
            background: linear-gradient(135deg, #FFDF73 0%, #D4AF37 100%);
            color: #030406;
            border: none;
            border-radius: 6px;
            padding: 0.5rem 1.2rem;
            font-weight: 700;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(212, 175, 55, 0.2);
          }

          .save-btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(212, 175, 55, 0.35);
          }

          .save-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .markdown-textarea {
            flex-grow: 1;
            background: transparent;
            border: none;
            color: #E2E8F0;
            padding: 1.5rem;
            font-family: 'Fira Code', 'Courier New', Courier, monospace;
            font-size: 0.9rem;
            line-height: 1.6;
            resize: none;
            outline: none;
            min-height: 50vh;
          }

          .preview-panel {
            background: rgba(13, 14, 18, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            backdrop-filter: blur(10px);
          }

          .preview-header {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.8rem 1.2rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 0.9rem;
            font-weight: 600;
            color: #8A8F98;
          }

          .preview-content {
            flex-grow: 1;
            padding: 1.5rem;
            overflow-y: auto;
            color: #D1D5DB;
            line-height: 1.7;
          }

          /* Preview markdown styles */
          .preview-h1 { color: #FFF; font-size: 1.8rem; font-weight: 800; border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 0.5rem; margin-top: 0; margin-bottom: 1rem; }
          .preview-h2 { color: #E2E8F0; font-size: 1.4rem; font-weight: 700; border-bottom: 1px solid rgba(255, 255, 255, 0.05); padding-bottom: 0.3rem; margin-top: 1.5rem; margin-bottom: 0.8rem; }
          .preview-h3 { color: #CBD5E1; font-size: 1.2rem; font-weight: 600; margin-top: 1.2rem; margin-bottom: 0.6rem; }
          .preview-h4 { color: #94A3B8; font-size: 1rem; font-weight: 600; margin-top: 1rem; margin-bottom: 0.5rem; }
          
          .preview-pre { background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(255, 255, 255, 0.05); padding: 1rem; border-radius: 8px; overflow-x: auto; margin: 1rem 0; }
          .preview-code { background: rgba(255, 255, 255, 0.08); color: #F59E0B; padding: 0.2rem 0.4rem; border-radius: 4px; font-family: monospace; font-size: 0.85em; }
          
          .preview-tr { border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
          .preview-td { padding: 0.5rem 0.8rem; font-size: 0.85rem; }
          .preview-li { margin-bottom: 0.4rem; }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}}),(0,t.jsxs)("div",{className:"editor-header",children:[(0,t.jsxs)("div",{className:"editor-title-area",children:[(0,t.jsx)("h1",{children:"Interactive Docs Editor"}),(0,t.jsx)("p",{children:"Visual workspace for managing and publishing Human and Agentic systems manuals."})]}),(0,t.jsxs)("div",{className:`status-bar status-${d.type}`,children:["loading"===d.type&&(0,t.jsx)("span",{className:"spinner",children:"\u23F3"}),"success"===d.type&&(0,t.jsx)("span",{children:"\u2705"}),"error"===d.type&&(0,t.jsx)("span",{children:"\u274C"}),(0,t.jsx)("span",{children:d.message})]})]}),(0,t.jsxs)("div",{className:"editor-layout",children:[(0,t.jsxs)("div",{className:"file-sidebar",children:[(0,t.jsxs)("div",{className:"sidebar-tabs",children:[(0,t.jsx)("button",{className:`tab-btn ${"human"===p?"active":""}`,onClick:()=>m("human"),children:"Human Roles"}),(0,t.jsx)("button",{className:`tab-btn ${"agent"===p?"active":""}`,onClick:()=>m("agent"),children:"Agentic Org"})]}),(0,t.jsxs)("div",{className:"file-list",children:[e&&"human"===p&&e.human_org.map(e=>(0,t.jsxs)("button",{className:`file-item ${a?.path===e.path?"selected":""}`,onClick:()=>b(e),children:["\u{1F4C4} ",e.title||e.name]},e.path)),e&&"agent"===p&&e.agent_org.map(e=>(0,t.jsxs)("button",{className:`file-item ${a?.path===e.path?"selected":""}`,onClick:()=>b(e),children:["\u{1F916} ",e.title||e.name]},e.path)),!e&&(0,t.jsx)("div",{style:{color:"#6C7281",fontSize:"0.85rem",padding:"1rem",textAlign:"center"},children:"No files loaded."})]})]}),(0,t.jsxs)("div",{className:"editor-workspace",children:[(0,t.jsxs)("div",{className:"workspace-header",children:[(0,t.jsx)("span",{className:"current-file-info",children:a?`Editing: docs/${a.path}`:"No document selected"}),(0,t.jsx)("button",{className:"save-btn",disabled:!a||"loading"===d.type,onClick:h,children:"Save Changes"})]}),(0,t.jsx)("textarea",{className:"markdown-textarea",value:n,onChange:e=>l(e.target.value),placeholder:"Select a document from the left and start writing...",disabled:!a})]}),(0,t.jsxs)("div",{className:"preview-panel",children:[(0,t.jsx)("div",{className:"preview-header",children:(0,t.jsx)("span",{children:"Live Markdown Rendering"})}),(0,t.jsx)("div",{className:"preview-content",dangerouslySetInnerHTML:{__html:n?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/^# (.*$)/gim,'<h1 class="preview-h1">$1</h1>').replace(/^## (.*$)/gim,'<h2 class="preview-h2">$1</h2>').replace(/^### (.*$)/gim,'<h3 class="preview-h3">$1</h3>').replace(/^#### (.*$)/gim,'<h4 class="preview-h4">$1</h4>').replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>").replace(/\*(.*?)\*/g,"<em>$1</em>").replace(/```([\s\S]*?)```/g,'<pre class="preview-pre"><code>$1</code></pre>').replace(/`(.*?)`/g,'<code class="preview-code">$1</code>').replace(/\|(.*)\|/g,e=>{let r=e.split("|").slice(1,-1);return`<tr class="preview-tr">${r.map(e=>`<td class="preview-td">${e.trim()}</td>`).join("")}</tr>`}).replace(/^\s*-\s*(.*$)/gim,'<li class="preview-li">$1</li>').replace(/^\s*\*\s*(.*$)/gim,'<li class="preview-li">$1</li>').replace(/\n$/gim,"<br/>"):""}})]})]})]})})}}}]);