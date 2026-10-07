import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [onClose, duration])

  const colors = {
    success: { bg: '#dcfce7', border: '#16a34a', color: '#166534', icon: '✅' },
    error: { bg: '#fee2e2', border: '#dc2626', color: '#991b1b', icon: '❌' },
    info: { bg: '#dbeafe', border: '#0ea5e9', color: '#075985', icon: 'ℹ️' },
  }

  const c = colors[type] || colors.info

  return (
    <div
      className="fade-in"
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.color,
        padding: '0.9rem 1.2rem',
        borderRadius: '10px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        zIndex: 999,
        animation: 'slideInRight 0.3s ease',
      }}
    >
      <span>{c.icon}</span>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: c.color,
          marginLeft: '0.5rem',
          fontSize: '0.85rem',
          opacity: 0.6,
        }}
      >
        ✕
      </button>
    </div>
  )
}

export default Toast