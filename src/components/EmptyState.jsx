function EmptyState({ icon = '📭', title, message, action }) {
  return (
    <div style={styles.wrapper} className="fade-in">
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.message}>{message}</p>
      {action}
    </div>
  )
}

const styles = {
  wrapper: {
    textAlign: 'center',
    padding: '3rem 1.5rem',
    background: '#fff',
    borderRadius: '12px',
    border: '1px dashed #d1d5db',
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '0.8rem',
  },
  title: {
    fontSize: '1.1rem',
    color: '#1e1b4b',
    marginBottom: '0.4rem',
  },
  message: {
    color: '#6b7280',
    fontSize: '0.9rem',
  },
}

export default EmptyState