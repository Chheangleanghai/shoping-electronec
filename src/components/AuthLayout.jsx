export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side background with overlay */}
      <div className="relative hidden lg:flex flex-1 items-center justify-center bg-black text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(59, 130, 246, 0.35), transparent 55%), radial-gradient(ellipse 70% 50% at 80% 70%, rgba(168, 85, 247, 0.25), transparent 50%), linear-gradient(160deg, #0a0a0a 0%, #171717 45%, #0a0a0a 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
        <div className="relative z-10 max-w-md text-center px-8">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Premium Tech Experience
          </h1>
          <p className="text-gray-300 text-lg">
            Explore high-performance products designed for professionals.  
            Sign in or create an account to continue.
          </p>
        </div>
      </div>

      {/* Right side form */}
      <div className="flex-1 flex items-center justify-center px-8 py-16 bg-white text-black">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-3 text-gray-900">{title}</h2>
          <p className="text-gray-600 mb-8">{subtitle}</p>
          <div className="bg-gray-50 p-6 rounded-2xl shadow-lg border border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
