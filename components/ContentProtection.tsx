'use client'

import { useEffect } from 'react'

export default function ContentProtection() {
  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    // Prevent drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent copy shortcuts (Ctrl+C, Cmd+C)
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent cut shortcuts (Ctrl+X, Cmd+X)
    const handleCut = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent paste shortcuts (Ctrl+V, Cmd+V)
    const handlePaste = (e: ClipboardEvent) => {
      e.preventDefault()
      return false
    }

    // Prevent select all (Ctrl+A, Cmd+A)
    const handleSelectAll = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'a') {
        e.preventDefault()
        return false
      }
    }

    // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U (view source)
    const handleDevTools = (e: KeyboardEvent) => {
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        ((e.ctrlKey || e.metaKey) && e.key === 'U')
      ) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('dragstart', handleDragStart)
    document.addEventListener('copy', handleCopy)
    document.addEventListener('cut', handleCut)
    document.addEventListener('paste', handlePaste)
    document.addEventListener('keydown', handleSelectAll)
    document.addEventListener('keydown', handleDevTools)

    // Disable text selection via CSS
    document.body.style.userSelect = 'none'
    document.body.style.webkitUserSelect = 'none'
    document.body.style.mozUserSelect = 'none'
    document.body.style.msUserSelect = 'none'

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('dragstart', handleDragStart)
      document.removeEventListener('copy', handleCopy)
      document.removeEventListener('cut', handleCut)
      document.removeEventListener('paste', handlePaste)
      document.removeEventListener('keydown', handleSelectAll)
      document.removeEventListener('keydown', handleDevTools)
      document.body.style.userSelect = ''
      document.body.style.webkitUserSelect = ''
      document.body.style.mozUserSelect = ''
      document.body.style.msUserSelect = ''
    }
  }, [])

  return null
}

