export default function Button({ children, variant = 'primary', onClick, className = '', ...props }) {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-slate-300 border border-white/[0.06]',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-400 hover:text-slate-300',
  }

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
