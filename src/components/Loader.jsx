function Loader({ message = 'Cargando...', hint }) {
  return (
    <div style={styles.wrapper}>
      <div style={styles.spinner} />
      <p style={styles.message}>{message}</p>
      {hint && <p style={styles.hint}>{hint}</p>}
    </div>
  )
}

const styles = {
  wrapper: {
    textAlign: 'center',
    padding: '3rem 1rem',
    animation: 'fadeIn 0.3s ease',
  },
  spinner: {
    width: '52px',
    height: '52px',
    border: '4px solid #c7d2fe',
    borderTopColor: '#4338ca',
    borderRadius: '50%',
    margin: '0 auto 1.2rem',
    animation: 'spin 0.8s linear infinite',
  },
  message: {
    color: '#4338ca',
    fontWeight: '600',
    fontSize: '1rem',
  },
  hint: {
    fontSize: '0.8rem',
    color: '#6b7280',
    marginTop: '0.4rem',
    fontFamily: 'monospace',
  },
}

export default Loader