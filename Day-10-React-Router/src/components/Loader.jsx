export default function Loader({ fullscreen = false, small = false }) {
  if (small) return <span className="spinner spinner-sm" role="status" aria-label="Loading" />
  return (
    <div className={fullscreen ? 'loader loader-full' : 'loader'} role="status" aria-label="Loading">
      <span className="spinner" />
      {fullscreen && <p>Getting your classroom ready…</p>}
    </div>
  )
}
