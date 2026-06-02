import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';

interface DocFile {
  name: string;
  path: string;
  title: string;
  content: string;
}

interface FilesData {
  human_org: DocFile[];
  agent_org: DocFile[];
}

export default function DocsEditor(): JSX.Element {
  const [files, setFiles] = useState<FilesData | null>(null);
  const [selectedFile, setSelectedFile] = useState<DocFile | null>(null);
  const [editorContent, setEditorContent] = useState<string>('');
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error' | 'loading'; message: string }>({
    type: 'idle',
    message: ''
  });
  const [activeTab, setActiveTab] = useState<'human' | 'agent'>('human');

  // Load the list of files on component mount
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      setStatus({ type: 'loading', message: 'Loading documentation structure...' });
      const response = await fetch('http://localhost:3002/api/files');
      const data = await response.json();
      if (data.success) {
        setFiles(data.files);
        setStatus({ type: 'idle', message: '' });
        
        // Auto-select first file if available
        const defaultCategory = 'human_org';
        const defaultList = data.files[defaultCategory];
        if (defaultList && defaultList.length > 0) {
          setSelectedFile(defaultList[0]);
          setEditorContent(defaultList[0].content);
        }
      } else {
        throw new Error(data.error || 'Failed to fetch documentation metadata.');
      }
    } catch (error) {
      console.error(error);
      setStatus({
        type: 'error',
        message: 'Could not connect to Docusaurus Docs Editor local server. Make sure node editor-server.js is running.'
      });
    }
  };

  const handleFileSelect = (file: DocFile) => {
    setSelectedFile(file);
    setEditorContent(file.content);
    setStatus({ type: 'idle', message: '' });
  };

  const handleSave = async () => {
    if (!selectedFile) return;

    try {
      setStatus({ type: 'loading', message: 'Saving document changes...' });
      const response = await fetch('http://localhost:3002/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          relativePath: selectedFile.path,
          content: editorContent
        }),
      });

      const data = await response.json();
      if (data.success) {
        setStatus({ type: 'success', message: 'Document saved and synced successfully!' });
        
        // Update local state list
        if (files) {
          const updatedFiles = { ...files };
          const category = selectedFile.path.startsWith('human_org') ? 'human_org' : 'agent_org';
          updatedFiles[category] = updatedFiles[category].map((f) => 
            f.path === selectedFile.path ? { ...f, content: editorContent } : f
          );
          setFiles(updatedFiles);
        }

        setTimeout(() => {
          setStatus({ type: 'idle', message: '' });
        }, 3000);
      } else {
        throw new Error(data.error || 'Failed to save document.');
      }
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Error occurred during save.' });
    }
  };

  // Basic HTML parser for simple live markdown rendering preview
  const renderPreview = (md: string) => {
    if (!md) return '';
    let html = md
      // Escape HTML
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers
      .replace(/^# (.*$)/gim, '<h1 class="preview-h1">$1</h1>')
      .replace(/^## (.*$)/gim, '<h2 class="preview-h2">$1</h2>')
      .replace(/^### (.*$)/gim, '<h3 class="preview-h3">$1</h3>')
      .replace(/^#### (.*$)/gim, '<h4 class="preview-h4">$1</h4>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks & inline code
      .replace(/```([\s\S]*?)```/g, '<pre class="preview-pre"><code>$1</code></pre>')
      .replace(/`(.*?)`/g, '<code class="preview-code">$1</code>')
      // Tables
      .replace(/\|(.*)\|/g, (match) => {
        const cells = match.split('|').slice(1, -1);
        return `<tr class="preview-tr">${cells.map(c => `<td class="preview-td">${c.trim()}</td>`).join('')}</tr>`;
      })
      // Lists
      .replace(/^\s*-\s*(.*$)/gim, '<li class="preview-li">$1</li>')
      .replace(/^\s*\*\s*(.*$)/gim, '<li class="preview-li">$1</li>')
      // Line breaks and paragraphs
      .replace(/\n$/gim, '<br/>');

    return html;
  };

  return (
    <Layout
      title="Interactive Docs Editor"
      description="Visual Markdown editor for KalaGato Human and Agentic organization documentation"
    >
      <main className="editor-page-container">
        {/* Custom premium CSS overrides */}
        <style dangerouslySetInnerHTML={{ __html: `
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
        `}} />

        <div className="editor-header">
          <div className="editor-title-area">
            <h1>Interactive Docs Editor</h1>
            <p>Visual workspace for managing and publishing Human and Agentic systems manuals.</p>
          </div>
          
          <div className={`status-bar status-${status.type}`}>
            {status.type === 'loading' && <span className="spinner">⏳</span>}
            {status.type === 'success' && <span>✅</span>}
            {status.type === 'error' && <span>❌</span>}
            <span>{status.message}</span>
          </div>
        </div>

        <div className="editor-layout">
          {/* File selector sidebar */}
          <div className="file-sidebar">
            <div className="sidebar-tabs">
              <button 
                className={`tab-btn ${activeTab === 'human' ? 'active' : ''}`}
                onClick={() => setActiveTab('human')}
              >
                Human Roles
              </button>
              <button 
                className={`tab-btn ${activeTab === 'agent' ? 'active' : ''}`}
                onClick={() => setActiveTab('agent')}
              >
                Agentic Org
              </button>
            </div>

            <div className="file-list">
              {files && activeTab === 'human' && files.human_org.map((file) => (
                <button
                  key={file.path}
                  className={`file-item ${selectedFile?.path === file.path ? 'selected' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  📄 {file.title || file.name}
                </button>
              ))}

              {files && activeTab === 'agent' && files.agent_org.map((file) => (
                <button
                  key={file.path}
                  className={`file-item ${selectedFile?.path === file.path ? 'selected' : ''}`}
                  onClick={() => handleFileSelect(file)}
                >
                  🤖 {file.title || file.name}
                </button>
              ))}

              {!files && (
                <div style={{ color: '#6C7281', fontSize: '0.85rem', padding: '1rem', textAlign: 'center' }}>
                  No files loaded.
                </div>
              )}
            </div>
          </div>

          {/* Raw markdown code editor */}
          <div className="editor-workspace">
            <div className="workspace-header">
              <span className="current-file-info">
                {selectedFile ? `Editing: docs/${selectedFile.path}` : 'No document selected'}
              </span>
              <button
                className="save-btn"
                disabled={!selectedFile || status.type === 'loading'}
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>

            <textarea
              className="markdown-textarea"
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              placeholder="Select a document from the left and start writing..."
              disabled={!selectedFile}
            />
          </div>

          {/* Styled Live Preview HTML rendering */}
          <div className="preview-panel">
            <div className="preview-header">
              <span>Live Markdown Rendering</span>
            </div>
            <div 
              className="preview-content"
              dangerouslySetInnerHTML={{ __html: renderPreview(editorContent) }}
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}
